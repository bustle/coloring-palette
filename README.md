# coloring-palette
A library that generates color palettes based on the Material UI color system, forked from [Lyft's coloralgorithm](https://github.com/lyft/coloralgorithm)

# API

## generateShades

Generates an array of `TinyColor` shades between two HSV values using optional curve functions. Defaults to ease-in/ease-out curves and 10 shades. For inputs the `hue` is a number from 0 - 360, `saturation` and `value` are both numbers from 0 - 100.

```ts
export declare function generateShades({ hueStart, hueEnd, hueCurve, satStart, satEnd, satCurve, satRate, valStart, valEnd, valCurve, steps, format }: GenerateShadesOptions): Color[];

export interface GenerateShadesOptions {
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
  readonly steps?: number // the number returned shades
  readonly format = null, // the desired output of the array, null defaults to Tinycolor instances
}

// given the reds hsv(351, 8, 100) and hsv(0, 85, 72)
const shades = generateShades({
  hueStart: 351,
  satStart: 8,
  valStart: 100,
  hueEnd: 0,
  satEnd: 85,
  valEnd: 72,
  format: 'hex',
})
// [ '#e6dcdd', '#e3b1b4', '#db8489', '#d16066', '#c24246', '#ad2b2e', '#911c1c', '#6e120f', '#450c08', '#1a0403' ]
```
Or better visualized as;

![#ffebee](https://placehold.it/25/ffebee/000000?text=+)
![#ffbfc8](https://placehold.it/25/ffbfc8/000000?text=+)
![#fc97a5](https://placehold.it/25/fc97a5/000000?text=+)
![#fa7585](https://placehold.it/25/fa7585/000000?text=+)
![#f25769](https://placehold.it/25/f25769/000000?text=+)
![#ed4253](https://placehold.it/25/ed4253/000000?text=+)
![#e33440](https://placehold.it/25/e33440/000000?text=+)
![#d62931](https://placehold.it/25/d62931/000000?text=+)
![#c72023](https://placehold.it/25/c72023/000000?text=+)
![#b81c1c](https://placehold.it/25/b81c1c/000000?text=+)

## generateMaterialUIPalette

Generates a color palette based on material ui from two HSV values. Shades returned are `TinyColor` objects or strings, based on the `format` option, which defaults to `'hex'`. Optional curve functions default to `muiHueCurve`, `muiSatCurve`, and `muiValCurve`. For inputs the `hue` is a number from 0 - 360, `saturation` and `value` are both numbers from 0 - 100.


```ts
export declare function generateMaterialUIPalette({ hueStart, hueEnd, hueCurve, satStart, satEnd, satCurve, satRate, valStart, valEnd, valCurve, format }: GenerateShadesOptions): MaterialUIPalette[];

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
  readonly format: colorFormat
}

interface MaterialUIPalette {
  readonly 50: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 100: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 200: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 300: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 400: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 500: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 600: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 700: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 800: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly 900: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly A100: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly A200: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly A400: { color: TinyColor | string; contrastText: TinyColor | string }
  readonly A700: { color: TinyColor | string; contrastText: TinyColor | string }
}

// given the reds hsv(351, 8, 100) and hsv(0, 85, 72)
const shades = generateMaterialUIPalette({
  hueStart: 351,
  satStart: 8,
  valStart: 100,
  hueEnd: 0,
  satEnd: 85,
  valEnd: 72,
  format: 'hex',
})
// { '50': { color: '#ffebee', contrastText: '#000000' },
//   '100': { color: '#ffc4cc', contrastText: '#000000' },
//   '200': { color: '#fc97a3', contrastText: '#000000' },
//   '300': { color: '#f56977', contrastText: '#ffffff' },
//   '400': { color: '#ed424e', contrastText: '#ffffff' },
//   '500': { color: '#e63039', contrastText: '#ffffff' },
//   '600': { color: '#db252b', contrastText: '#ffffff' },
//   '700': { color: '#cf2124', contrastText: '#ffffff' },
//   '800': { color: '#c41d1d', contrastText: '#ffffff' },
//   '900': { color: '#b81c1c', contrastText: '#ffffff' },
//   A100: { color: '#ff8995', contrastText: '#000000' },
//   A200: { color: '#ff4555', contrastText: '#ffffff' },
//   A400: { color: '#ff030c', contrastText: '#ffffff' },
//   A700: { color: '#ff0d00', contrastText: '#ffffff' } }
```
Which is visualized as

![#ffebee](https://placehold.it/25/ffebee/000000?text=+)
![#ffc4cc](https://placehold.it/25/ffc4cc/000000?text=+)
![#fc97a3](https://placehold.it/25/fc97a3/000000?text=+)
![#f56977](https://placehold.it/25/f56977/000000?text=+)
![#ed424e](https://placehold.it/25/ed424e/000000?text=+)
![#e63039](https://placehold.it/25/e63039/000000?text=+)
![#db252b](https://placehold.it/25/db252b/000000?text=+)
![#cf2124](https://placehold.it/25/cf2124/000000?text=+)
![#c41d1d](https://placehold.it/25/c41d1d/000000?text=+)
![#b81c1c](https://placehold.it/25/b81c1c/000000?text=+)
![#ff8995](https://placehold.it/25/ff8995/000000?text=+)
![#ff4555](https://placehold.it/25/ff4555/000000?text=+)
![#ff030c](https://placehold.it/25/ff030c/000000?text=+)
![#ff0d00](https://placehold.it/25/ff0d00/000000?text=+)

Compared to MaterialUIs

![#ffebee](https://placehold.it/25/ffebee/000000?text=+)
![#ffcdd2](https://placehold.it/25/ffcdd2/000000?text=+)
![#ef9a9a](https://placehold.it/25/ef9a9a/000000?text=+)
![#e57373](https://placehold.it/25/e57373/000000?text=+)
![#ef5350](https://placehold.it/25/ef5350/000000?text=+)
![#f44336](https://placehold.it/25/f44336/000000?text=+)
![#e53935](https://placehold.it/25/e53935/000000?text=+)
![#d32f2f](https://placehold.it/25/d32f2f/000000?text=+)
![#c62828](https://placehold.it/25/c62828/000000?text=+)
![#b71c1c](https://placehold.it/25/b71c1c/000000?text=+)
![#ff8a80](https://placehold.it/25/ff8a80/000000?text=+)
![#ff5252](https://placehold.it/25/ff5252/000000?text=+)
![#ff1744](https://placehold.it/25/ff1744/000000?text=+)
![#d50000](https://placehold.it/25/d50000/000000?text=+)

## materialUI
Generates a color palette based on material ui from a color input. Shades returned are `TinyColor` objects or strings, based on the `format` option, which defaults to `'hex'`.

```ts
export declare function materialUI(color: ColorInput, format: ColorFormat = 'hex'): TinyColor[];
// Given a Teal input
const shades = materialUI('#009688', 'hex')
// { '50': { color: '#dcf5f2', contrastText: '#000000' },
//   '100': { color: '#b0f5ee', contrastText: '#000000' },
//   '200': { color: '#7eede2', contrastText: '#000000' },
//   '300': { color: '#4ae0cf', contrastText: '#000000' },
//   '400': { color: '#21d1ba', contrastText: '#000000' },
//   '500': { color: '#0dbda2', contrastText: '#000000' },
//   '600': { color: '#05a88d', contrastText: '#ffffff' },
//   '700': { color: '#019177', contrastText: '#ffffff' },
//   '800': { color: '#007a64', contrastText: '#ffffff' },
//   '900': { color: '#006350', contrastText: '#ffffff' },
//   A100: { color: '#6ffff5', contrastText: '#000000' },
//   A200: { color: '#26fff1', contrastText: '#000000' },
//   A400: { color: '#00ecd5', contrastText: '#000000' },
//   A700: { color: '#00b29e', contrastText: '#000000' } }
```
Visualized below

![#dcf5f2](https://placehold.it/25/dcf5f2/000000?text=+)
![#b0f5ee](https://placehold.it/25/b0f5ee/000000?text=+)
![#7eede2](https://placehold.it/25/7eede2/000000?text=+)
![#4ae0cf](https://placehold.it/25/4ae0cf/000000?text=+)
![#21d1ba](https://placehold.it/25/21d1ba/000000?text=+)
![#0dbda2](https://placehold.it/25/0dbda2/000000?text=+)
![#05a88d](https://placehold.it/25/05a88d/000000?text=+)
![#019177](https://placehold.it/25/019177/000000?text=+)
![#007a64](https://placehold.it/25/007a64/000000?text=+)
![#006350](https://placehold.it/25/006350/000000?text=+)
![#6ffff5](https://placehold.it/25/6ffff5/000000?text=+)
![#26fff1](https://placehold.it/25/26fff1/000000?text=+)
![#00ecd5](https://placehold.it/25/00ecd5/000000?text=+)
![#00b29e](https://placehold.it/25/00b29e/000000?text=+)


Compared to Material UIs colors

![#e0f2f1](https://placehold.it/25/e0f2f1/000000?text=+)
![#b2dfdb](https://placehold.it/25/b2dfdb/000000?text=+)
![#80cbc4](https://placehold.it/25/80cbc4/000000?text=+)
![#4db6ac](https://placehold.it/25/4db6ac/000000?text=+)
![#26a69a](https://placehold.it/25/26a69a/000000?text=+)
![#009688](https://placehold.it/25/009688/000000?text=+)
![#00897b](https://placehold.it/25/00897b/000000?text=+)
![#00796b](https://placehold.it/25/00796b/000000?text=+)
![#00695c](https://placehold.it/25/00695c/000000?text=+)
![#004d40](https://placehold.it/25/004d40/000000?text=+)
![#a7ffeb](https://placehold.it/25/a7ffeb/000000?text=+)
![#64ffda](https://placehold.it/25/64ffda/000000?text=+)
![#1de9b6](https://placehold.it/25/1de9b6/000000?text=+)
![#00bfa5](https://placehold.it/25/00bfa5/000000?text=+)
