import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PRODUCTS, type Product } from '../data/catalog'

const CART_KEY = 'anisha-cart'
const WISH_KEY = 'anisha-wish'
const USER_KEY = 'anisha-user'
const ORDERS_KEY = 'anisha-orders'

export interface CartLine {
  productId: string
  size: string
  color: string
  qty: number
}

export interface User {
  name: string
  email: string
}

export interface Order {
  id: string
  createdAt: string
  lines: CartLine[]
  total: number
  name: string
  city: string
  payment: string
}

interface Toast {
  id: number
  message: string
}

interface StoreValue {
  cart: CartLine[]
  wishlist: string[]
  user: User | null
  toasts: Toast[]
  cartCount: number
  cartSubtotal: number
  addToCart: (line: Omit<CartLine, 'qty'> & { qty?: number }) => void
  setQty: (productId: string, size: string, color: string, qty: number) => void
  removeFromCart: (productId: string, size: string, color: string) => void
  clearCart: () => void
  toggleWish: (productId: string) => void
  isWished: (productId: string) => boolean
  signIn: (user: User) => void
  signOut: () => void
  placeOrder: (info: { name: string; city: string; payment: string; total: number }) => Order
  notify: (message: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => readJson(CART_KEY, []))
  const [wishlist, setWishlist] = useState<string[]>(() => readJson(WISH_KEY, []))
  const [user, setUser] = useState<User | null>(() => readJson(USER_KEY, null))
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem(WISH_KEY, JSON.stringify(wishlist)), [wishlist])
  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  }, [user])

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800)
  }, [])

  const addToCart = useCallback(
    (line: Omit<CartLine, 'qty'> & { qty?: number }) => {
      const qty = line.qty ?? 1
      setCart((prev) => {
        const i = prev.findIndex(
          (l) => l.productId === line.productId && l.size === line.size && l.color === line.color,
        )
        if (i === -1) return [...prev, { ...line, qty }]
        return prev.map((l, idx) => (idx === i ? { ...l, qty: l.qty + qty } : l))
      })
      notify('Added to bag')
    },
    [notify],
  )

  const setQty = useCallback((productId: string, size: string, color: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.productId === productId && l.size === size && l.color === color))
        : prev.map((l) =>
            l.productId === productId && l.size === size && l.color === color ? { ...l, qty } : l,
          ),
    )
  }, [])

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setCart((prev) => prev.filter((l) => !(l.productId === productId && l.size === size && l.color === color)))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWish = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const has = prev.includes(productId)
        notify(has ? 'Removed from wishlist' : 'Saved to wishlist')
        return has ? prev.filter((id) => id !== productId) : [...prev, productId]
      })
    },
    [notify],
  )

  const isWished = useCallback((productId: string) => wishlist.includes(productId), [wishlist])

  const signIn = useCallback((next: User) => {
    setUser(next)
    notify(`Welcome, ${next.name.split(' ')[0]}`)
  }, [notify])

  const signOut = useCallback(() => {
    setUser(null)
    notify('Signed out')
  }, [notify])

  const placeOrder = useCallback(
    (info: { name: string; city: string; payment: string; total: number }) => {
      const order: Order = {
        id: `AB${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
        lines: cart,
        total: info.total,
        name: info.name,
        city: info.city,
        payment: info.payment,
      }
      const prev = readJson<Order[]>(ORDERS_KEY, [])
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...prev]))
      setCart([])
      return order
    },
    [cart],
  )

  const cartCount = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart])
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, l) => {
      const p = PRODUCTS.find((x) => x.id === l.productId)
      return sum + (p ? p.price * l.qty : 0)
    }, 0)
  }, [cart])

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      user,
      toasts,
      cartCount,
      cartSubtotal,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWish,
      isWished,
      signIn,
      signOut,
      placeOrder,
      notify,
    }),
    [
      cart,
      wishlist,
      user,
      toasts,
      cartCount,
      cartSubtotal,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWish,
      isWished,
      signIn,
      signOut,
      placeOrder,
      notify,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export function productFor(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
