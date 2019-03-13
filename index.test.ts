import { assert } from 'chai'
import coloringPalette from '.'
import colors from './colors'

describe('Coloring Palette', () => {
  it('can create palettes for all the colors', () => {
    colors.forEach(color => {
      assert.deepEqual(coloringPalette(color[500]).as('hex'), color)
    })
  })
})
