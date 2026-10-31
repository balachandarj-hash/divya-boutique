import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  CATEGORIES,
  PRODUCTS,
  categoryLabel,
  type CategoryId,
} from '../data/catalog'
import ProductCard from '../components/ProductCard'

const PRICE_BANDS = [
  { id: 'any', label: 'Any price', test: () => true },
  { id: 'u2', label: 'Under ₹2,000', test: (n: number) => n < 2000 },
  { id: '2t5', label: '₹2,000 – ₹5,000', test: (n: number) => n >= 2000 && n <= 5000 },
  { id: '5t10', label: '₹5,000 – ₹10,000', test: (n: number) => n > 5000 && n <= 10000 },
  { id: '10p', label: 'Above ₹10,000', test: (n: number) => n > 10000 },
]

export default function Shop() {
  const { category } = useParams()
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const onlyNew = params.get('new') === '1'
  const cat = (category as CategoryId | undefined) && CATEGORIES.some((c) => c.id === category)
    ? (category as CategoryId)
    : undefined

  const [price, setPrice] = useState('any')
  const [sort, setSort] = useState('featured')

  const items = useMemo(() => {
    let list = PRODUCTS.slice()
    if (cat) list = list.filter((p) => p.category === cat)
    if (onlyNew) list = list.filter((p) => p.isNew)
    if (q.trim()) {
      const needle = q.toLowerCase()
      list = list.filter((p) =>
        [p.name, p.description, p.category, ...(p.details ?? []), ...p.tags, ...p.colors]
          .join(' ')
          .toLowerCase()
          .includes(needle),
      )
    }
    const band = PRICE_BANDS.find((b) => b.id === price) ?? PRICE_BANDS[0]
    list = list.filter((p) => band.test(p.price))
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'new') list.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    return list
  }, [cat, onlyNew, q, price, sort])

  const heading = onlyNew
    ? 'New Arrivals'
    : q
      ? `Results for “${q}”`
      : cat
        ? categoryLabel(cat)
        : 'Shop All'

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>{heading}</h1>
          <p>Ethnic and western pieces, sized for Indian wardrobes. Prices in INR.</p>
        </div>
      </div>
      <div className="wrap">
        <p className="crumbs">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link>
          {cat ? <> / {categoryLabel(cat)}</> : null}
        </p>
        <div className="shop-layout">
          <aside className="filters">
            <h3>Category</h3>
            <label>
              <input type="radio" name="cat" checked={!cat && !onlyNew} readOnly />
              <Link to="/shop">All</Link>
            </label>
            {CATEGORIES.map((c) => (
              <label key={c.id}>
                <input type="radio" name="cat" checked={cat === c.id} readOnly />
                <Link to={`/shop/${c.id}`}>{c.label}</Link>
              </label>
            ))}
            <h3>Price</h3>
            {PRICE_BANDS.map((b) => (
              <label key={b.id}>
                <input
                  type="radio"
                  name="price"
                  checked={price === b.id}
                  onChange={() => setPrice(b.id)}
                />
                {b.label}
              </label>
            ))}
          </aside>
          <div>
            <div className="toolbar">
              <span>{items.length} styles</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                <option value="featured">Featured</option>
                <option value="new">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
            {items.length === 0 ? (
              <div className="empty">
                <h2>No pieces match</h2>
                <p>Try another filter or browse the full shop.</p>
                <Link to="/shop" className="btn btn-rose" style={{ marginTop: 16 }}>
                  Clear filters
                </Link>
              </div>
            ) : (
              <div className="grid-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
