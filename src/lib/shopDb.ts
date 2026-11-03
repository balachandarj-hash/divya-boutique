import { PRODUCTS } from '../data/catalog'
import type { CartLine, User } from '../context/Store'

export const CART_KEY = 'divya-cart'
export const ORDERS_KEY = 'divya-orders'
const CARTS_KEY = 'divya-shop-carts'
const VISITOR_KEY = 'divya-visitor-id'
const SETTINGS_KEY = 'divya-admin-settings'

export type CartRecordStatus = 'open' | 'converted'
export type ShopOrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export interface ShopCartItem {
  productId: string
  name: string
  image: string
  qty: number
  price: number
  size: string
  color: string
}

export interface ShopCart {
  id: string
  guest: boolean
  customerName: string
  email: string
  items: ShopCartItem[]
  total: number
  createdAt: string
  updatedAt: string
  status: CartRecordStatus
  convertedOrderId?: string
}

export interface ShopOrder {
  id: string
  createdAt: string
  cartId: string
  customerName: string
  name: string
  email: string
  phone: string
  city: string
  address?: string
  payment: string
  total: number
  status: ShopOrderStatus
  lines: CartLine[]
  items: ShopCartItem[]
}

export interface AdminSettings {
  abandonedAfterHours: number
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('divya-shop'))
}

export function getVisitorId(rotate = false): string {
  if (rotate) localStorage.removeItem(VISITOR_KEY)
  let id = localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id = `guest-${crypto.randomUUID()}`
    localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

export function linesToItems(lines: CartLine[]): ShopCartItem[] {
  return lines.map((line) => {
    const product = PRODUCTS.find((p) => p.id === line.productId)
    return {
      productId: line.productId,
      name: product?.name ?? line.productId,
      image: product?.images[0] ?? 'images/cat-saree.jpg',
      qty: line.qty,
      price: product?.price ?? 0,
      size: line.size,
      color: line.color,
    }
  })
}

export function cartTotal(items: ShopCartItem[]): number {
  return items.reduce((n, i) => n + i.price * i.qty, 0)
}

export function listCarts(): ShopCart[] {
  return readJson<ShopCart[]>(CARTS_KEY, [])
}

function saveCarts(carts: ShopCart[]) {
  writeJson(CARTS_KEY, carts)
}

export function getSettings(): AdminSettings {
  const raw = readJson<Partial<AdminSettings>>(SETTINGS_KEY, {})
  return { abandonedAfterHours: Math.max(1, Number(raw.abandonedAfterHours) || 24) }
}

export function saveSettings(next: AdminSettings) {
  writeJson(SETTINGS_KEY, next)
}

export function isAbandoned(cart: ShopCart, now = Date.now()): boolean {
  if (cart.status === 'converted' || cart.items.length === 0) return false
  const hours = getSettings().abandonedAfterHours
  return now - new Date(cart.updatedAt).getTime() > hours * 60 * 60 * 1000
}

export function listActiveCarts(): ShopCart[] {
  return listCarts().filter((c) => c.status === 'open' && c.items.length > 0 && !isAbandoned(c))
}

export function listAbandonedCarts(): ShopCart[] {
  return listCarts().filter((c) => isAbandoned(c))
}

function itemsMatch(a: ShopCartItem[], b: ShopCartItem[]) {
  if (a.length !== b.length) return false
  return a.every((item, i) => {
    const other = b[i]
    return (
      item.productId === other.productId &&
      item.qty === other.qty &&
      item.size === other.size &&
      item.color === other.color &&
      item.price === other.price
    )
  })
}

export function upsertOpenCart(lines: CartLine[], user: User | null, total: number) {
  const items = linesToItems(lines)
  const id = getVisitorId()
  const carts = listCarts()
  const idx = carts.findIndex((c) => c.id === id)
  const existing = idx >= 0 ? carts[idx] : null

  if (items.length === 0) {
    if (existing?.status === 'open') saveCarts(carts.filter((c) => c.id !== id))
    return
  }

  if (existing?.status === 'converted') {
    const fresh = getVisitorId(true)
    const row: ShopCart = {
      id: fresh,
      guest: !user,
      customerName: user?.name || 'Guest shopper',
      email: user?.email || '',
      items,
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'open',
    }
    saveCarts([row, ...carts])
    return
  }

  const customerName = user?.name || existing?.customerName || 'Guest shopper'
  const email = user?.email || existing?.email || ''
  const guest = !user

  if (existing && itemsMatch(existing.items, items) && existing.total === total && existing.customerName === customerName && existing.email === email && existing.guest === guest) {
    return
  }

  const itemsChanged = !existing || !itemsMatch(existing.items, items) || existing.total !== total
  const row: ShopCart = {
    id,
    guest,
    customerName,
    email,
    items,
    total,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: itemsChanged || !existing ? new Date().toISOString() : existing.updatedAt,
    status: 'open',
  }
  if (idx === -1) saveCarts([row, ...carts])
  else {
    const next = carts.slice()
    next[idx] = row
    saveCarts(next)
  }
}

export function convertCart(orderId: string): string {
  const id = getVisitorId()
  const carts = listCarts().map((c) =>
    c.id === id ? { ...c, status: 'converted' as const, convertedOrderId: orderId, updatedAt: new Date().toISOString() } : c,
  )
  saveCarts(carts)
  getVisitorId(true)
  return id
}

export function listShopOrders(): ShopOrder[] {
  const raw = readJson<Array<Partial<ShopOrder> & { name?: string; lines?: CartLine[]; total?: number }>>(ORDERS_KEY, [])
  return raw.map((o) => {
    const lines = o.lines ?? []
    const items = o.items?.length ? o.items : linesToItems(lines)
    const name = o.customerName || o.name || 'Customer'
    return {
      id: o.id ?? `DB-${Date.now()}`,
      createdAt: o.createdAt ?? new Date().toISOString(),
      cartId: o.cartId ?? '',
      customerName: name,
      name,
      email: o.email ?? '',
      phone: o.phone ?? '',
      city: o.city ?? '',
      address: o.address,
      payment: o.payment ?? 'upi',
      total: o.total ?? 0,
      status: o.status ?? 'pending',
      lines,
      items,
    }
  })
}

export function saveShopOrder(order: ShopOrder) {
  writeJson(ORDERS_KEY, [order, ...listShopOrders().filter((o) => o.id !== order.id)])
}

export function updateShopOrderStatus(id: string, status: ShopOrderStatus) {
  writeJson(
    ORDERS_KEY,
    listShopOrders().map((o) => (o.id === id ? { ...o, status } : o)),
  )
}

export type ShopCustomer = {
  id: string
  name: string
  email: string
  phone: string
  city: string
  orders: number
  spent: number
  lastOrderAt: string
}

export function customersFromShop(): ShopCustomer[] {
  const map = new Map<string, { id: string; name: string; email: string; phone: string; city: string; orders: number; spent: number; lastOrderAt: string }>()
  for (const o of listShopOrders()) {
    const key = (o.email || o.customerName).toLowerCase()
    const cur = map.get(key)
    if (!cur) {
      map.set(key, {
        id: key,
        name: o.customerName,
        email: o.email,
        phone: o.phone,
        city: o.city,
        orders: 1,
        spent: o.status === 'cancelled' ? 0 : o.total,
        lastOrderAt: o.createdAt,
      })
    } else {
      cur.orders += 1
      if (o.status !== 'cancelled') cur.spent += o.total
      if (o.createdAt > cur.lastOrderAt) cur.lastOrderAt = o.createdAt
    }
  }
  return [...map.values()].sort((a, b) => b.lastOrderAt.localeCompare(a.lastOrderAt))
}

export function monthlyFromOrders() {
  const map = new Map<string, { month: string; sort: string; revenue: number; orders: number }>()
  for (const o of listShopOrders()) {
    if (o.status === 'cancelled') continue
    const d = new Date(o.createdAt)
    const sort = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const month = d.toLocaleString('en-IN', { month: 'short' })
    const cur = map.get(sort) ?? { month, sort, revenue: 0, orders: 0 }
    cur.revenue += o.total
    cur.orders += 1
    map.set(sort, cur)
  }
  return [...map.values()].sort((a, b) => a.sort.localeCompare(b.sort))
}

export function topSellersFromOrders() {
  const map = new Map<string, { productId: string; name: string; units: number; revenue: number }>()
  for (const o of listShopOrders()) {
    if (o.status === 'cancelled') continue
    for (const item of o.items) {
      const cur = map.get(item.productId) ?? { productId: item.productId, name: item.name, units: 0, revenue: 0 }
      cur.units += item.qty
      cur.revenue += item.price * item.qty
      map.set(item.productId, cur)
    }
  }
  return [...map.values()].sort((a, b) => b.units - a.units).slice(0, 5)
}

export function salesByCategoryFromOrders() {
  const map = new Map<string, number>()
  for (const o of listShopOrders()) {
    if (o.status === 'cancelled') continue
    for (const item of o.items) {
      const product = PRODUCTS.find((p) => p.id === item.productId)
      const key = product?.category ?? 'other'
      map.set(key, (map.get(key) ?? 0) + item.price * item.qty)
    }
  }
  return map
}
