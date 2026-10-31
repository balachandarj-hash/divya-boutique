import { PRODUCTS, type Product } from '../data/catalog'
import { asset } from './asset'

export interface Swatch {
  h: number
  s: number
  l: number
  weight: number
}

const NAME_SWATCH: Record<string, Swatch> = {
  magenta: { h: 330, s: 70, l: 42, weight: 1 },
  gold: { h: 42, s: 75, l: 48, weight: 0.7 },
  purple: { h: 280, s: 55, l: 32, weight: 1 },
  wine: { h: 350, s: 60, l: 28, weight: 1 },
  ivory: { h: 40, s: 25, l: 90, weight: 0.8 },
  emerald: { h: 150, s: 55, l: 28, weight: 1 },
  red: { h: 0, s: 70, l: 38, weight: 1 },
  blush: { h: 350, s: 45, l: 72, weight: 1 },
  pink: { h: 340, s: 55, l: 68, weight: 1 },
  rose: { h: 350, s: 50, l: 62, weight: 1 },
  peach: { h: 20, s: 55, l: 72, weight: 1 },
  violet: { h: 275, s: 50, l: 38, weight: 1 },
  black: { h: 0, s: 0, l: 10, weight: 1 },
  silver: { h: 210, s: 8, l: 72, weight: 0.6 },
  'powder blue': { h: 205, s: 40, l: 72, weight: 1 },
  mustard: { h: 44, s: 70, l: 48, weight: 1 },
  mint: { h: 155, s: 35, l: 72, weight: 1 },
  berry: { h: 340, s: 55, l: 38, weight: 1 },
  green: { h: 140, s: 40, l: 38, weight: 1 },
  cream: { h: 40, s: 28, l: 88, weight: 0.8 },
  sand: { h: 35, s: 22, l: 72, weight: 0.7 },
  navy: { h: 220, s: 40, l: 22, weight: 1 },
  white: { h: 40, s: 8, l: 94, weight: 0.6 },
  beige: { h: 35, s: 20, l: 78, weight: 0.7 },
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: l * 100 }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return { h: h * 60, s: s * 100, l: l * 100 }
}

function hueDist(a: number, b: number): number {
  const d = Math.abs(a - b)
  return Math.min(d, 360 - d)
}

function rgbDist(a: [number, number, number], b: [number, number, number]): number {
  const dr = a[0] - b[0]
  const dg = a[1] - b[1]
  const db = a[2] - b[2]
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

function edgeBackground(data: Uint8ClampedArray, size: number): [number, number, number] | null {
  let r = 0
  let g = 0
  let b = 0
  let n = 0
  const take = (x: number, y: number) => {
    const i = (y * size + x) * 4
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
    n += 1
  }
  for (let i = 0; i < size; i += 2) {
    take(i, 0)
    take(i, size - 1)
    take(0, i)
    take(size - 1, i)
  }
  if (!n) return null
  return [r / n, g / n, b / n]
}

function centerAverage(data: Uint8ClampedArray, size: number): [number, number, number] {
  const lo = Math.floor(size * 0.3)
  const hi = Math.ceil(size * 0.7)
  let r = 0
  let g = 0
  let b = 0
  let n = 0
  for (let y = lo; y < hi; y++) {
    for (let x = lo; x < hi; x++) {
      const i = (y * size + x) * 4
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      n += 1
    }
  }
  return [r / n, g / n, b / n]
}

function isBackgroundPixel(
  rgb: [number, number, number],
  hsl: { h: number; s: number; l: number },
  bg: [number, number, number] | null,
): boolean {
  if (!bg) return false
  if (rgbDist(rgb, bg) < 78) return true
  const bgHsl = rgbToHsl(bg[0], bg[1], bg[2])
  if (bgHsl.s > 22 && hsl.s > 16 && hueDist(hsl.h, bgHsl.h) < 22) return true
  return false
}

function bucketsFromPixels(
  data: Uint8ClampedArray,
  size: number,
  bg: [number, number, number] | null,
): Swatch[] {
  const buckets = new Map<number, { n: number; s: number; l: number }>()
  let kept = 0
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const rgb: [number, number, number] = [data[i], data[i + 1], data[i + 2]]
      const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2])
      if (isBackgroundPixel(rgb, hsl, bg)) continue
      if (hsl.l > 94 || hsl.l < 5) continue
      if (hsl.s < 10 && hsl.l > 78) continue
      const dx = (x + 0.5) / size - 0.5
      const dy = (y + 0.5) / size - 0.5
      const center = Math.exp(-(dx * dx + dy * dy) * 7)
      const satBoost = 0.35 + Math.min(hsl.s, 85) / 70
      const w = center * satBoost
      const key = Math.round(hsl.h / 12) * 12
      const cur = buckets.get(key) ?? { n: 0, s: 0, l: 0 }
      cur.n += w
      cur.s += hsl.s * w
      cur.l += hsl.l * w
      buckets.set(key, cur)
      kept += w
    }
  }
  if (kept < 8) return []
  const raw = [...buckets.entries()]
    .map(([h, v]) => ({
      h,
      s: v.s / v.n,
      l: v.l / v.n,
      weight: v.n / kept,
    }))
    .sort((a, b) => b.weight - a.weight)
  return refineSwatches(mergeHues(raw)).slice(0, 4)
}

function mergeHues(swatches: Swatch[]): Swatch[] {
  const out: Swatch[] = []
  for (const s of swatches) {
    const near = out.find((x) => hueDist(x.h, s.h) <= 20)
    if (!near) {
      out.push({ ...s })
      continue
    }
    const w = near.weight + s.weight
    let h1 = near.h
    let h2 = s.h
    if (h2 - h1 > 180) h2 -= 360
    if (h1 - h2 > 180) h1 -= 360
    near.h = ((h1 * near.weight + h2 * s.weight) / w + 360) % 360
    near.s = (near.s * near.weight + s.s * s.weight) / w
    near.l = (near.l * near.weight + s.l * s.weight) / w
    near.weight = w
  }
  return out.sort((a, b) => b.weight - a.weight)
}

function isSkin(s: Swatch): boolean {
  return hueDist(s.h, 28) < 22 && s.s >= 16 && s.s <= 68 && s.l >= 28 && s.l <= 80
}

function refineSwatches(swatches: Swatch[]): Swatch[] {
  const garmentW = swatches.filter((s) => !isSkin(s) && s.s > 20).reduce((n, s) => n + s.weight, 0)
  const next =
    garmentW >= 0.18
      ? swatches.map((s) => (isSkin(s) ? { ...s, weight: s.weight * 0.22 } : s))
      : swatches
  const total = next.reduce((n, s) => n + s.weight, 0) || 1
  return next
    .map((s) => ({ ...s, weight: s.weight / total }))
    .sort((a, b) => b.weight - a.weight)
}

export async function swatchesFromFile(file: Blob): Promise<Swatch[]> {
  const url = URL.createObjectURL(file)
  try {
    return await swatchesFromUrl(url)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function swatchesFromUrl(src: string): Promise<Swatch[]> {
  const img = await loadImage(src)
  const size = 220
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(img, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)
  const bg = edgeBackground(data, size)
  const center = centerAverage(data, size)
  const distinctBg = bg ? rgbDist(bg, center) > 36 : false
  const subject = distinctBg ? bucketsFromPixels(data, size, bg) : []
  if (subject.length) return subject
  return bucketsFromPixels(data, size, null)
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not read that image'))
    img.src = src
  })
}

function namedSwatches(product: Product): Swatch[] {
  return product.colors
    .map((name) => NAME_SWATCH[name.toLowerCase()])
    .filter((s): s is Swatch => Boolean(s))
}

function score(query: Swatch[], catalog: Swatch[]): number {
  if (query.length === 0 || catalog.length === 0) return 0
  let total = 0
  for (const q of query) {
    let best = 0
    for (const c of catalog) {
      const h = 1 - hueDist(q.h, c.h) / 180
      const s = 1 - Math.abs(q.s - c.s) / 100
      const l = 1 - Math.abs(q.l - c.l) / 100
      const hit = h * 0.74 + s * 0.13 + l * 0.13
      best = Math.max(best, hit)
    }
    total += best * q.weight
  }
  return total
}

function hueBonus(query: Swatch[], catalog: Swatch[]): number {
  const q = query[0]
  if (!q || q.s < 18) return 0
  return catalog.some((c) => hueDist(q.h, c.h) < 34 && c.s >= 14) ? 0.08 : 0
}

const photoCache = new Map<string, Promise<Swatch[]>>()

function photoSwatches(product: Product): Promise<Swatch[]> {
  const src = asset(product.images[0])
  const hit = photoCache.get(src)
  if (hit) return hit
  const next = swatchesFromUrl(src).catch(() => [])
  photoCache.set(src, next)
  return next
}

export async function findSimilarProducts(file: Blob, limit = 8): Promise<Product[]> {
  const query = await swatchesFromFile(file)
  if (query.length === 0) return PRODUCTS.slice(0, limit)
  const scored = await Promise.all(
    PRODUCTS.map(async (product) => {
      const photo = await photoSwatches(product)
      const named = namedSwatches(product)
      const visual = score(query, photo)
      const namedScore = score(query, named)
      const bonus = hueBonus(query, photo) + hueBonus(query, named)
      const twin = visual >= 0.93 ? 0.2 : 0
      return { product, n: visual * 0.68 + namedScore * 0.18 + bonus + twin }
    }),
  )
  return scored
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((x) => x.product)
}
