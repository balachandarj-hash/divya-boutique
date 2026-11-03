import { CATEGORIES, COLLECTIONS, PRODUCTS, type CategoryId } from '../../data/catalog'

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
export type Payment = 'upi' | 'cod' | 'card'
export type ProductStatus = 'active' | 'draft' | 'hidden'
export type CouponType = 'percent' | 'flat'

export interface AdminInventory {
  productId: string
  sku: string
  stock: number
  reserved: number
  threshold: number
  status: ProductStatus
}

export interface AdminOrderItem {
  productId: string
  name: string
  qty: number
  price: number
}

export interface AdminOrder {
  id: string
  createdAt: string
  customerName: string
  phone: string
  city: string
  payment: Payment
  status: OrderStatus
  total: number
  items: AdminOrderItem[]
}

export interface AdminCustomer {
  id: string
  name: string
  phone: string
  email?: string
  city: string
  orders: number
  spent: number
  lastOrderAt: string
}

export interface AdminCoupon {
  id: string
  code: string
  type: CouponType
  value: number
  active: boolean
  used: number
  note: string
  appliesOnShop: boolean
}

export interface MonthPoint {
  month: string
  revenue: number
  orders: number
}

export interface TopSeller {
  productId: string
  name: string
  units: number
  revenue: number
}

const LOW: Record<string, number> = {
  'ab-saree-wine': 3,
  'ab-kurta-mint': 2,
  'ab-kids-play': 4,
  'ab-west-wrap': 1,
  'ab-half-saree-pink': 5,
  'ab-kurta-garden': 3,
}

function skuFor(id: string, index: number): string {
  const prefix = id.includes('saree') ? 'SA' : id.includes('kurta') ? 'KU' : id.includes('kids') ? 'KD' : 'WE'
  return `DB-${prefix}-${String(index + 1).padStart(3, '0')}`
}

export const inventorySeed: AdminInventory[] = PRODUCTS.map((product, index) => ({
  productId: product.id,
  sku: skuFor(product.id, index),
  stock: LOW[product.id] ?? 8 + ((index * 5) % 24),
  reserved: index % 4 === 0 ? 1 : 0,
  threshold: 5,
  status: product.isNew && index % 7 === 0 ? 'active' : index === 18 ? 'draft' : 'active',
}))

export const ordersSeed: AdminOrder[] = [
  {
    id: 'DB-1042',
    createdAt: '2026-10-30T11:20:00+05:30',
    customerName: 'Meena R.',
    phone: '+91 98421 11002',
    city: 'Trichy',
    payment: 'upi',
    status: 'confirmed',
    total: 800,
    items: [{ productId: 'ab-saree-purple-gold', name: 'Purple Gold Embroidered Sequinned Saree', qty: 1, price: 800 }],
  },
  {
    id: 'DB-1041',
    createdAt: '2026-10-29T18:05:00+05:30',
    customerName: 'Kavitha S.',
    phone: '+91 90031 22881',
    city: 'Kallagam',
    payment: 'cod',
    status: 'pending',
    total: 1598,
    items: [
      { productId: 'ab-half-saree-pink', name: 'Pink Gold Border Half Saree', qty: 1, price: 699 },
      { productId: 'ab-half-saree-black', name: 'Black Stone Work Half Saree', qty: 1, price: 899 },
    ],
  },
  {
    id: 'DB-1038',
    createdAt: '2026-10-27T09:40:00+05:30',
    customerName: 'Anitha P.',
    phone: '+91 97864 44120',
    city: 'Thanjavur',
    payment: 'upi',
    status: 'shipped',
    total: 2899,
    items: [{ productId: 'ab-kurta-emerald', name: 'Emerald Zari Kurta Set', qty: 1, price: 2899 }],
  },
  {
    id: 'DB-1036',
    createdAt: '2026-10-24T16:12:00+05:30',
    customerName: 'Divya L.',
    phone: '+91 96262 77301',
    city: 'Madurai',
    payment: 'card',
    status: 'delivered',
    total: 8499,
    items: [{ productId: 'ab-saree-purple', name: 'Banarasi Purple Silk Saree', qty: 1, price: 8499 }],
  },
  {
    id: 'DB-1033',
    createdAt: '2026-10-20T14:00:00+05:30',
    customerName: 'Priya N.',
    phone: '+91 98940 55612',
    city: 'Chennai',
    payment: 'upi',
    status: 'delivered',
    total: 3298,
    items: [
      { productId: 'ab-kurta-blush', name: 'Blush Floral Cotton Kurta', qty: 1, price: 2199 },
      { productId: 'ab-kids-sharara', name: 'Peach Floral Sharara Set', qty: 1, price: 1099 },
    ],
  },
  {
    id: 'DB-1029',
    createdAt: '2026-10-16T10:22:00+05:30',
    customerName: 'Lakshmi V.',
    phone: '+91 94432 88019',
    city: 'Trichy',
    payment: 'cod',
    status: 'cancelled',
    total: 4299,
    items: [{ productId: 'ab-saree-wine', name: 'Wine Georgette Zari Saree', qty: 1, price: 4299 }],
  },
  {
    id: 'DB-1024',
    createdAt: '2026-10-10T19:48:00+05:30',
    customerName: 'Revathi M.',
    phone: '+91 90925 33140',
    city: 'Karur',
    payment: 'upi',
    status: 'delivered',
    total: 699,
    items: [{ productId: 'ab-half-saree-pink', name: 'Pink Gold Border Half Saree', qty: 1, price: 699 }],
  },
  {
    id: 'DB-1018',
    createdAt: '2026-09-28T12:15:00+05:30',
    customerName: 'Sowmiya K.',
    phone: '+91 97150 22990',
    city: 'Srirangam',
    payment: 'upi',
    status: 'delivered',
    total: 12990,
    items: [{ productId: 'ab-saree-kanjee', name: 'Kanjeevaram Magenta Gold Saree', qty: 1, price: 12990 }],
  },
  {
    id: 'DB-1012',
    createdAt: '2026-09-14T17:30:00+05:30',
    customerName: 'Nandhini J.',
    phone: '+91 99443 11870',
    city: 'Salem',
    payment: 'card',
    status: 'delivered',
    total: 4598,
    items: [
      { productId: 'ab-kurta-violet', name: 'Royal Violet Anarkali', qty: 1, price: 3299 },
      { productId: 'ab-kids-kurta', name: 'Ivory Boys Kurta Pajama', qty: 1, price: 1299 },
    ],
  },
  {
    id: 'DB-1007',
    createdAt: '2026-08-22T11:05:00+05:30',
    customerName: 'Geetha R.',
    phone: '+91 93602 66721',
    city: 'Trichy',
    payment: 'cod',
    status: 'delivered',
    total: 899,
    items: [{ productId: 'ab-half-saree-black', name: 'Black Stone Work Half Saree', qty: 1, price: 899 }],
  },
  {
    id: 'DB-1003',
    createdAt: '2026-07-18T15:40:00+05:30',
    customerName: 'Aishwarya T.',
    phone: '+91 95009 44218',
    city: 'Coimbatore',
    payment: 'upi',
    status: 'delivered',
    total: 6799,
    items: [{ productId: 'ab-saree-ivory', name: 'Ivory Tissue Silk Saree', qty: 1, price: 6799 }],
  },
  {
    id: 'DB-1001',
    createdAt: '2026-06-09T10:10:00+05:30',
    customerName: 'Janani C.',
    phone: '+91 98408 22931',
    city: 'Kallagam',
    payment: 'upi',
    status: 'delivered',
    total: 2199,
    items: [{ productId: 'ab-kurta-blush', name: 'Blush Floral Cotton Kurta', qty: 1, price: 2199 }],
  },
]

export const customersSeed: AdminCustomer[] = [
  { id: 'c1', name: 'Meena R.', phone: '+91 98421 11002', email: 'meena.r@example.com', city: 'Trichy', orders: 3, spent: 4298, lastOrderAt: '2026-10-30T11:20:00+05:30' },
  { id: 'c2', name: 'Kavitha S.', phone: '+91 90031 22881', city: 'Kallagam', orders: 2, spent: 2297, lastOrderAt: '2026-10-29T18:05:00+05:30' },
  { id: 'c3', name: 'Anitha P.', phone: '+91 97864 44120', email: 'anitha.p@example.com', city: 'Thanjavur', orders: 4, spent: 8120, lastOrderAt: '2026-10-27T09:40:00+05:30' },
  { id: 'c4', name: 'Divya L.', phone: '+91 96262 77301', city: 'Madurai', orders: 1, spent: 8499, lastOrderAt: '2026-10-24T16:12:00+05:30' },
  { id: 'c5', name: 'Priya N.', phone: '+91 98940 55612', email: 'priya.n@example.com', city: 'Chennai', orders: 5, spent: 11440, lastOrderAt: '2026-10-20T14:00:00+05:30' },
  { id: 'c6', name: 'Lakshmi V.', phone: '+91 94432 88019', city: 'Trichy', orders: 2, spent: 4299, lastOrderAt: '2026-10-16T10:22:00+05:30' },
  { id: 'c7', name: 'Revathi M.', phone: '+91 90925 33140', city: 'Karur', orders: 3, spent: 2897, lastOrderAt: '2026-10-10T19:48:00+05:30' },
  { id: 'c8', name: 'Sowmiya K.', phone: '+91 97150 22990', email: 'sowmiya.k@example.com', city: 'Srirangam', orders: 2, spent: 15889, lastOrderAt: '2026-09-28T12:15:00+05:30' },
]

export const couponsSeed: AdminCoupon[] = [
  { id: 'cp1', code: 'DIVYA10', type: 'percent', value: 10, active: true, used: 18, note: '10% off first-order style offers', appliesOnShop: true },
  { id: 'cp2', code: 'FESTIVE15', type: 'percent', value: 15, active: true, used: 7, note: 'Festive checkout code already wired on the shop', appliesOnShop: true },
  { id: 'cp3', code: 'FIRST500', type: 'flat', value: 500, active: false, used: 0, note: 'Admin mock only — shop checkout does not apply this yet', appliesOnShop: false },
]

export const monthlySales: MonthPoint[] = [
  { month: 'Dec', revenue: 42000, orders: 11 },
  { month: 'Jan', revenue: 38500, orders: 9 },
  { month: 'Feb', revenue: 51200, orders: 14 },
  { month: 'Mar', revenue: 47800, orders: 12 },
  { month: 'Apr', revenue: 39200, orders: 10 },
  { month: 'May', revenue: 44100, orders: 11 },
  { month: 'Jun', revenue: 56800, orders: 16 },
  { month: 'Jul', revenue: 62300, orders: 18 },
  { month: 'Aug', revenue: 58900, orders: 15 },
  { month: 'Sep', revenue: 71400, orders: 21 },
  { month: 'Oct', revenue: 86200, orders: 24 },
  { month: 'Nov', revenue: 31800, orders: 8 },
]

export function topSellersFrom(orders: AdminOrder[]): TopSeller[] {
  const map = new Map<string, TopSeller>()
  for (const order of orders) {
    if (order.status === 'cancelled') continue
    for (const item of order.items) {
      const cur = map.get(item.productId) ?? { productId: item.productId, name: item.name, units: 0, revenue: 0 }
      cur.units += item.qty
      cur.revenue += item.price * item.qty
      map.set(item.productId, cur)
    }
  }
  return [...map.values()].sort((a, b) => b.units - a.units).slice(0, 5)
}

export function categoryCounts(): { id: CategoryId; label: string; count: number }[] {
  return CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    count: PRODUCTS.filter((p) => p.category === c.id).length,
  }))
}

export function collectionCounts() {
  return COLLECTIONS.map((c) => ({
    id: c.id,
    label: c.label,
    count: PRODUCTS.filter((p) => p.collections.includes(c.id)).length,
  }))
}

export function salesByCategory(orders: AdminOrder[]) {
  const map = new Map<string, number>()
  for (const order of orders) {
    if (order.status === 'cancelled') continue
    for (const item of order.items) {
      const product = PRODUCTS.find((p) => p.id === item.productId)
      const key = product?.category ?? 'other'
      map.set(key, (map.get(key) ?? 0) + item.price * item.qty)
    }
  }
  return CATEGORIES.map((c) => ({ name: c.label, revenue: map.get(c.id) ?? 0 }))
}

export const STORE_PROFILE = {
  name: 'Divya Boutique',
  address: 'Kallagam, Trichy District, Tamil Nadu, India – 621 653',
  phone: '+91 96885 63463',
  email: 'divyasellam2003@gmail.com',
  hours: 'Monday to Sunday, 10:00 am – 10:30 pm',
  whatsapp: '919688563463',
}
