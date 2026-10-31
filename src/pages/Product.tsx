import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { getProduct, relatedProducts, categoryLabel } from '../data/catalog'
import { useStore } from '../context/Store'
import { asset, inr } from '../lib/asset'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  const { addToCart, toggleWish, isWished } = useStore()
  const navigate = useNavigate()
  const [img, setImg] = useState(0)
  const [size, setSize] = useState(product?.sizes[0] ?? '')
  const [color, setColor] = useState(product?.colors[0] ?? '')
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="empty">
        <h1>Piece not found</h1>
        <Link to="/shop" className="btn btn-rose" style={{ marginTop: 16 }}>
          Back to shop
        </Link>
      </div>
    )
  }

  const wished = isWished(product.id)
  const related = relatedProducts(product)

  function add(goCart = false) {
    addToCart({ productId: product!.id, size, color, qty })
    if (goCart) navigate('/cart')
  }

  return (
    <div className="wrap">
      <p className="crumbs">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{' '}
        <Link to={`/shop/${product.category}`}>{categoryLabel(product.category)}</Link> / {product.name}
      </p>
      <div className="pdp">
        <div className="pdp-gallery">
          <img src={asset(product.images[img] ?? product.images[0])} alt={product.name} />
          {product.images.length > 1 ? (
            <div className="pdp-thumbs">
              {product.images.map((src, i) => (
                <button key={src} type="button" className={i === img ? 'on' : ''} onClick={() => setImg(i)}>
                  <img src={asset(src)} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <div className="cat">{categoryLabel(product.category)}</div>
          <h1>{product.name}</h1>
          <p className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
            ))}{' '}
            {product.rating} · {product.reviews} reviews
          </p>
          <p className="price" style={{ fontSize: 22, margin: '12px 0' }}>
            {inr(product.price)}
            {product.compareAt ? <span className="compare">{inr(product.compareAt)}</span> : null}
          </p>
          <p className="lead">{product.description}</p>
          {product.details?.length ? (
            <ul className="pdp-details">
              {product.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          <div>
            Colour
            <div className="swatches">
              {product.colors.map((c) => (
                <button key={c} type="button" className={`chip${c === color ? ' on' : ''}`} onClick={() => setColor(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            Size
            <div className="sizes">
              {product.sizes.map((s) => (
                <button key={s} type="button" className={`chip${s === size ? ' on' : ''}`} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="qty" style={{ marginBottom: 16 }}>
            <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease">
              −
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((n) => n + 1)} aria-label="Increase">
              +
            </button>
          </div>
          <div className="pdp-actions">
            <button type="button" className="btn btn-rose" onClick={() => add(false)}>
              Add to bag
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => add(true)}>
              Buy now
            </button>
            <button
              type="button"
              className={`icon-btn${wished ? ' on' : ''}`}
              onClick={() => toggleWish(product.id)}
              aria-label="Wishlist"
            >
              <Heart size={20} fill={wished ? 'currentColor' : 'none'} color={wished ? '#c45b74' : 'currentColor'} />
            </button>
          </div>
          <p className="meta-line">Fabric: {product.fabric}</p>
          <p className="meta-line">Care: {product.care}</p>
          <p className="meta-line">Ships in 2–4 days · Free shipping over ₹999 · 7-day easy returns</p>
        </div>
      </div>
      {related.length > 0 ? (
        <>
          <div className="section-head">
            <h2>You may also like</h2>
          </div>
          <div className="grid-4" style={{ paddingBottom: 48 }}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
