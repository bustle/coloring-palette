import { TinyColor } from '@ctrl/tinycolor/'
import bezier from 'bezier-easing'
import { easeInQuad, easeOutQuad } from './curves'

function calcShortestDistance(a, b) {
  const difference = Math.abs(a - b) % 360
  return difference > 180 ? 360 - difference : difference
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
    const value = curve(step / (steps - 1))
    array.push(value)
  }
  return array
}

export interface GenerateShadesOptions {
  readonly hueStart: number
  readonly hueEnd: number
  readonly satStart: number
  readonly satEnd: number
  readonly satRate?: number
  readonly valStart: number
  readonly valEnd: number
  readonly steps?: number
}

export function generateShades({
  hueStart,
  hueEnd,
  satStart,
  satEnd,
  satRate = 100,
  valStart,
  valEnd,
  steps = 10,
}: GenerateShadesOptions) {
  const hueArray = generatePointsOnCurve(easeInQuad, steps)
  const satArray = generatePointsOnCurve(easeOutQuad, steps)
  const valArray = generatePointsOnCurve(easeOutQuad, steps).reverse()
  const hueDistance = calcShortestDistance(hueStart, hueEnd)
  const calcHueEnd = hueStart + hueDistance === hueEnd ? hueStart + hueDistance : hueStart - hueDistance

  const shades: any[] = []

  for (let index = 0; index < steps; index++) {
    const hueStep = distribute(hueArray[index], [0, 1], [hueStart, calcHueEnd])
    const satStep = distribute(satArray[index], [0, 1], [satStart, satEnd]) * (satRate * 0.01)
    const valStep = distribute(valArray[index], [0, 1], [valEnd, valStart])

    shades.push(
      new TinyColor({
        h: (Math.ceil(hueStep) + 360) % 360,
        s: Math.ceil(satStep) > 100 ? 100 : Math.ceil(satStep),
        v: Math.ceil(valStep),
      })
    )
  }

  return shades
}
