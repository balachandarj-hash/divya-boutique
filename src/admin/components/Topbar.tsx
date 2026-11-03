import { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, ExternalLink, Menu, Search } from 'lucide-react'

const TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/orders': 'Orders',
  '/admin/inventory': 'Inventory',
  '/admin/customers': 'Customers',
  '/admin/coupons': 'Coupons',
  '/admin/reports': 'Reports',
  '/admin/settings': 'Settings',
}

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const title = TITLES[pathname] ?? 'Admin'

  function onSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = String(new FormData(e.currentTarget).get('q') || '').trim()
    navigate(q ? `/admin/products?q=${encodeURIComponent(q)}` : '/admin/products')
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur lg:px-7">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink2 lg:hidden"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>
      <div className="min-w-0">
        <p className="truncate font-serif text-xl text-ink">{title}</p>
        <p className="hidden text-xs text-muted sm:block">Divya Boutique · store operations</p>
      </div>
      <form onSubmit={onSearch} className="ml-auto hidden min-w-[220px] max-w-sm flex-1 items-center gap-2 rounded-xl border border-line bg-cream px-3 py-2 md:flex">
        <Search size={15} className="text-muted" />
        <input
          name="q"
          placeholder="Search products…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          aria-label="Search products"
        />
      </form>
      <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink2" aria-label="Notifications">
        <Bell size={16} />
      </button>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3 py-2 text-xs font-medium text-white hover:bg-ink2"
      >
        View shop <ExternalLink size={13} />
      </Link>
    </header>
  )
}
