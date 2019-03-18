import { TinyColor } from '@ctrl/tinycolor/'

function calcShortestDistance(a, b) {
  const difference = Math.abs(a - b) % 360
  return difference > 180 ? 360 - difference : difference
}

export default function (color: string) {

}
