import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Warehouse,
  Users,
  Ticket,
  BarChart3,
  Settings,
  ShoppingCart,
  Timer,
  X,
} from 'lucide-react'
import { asset } from '../../lib/asset'

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: Layers },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/carts', label: 'Active Carts', icon: ShoppingCart },
  { to: '/admin/abandoned-carts', label: 'Abandoned Carts', icon: Timer },
  { to: '/admin/inventory', label: 'Inventory', icon: Warehouse },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-ink/40 lg:hidden ${open ? '' : 'hidden'}`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-ink text-white transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <img src={asset('images/logo.jpg')} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-rose" />
          <div className="min-w-0">
            <p className="font-serif text-lg leading-tight">Divya Boutique</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-rose-soft">Admin</p>
          </div>
          <button type="button" className="ml-auto grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 lg:hidden" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 pb-6">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <p className="px-5 pb-5 text-[11px] text-white/40">Kallagam · shop data on this device</p>
      </aside>
    </>
  )
}
