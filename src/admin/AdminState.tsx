import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { couponsSeed, inventorySeed, type AdminCoupon, type AdminInventory } from './data/mock'
import type { AdminSettings, ShopCart, ShopCustomer, ShopOrder, ShopOrderStatus } from '../lib/shopDb'
import {
  adminGetSettings,
  adminListAbandonedCarts,
  adminListActiveCarts,
  adminListCustomers,
  adminListOrders,
  adminSaveSettings,
  adminUpdateOrderStatus,
} from './api'
import { logoutAdmin } from './auth'

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
  orders: ShopOrder[]
  inventory: AdminInventory[]
  coupons: AdminCoupon[]
  carts: { active: ShopCart[]; abandoned: ShopCart[] }
  customers: ShopCustomer[]
  settings: AdminSettings
  toast: string
  setOrderStatus: (id: string, status: ShopOrderStatus) => void
  adjustStock: (productId: string, delta: number) => void
  toggleCoupon: (id: string) => void
  setAbandonedHours: (hours: number) => void
  notify: (message: string) => void
  reloadShop: () => void
}

const AdminContext = createContext<AdminValue | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<ShopOrder[]>(() => adminListOrders())
  const [inventory, setInventory] = useState<AdminInventory[]>(() => readJson(STOCK_KEY, inventorySeed))
  const [coupons, setCoupons] = useState<AdminCoupon[]>(() => readJson(COUPON_KEY, couponsSeed))
  const [settings, setSettingsState] = useState<AdminSettings>(() => adminGetSettings())
  const [carts, setCarts] = useState(() => ({ active: adminListActiveCarts(), abandoned: adminListAbandonedCarts() }))
  const [customers, setCustomers] = useState(() => adminListCustomers())
  const [toast, setToast] = useState('')

  const reloadShop = useCallback(() => {
    try {
      setOrders(adminListOrders())
      setCarts({ active: adminListActiveCarts(), abandoned: adminListAbandonedCarts() })
      setCustomers(adminListCustomers())
      setSettingsState(adminGetSettings())
    } catch {
      logoutAdmin()
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (!e.key || e.key.startsWith('divya-')) reloadShop()
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('divya-shop', reloadShop)
    const t = window.setInterval(reloadShop, 4000)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('divya-shop', reloadShop)
      window.clearInterval(t)
    }
  }, [reloadShop])

  const notify = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }, [])

  const setOrderStatus = useCallback(
    (id: string, status: ShopOrderStatus) => {
      adminUpdateOrderStatus(id, status)
      reloadShop()
      notify('Order status updated')
    },
    [notify, reloadShop],
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

  const setAbandonedHours = useCallback(
    (hours: number) => {
      const next = { abandonedAfterHours: Math.max(1, hours) }
      adminSaveSettings(next)
      setSettingsState(next)
      reloadShop()
      notify('Abandoned-cart window saved')
    },
    [notify, reloadShop],
  )

  const value = useMemo(
    () => ({
      orders,
      inventory,
      coupons,
      carts,
      customers,
      settings,
      toast,
      setOrderStatus,
      adjustStock,
      toggleCoupon,
      setAbandonedHours,
      notify,
      reloadShop,
    }),
    [
      orders,
      inventory,
      coupons,
      carts,
      customers,
      settings,
      toast,
      setOrderStatus,
      adjustStock,
      toggleCoupon,
      setAbandonedHours,
      notify,
      reloadShop,
    ],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
