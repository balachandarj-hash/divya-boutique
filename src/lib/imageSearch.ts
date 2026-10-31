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
  const size = 72
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(img, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)
  const buckets = new Map<number, { n: number; s: number; l: number }>()
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const { h, s, l } = rgbToHsl(r, g, b)
    if (l > 92 || l < 8) continue
    if (s < 8 && l > 75) continue
    const key = Math.round(h / 15) * 15
    const cur = buckets.get(key) ?? { n: 0, s: 0, l: 0 }
    cur.n += 1
    cur.s += s
    cur.l += l
    buckets.set(key, cur)
  }
  const total = [...buckets.values()].reduce((n, x) => n + x.n, 0) || 1
  return [...buckets.entries()]
    .map(([h, v]) => ({
      h,
      s: v.s / v.n,
      l: v.l / v.n,
      weight: v.n / total,
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4)
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
      const hit = h * 0.62 + s * 0.2 + l * 0.18
      best = Math.max(best, hit * c.weight)
    }
    total += best * q.weight
  }
  return total
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
      return { product, n: visual * 0.72 + namedScore * 0.28 }
    }),
  )
  return scored
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((x) => x.product)
}
