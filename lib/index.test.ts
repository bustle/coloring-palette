import { assert } from 'chai'
import coloringPalette, { calcHueDistance } from '.'
import colors from './colors'

describe('Coloring Palette', () => {
  it('can create palettes for all the colors', () => {
    colors.forEach(color => {
      // assert.deepEqual(coloringPalette(color[500]), color)
    })
  })
  describe('calculates the correct starting and stopping distances for hue', () => {
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
})
