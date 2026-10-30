import { useMemo, useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import Logo from './Logo'
import { CATEGORIES, COLLECTIONS, searchProducts } from '../data/catalog'
import { useStore } from '../context/Store'
import { asset } from '../lib/asset'

export default function Header() {
  const { cartCount, wishlist, user } = useStore()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()
  const hits = useMemo(() => (q.trim().length > 1 ? searchProducts(q).slice(0, 6) : []), [q])

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    const query = q.trim()
    if (!query) return
    setSearchOpen(false)
    setOpen(false)
    navigate(`/shop?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="header">
      <div className="wrap header-inner">
        <Logo />
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <div className="nav-drop">
            <span>
              Shop <ChevronDown size={14} />
            </span>
            <div className="menu">
              <Link to="/shop">All products</Link>
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/shop/${c.id}`}>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/shop?new=1">New Arrivals</NavLink>
          <div className="nav-drop">
            <span>
              Collections <ChevronDown size={14} />
            </span>
            <div className="menu">
              <Link to="/collections">All collections</Link>
              {COLLECTIONS.map((c) => (
                <Link key={c.id} to={`/collections/${c.id}`}>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="header-tools">
          <form className="search" onSubmit={submitSearch} role="search">
            <Search size={16} color="#8a7872" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search for dresses, sarees, kurtis..."
              aria-label="Search the boutique"
            />
          </form>
          {searchOpen && hits.length > 0 ? (
            <div className="search-panel" onMouseLeave={() => setSearchOpen(false)}>
              {hits.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  onClick={() => {
                    setSearchOpen(false)
                    setQ('')
                  }}
                >
                  <img src={asset(p.images[0])} alt="" />
                  <span>{p.name}</span>
                </Link>
              ))}
            </div>
          ) : null}
          <Link to="/account" className="icon-btn" aria-label={user ? 'Account' : 'Sign in'}>
            <User size={20} />
          </Link>
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 ? <span className="badge">{wishlist.length}</span> : null}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label="Shopping bag">
            <ShoppingBag size={20} />
            {cartCount > 0 ? <span className="badge">{cartCount}</span> : null}
          </Link>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="mobile-nav" aria-label="Mobile">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/shop" onClick={() => setOpen(false)}>
            Shop
          </Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/shop/${c.id}`} onClick={() => setOpen(false)}>
              {c.label}
            </Link>
          ))}
          <Link to="/shop?new=1" onClick={() => setOpen(false)}>
            New Arrivals
          </Link>
          <Link to="/collections" onClick={() => setOpen(false)}>
            Collections
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <form onSubmit={submitSearch} style={{ marginTop: 8 }}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #eadfd6' }}
            />
          </form>
        </nav>
      ) : null}
    </header>
  )
}
