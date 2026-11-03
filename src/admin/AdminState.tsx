import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  couponsSeed,
  customersSeed,
  inventorySeed,
  monthlySales,
  ordersSeed,
  type AdminCoupon,
  type AdminInventory,
  type AdminOrder,
  type OrderStatus,
} from './data/mock'

const ORDERS_KEY = 'divya-admin-orders'
const STOCK_KEY = 'divya-admin-stock'
const COUPON_KEY = 'divya-admin-coupons'

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
}

interface AdminValue {
  orders: AdminOrder[]
  inventory: AdminInventory[]
  coupons: AdminCoupon[]
  toast: string
  setOrderStatus: (id: string, status: OrderStatus) => void
  adjustStock: (productId: string, delta: number) => void
  toggleCoupon: (id: string) => void
  notify: (message: string) => void
}

const AdminContext = createContext<AdminValue | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<AdminOrder[]>(() => readJson(ORDERS_KEY, ordersSeed))
  const [inventory, setInventory] = useState<AdminInventory[]>(() => readJson(STOCK_KEY, inventorySeed))
  const [coupons, setCoupons] = useState<AdminCoupon[]>(() => readJson(COUPON_KEY, couponsSeed))
  const [toast, setToast] = useState('')

  const notify = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }, [])

  const setOrderStatus = useCallback(
    (id: string, status: OrderStatus) => {
      setOrders((prev) => {
        const next = prev.map((o) => (o.id === id ? { ...o, status } : o))
        writeJson(ORDERS_KEY, next)
        return next
      })
      notify('Order status updated on this device only')
    },
    [notify],
  )

  const adjustStock = useCallback(
    (productId: string, delta: number) => {
      setInventory((prev) => {
        const next = prev.map((row) =>
          row.productId === productId ? { ...row, stock: Math.max(0, row.stock + delta) } : row,
        )
        writeJson(STOCK_KEY, next)
        return next
      })
      notify('Stock updated locally — catalog file is unchanged')
    },
    [notify],
  )

  const toggleCoupon = useCallback(
    (id: string) => {
      setCoupons((prev) => {
        const next = prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
        writeJson(COUPON_KEY, next)
        return next
      })
      notify('Coupon toggle saved locally')
    },
    [notify],
  )

  const value = useMemo(
    () => ({ orders, inventory, coupons, toast, setOrderStatus, adjustStock, toggleCoupon, notify }),
    [orders, inventory, coupons, toast, setOrderStatus, adjustStock, toggleCoupon, notify],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

export { monthlySales, customersSeed }
