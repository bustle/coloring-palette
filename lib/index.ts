/*
 * code modified from https://github.com/lyft/coloralgorithm/blob/1cef3987fdea2af8cfcc9b4bfd132ccf5684a030/src/generate.js
 */

import tinycolor, { TinyColor, ColorInput, ColorFormats } from '@ctrl/tinycolor'
import bezier from 'bezier-easing'
import { easeInQuad, easeOutQuad, muiHueCurve, muiSatCurve, muiValCurve } from './curves'
const { abs, ceil, round, sqrt, cos, log10 } = Math

export type ColorFormat = ColorFormats | null
export type Color = TinyColor | string

export interface GenerateMaterialUIPaletteOptions {
  readonly hueStart: number
  readonly hueEnd: number
  readonly hueCurve?: (input: number) => number
  readonly satStart: number
  readonly satEnd: number
  readonly satCurve?: (input: number) => number
  readonly satRate?: number
  readonly valStart: number
  readonly valEnd: number
  readonly valCurve?: (input: number) => number
  readonly format: ColorFormat
}

export interface GenerateShadesOptions extends GenerateMaterialUIPaletteOptions {
  readonly steps?: number
}

export type ShadeKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'A100'
  | 'A200'
  | 'A400'
  | 'A700'

export type MaterialUIPalette = { [key in ShadeKey]: { color: Color; contrastText: Color } }

const atMost100 = num => (num > 100 ? 100 : num)

function generateValStart(v) {
  // given a value between 0 and 100 it returns a value from 50 - 100
  return round(100 - (100 - v / 100 - sqrt(v) + v * cos(2.65)) / (2 * log10(v + 1) + 1.25))
}

function calcShortestDistance(a: number, b: number) {
  const difference = abs(a - b) % 360
  return difference > 180 ? 360 - difference : difference
}

export function calcHueDistance(start: number, end: number): [number, number] {
  start = round(start)
  end = round(end)
  if (start === 0) {
    start = 360
  }
  if (end === 0) {
    end = 360
  }
  const hueDistance = calcShortestDistance(start, end)
  if ((start + hueDistance) % 360 === end) {
    return [start, start + hueDistance]
  } else if ((start - hueDistance) % 360 === end) {
    return [start, start - hueDistance]
  } else if ((end + hueDistance) % 360 === start) {
    return [end + hueDistance, end]
  } else {
    return [end - hueDistance, end]
  }
}

const altColorAdjs = {
  A100: { hAdj: 2, sAdj: 200, vAdj: 105 },
  A200: { hAdj: 2, sAdj: 182, vAdj: 108 },
  A400: { hAdj: 2, sAdj: 137, vAdj: 113 },
  A700: { hAdj: 4, sAdj: 120, vAdj: 123 },
}

export function contrastText(color) {
  return tinycolor(color).getLuminance() < 1 / 3 ? tinycolor('#FFF') : tinycolor('#000')
}

function altColor(color: ColorInput, alt: 'A100' | 'A200' | 'A400' | 'A700') {
  const { h, s, v } = tinycolor(color).toHsv()
  const { hAdj, sAdj, vAdj } = altColorAdjs[alt]
  return tinycolor({ h: (h + hAdj) % 360, s: atMost100(s * sAdj), v: atMost100(v * vAdj) })
}

function formatColor(color: TinyColor, format: ColorFormat) {
  if (format) {
    return color.toString(format) || color
  }
  return color
}

function distribute(value: number, rangeA: [number, number], rangeB: [number, number]) {
  const [fromLow, fromHigh] = rangeA
  const [toLow, toHigh] = rangeB

  const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow)

  if (toLow < toHigh) {
    if (result < toLow) {
      return toLow
    }
    if (result > toHigh) {
      return toHigh
    }
  } else {
    if (result > toLow) {
      return toLow
    }
    if (result < toHigh) {
      return toHigh
    }
  }

  return result
}

function generatePointsOnCurve(curve: bezier.EasingFunction, steps: number) {
  const array: any = []
  for (let step = 0; step < steps; step++) {
    array.push(curve(step / (steps - 1)))
  }
  return array
}

export function generateShades({
  hueStart,
  hueEnd,
  hueCurve = easeInQuad,
  satStart,
  satEnd,
  satCurve = easeOutQuad,
  satRate = 100,
  valStart,
  valEnd,
  valCurve = easeOutQuad,
  steps = 10,
  format = null,
}: GenerateShadesOptions) {
  const hueArray = generatePointsOnCurve(hueCurve, steps)
  const satArray = generatePointsOnCurve(satCurve, steps)
  const valArray = generatePointsOnCurve(valCurve, steps).reverse()

  const shades: Color[] = []

  for (let index = 0; index < steps; index++) {
    const hueStep = distribute(hueArray[index], [0, 1], calcHueDistance(hueStart, hueEnd))
    const satStep = distribute(satArray[index], [0, 1], [satStart, satEnd]) * (satRate * 0.01)
    const valStep = distribute(valArray[index], [0, 1], [valEnd, valStart])
    const color = tinycolor({
      h: (ceil(hueStep) + 360) % 360,
      s: atMost100(ceil(satStep)),
      v: atMost100(ceil(valStep)),
    })

    shades.push(formatColor(color, format))
  }

  return shades
}

export function generateMaterialUIPalette({
  hueStart,
  hueEnd,
  hueCurve = muiHueCurve,
  satStart,
  satEnd,
  satCurve = muiSatCurve,
  satRate = 100,
  valStart,
  valEnd,
  valCurve = muiValCurve,
  format = 'hex',
}: GenerateMaterialUIPaletteOptions): MaterialUIPalette {
  const shades = generateShades({
    hueStart,
    hueEnd,
    hueCurve,
    satStart,
    satEnd,
    satCurve,
    satRate,
    valStart,
    valEnd,
    valCurve,
    steps: 10,
    format,
  })

  return {
    50: { color: shades[0], contrastText: formatColor(contrastText(shades[0]), format) },
    100: { color: shades[1], contrastText: formatColor(contrastText(shades[1]), format) },
    200: { color: shades[2], contrastText: formatColor(contrastText(shades[2]), format) },
    300: { color: shades[3], contrastText: formatColor(contrastText(shades[3]), format) },
    400: { color: shades[4], contrastText: formatColor(contrastText(shades[4]), format) },
    500: { color: shades[5], contrastText: formatColor(contrastText(shades[5]), format) },
    600: { color: shades[6], contrastText: formatColor(contrastText(shades[6]), format) },
    700: { color: shades[7], contrastText: formatColor(contrastText(shades[7]), format) },
    800: { color: shades[8], contrastText: formatColor(contrastText(shades[8]), format) },
    900: { color: shades[9], contrastText: formatColor(contrastText(shades[9]), format) },
    A100: {
      color: formatColor(altColor(shades[1], 'A100'), format),
      contrastText: formatColor(contrastText(altColor(shades[1], 'A100')), format),
    },
    A200: {
      color: formatColor(altColor(shades[2], 'A200'), format),
      contrastText: formatColor(contrastText(altColor(shades[2], 'A200')), format),
    },
    A400: {
      color: formatColor(altColor(shades[4], 'A400'), format),
      contrastText: formatColor(contrastText(altColor(shades[4], 'A400')), format),
    },
    A700: {
      color: formatColor(altColor(shades[7], 'A700'), format),
      contrastText: formatColor(contrastText(altColor(shades[7], 'A700')), format),
    },
  }
}

export default function coloringPalette(color: ColorInput, format: ColorFormat = 'hex') {
  const defaultColor = tinycolor(color)
  const { h, s, v } = defaultColor.toHsv()

  const hueStart = h
  const satStart = round(s * 10)
  const valStart = generateValStart(v * 100)
  const hueEnd = (h + 354) % 360
  const satEnd = round(atMost100(s * 108))
  const valEnd = round(v * 66)

  const palette = generateMaterialUIPalette({ hueStart, satStart, valStart, hueEnd, valEnd, satEnd, format })
  palette[500] = {
    color: formatColor(defaultColor, format),
    contrastText: formatColor(contrastText(defaultColor), format),
  }
  return palette
}
