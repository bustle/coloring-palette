import { assert } from 'chai'
import coloringPalette, { calcHueDistance } from '.'
import { teal } from './colors'
import { tinycolor } from '@ctrl/tinycolor'

function assertWithinRange(a: number, b: number, range: number, color: string) {
  return assert.isAtMost(Math.round(Math.abs(a - b)), range, color)
}

describe('Coloring Palette', () => {
  it('can create palettes for a given color', () => {
    const colorPalette = coloringPalette(teal[500], null)
    Object.keys(colorPalette).forEach(shadeKey => {
      const materialColor = teal[shadeKey]
      const colorHsv = colorPalette[shadeKey].color.toHsv()
      if (shadeKey.includes('A')) {
        const normColorHsv = colorPalette[shadeKey.replace('A', '')].color.toHsv()
        assert.isAbove(colorHsv.h, normColorHsv.h, `${materialColor}.${shadeKey}.h`)
        assert.isAbove(colorHsv.s, normColorHsv.s, `${materialColor}.${shadeKey}.s`)
        assert.isAbove(colorHsv.v, normColorHsv.v, `${materialColor}.${shadeKey}.v`)
      } else {
        const materialHsv = tinycolor(materialColor).toHsv()
        assertWithinRange(colorHsv.h, materialHsv.h, 5, `${materialColor}.${shadeKey}.h`)
        assertWithinRange(colorHsv.s * 100, materialHsv.s * 100, 15, `${materialColor}.${shadeKey}.s`)
        assertWithinRange(colorHsv.v * 100, materialHsv.v * 100, 15, `${materialColor}.${shadeKey}.v`)
      }
    })
  })
})
describe('calcHueDistance - calculates the correct starting and stopping distances for hue', () => {
  it('calcHueDistance(45, 60)', () => {
    assert.deepEqual(calcHueDistance(45, 60), [45, 60])
    assert.deepEqual(calcHueDistance(60, 45), [60, 45])
  })
  it('calcHueDistance(170, 190)', () => {
    assert.deepEqual(calcHueDistance(170, 190), [170, 190])
    assert.deepEqual(calcHueDistance(190, 170), [190, 170])
  })
  it('calcHueDistance(0, 10)', () => {
    assert.deepEqual(calcHueDistance(0, 10), [360, 370])
    assert.deepEqual(calcHueDistance(10, 0), [370, 360])
  })
  it('calcHueDistance(25, 250)', () => {
    assert.deepEqual(calcHueDistance(25, 250), [385, 250])
    assert.deepEqual(calcHueDistance(250, 25), [250, 385])
  })
  it('calcHueDistance(0, 355)', () => {
    assert.deepEqual(calcHueDistance(0, 355), [360, 355])
    assert.deepEqual(calcHueDistance(355, 0), [355, 360])
  })
  it('calcHueDistance(4.1, 355)', () => {
    assert.deepEqual(calcHueDistance(4.1, 355), [364, 355])
    assert.deepEqual(calcHueDistance(355, 4.1), [355, 364])
  })
  it('calcHueDistance(4, 0)', () => {
    assert.deepEqual(calcHueDistance(4, 0), [364, 360])
    assert.deepEqual(calcHueDistance(0, 4), [360, 364])
  })
})
