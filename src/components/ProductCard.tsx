import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/catalog'
import { useStore } from '../context/Store'
import { asset, inr } from '../lib/asset'

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWish, isWished } = useStore()
  const wished = isWished(product.id)

  return (
    <article className="pcard">
      <div className="pcard-media">
        <Link to={`/product/${product.slug}`}>
          <img src={asset(product.images[0])} alt={product.name} />
        </Link>
        <button
          type="button"
          className={`wish${wished ? ' on' : ''}`}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWish(product.id)}
        >
          <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>
      <Link to={`/product/${product.slug}`}>
        <h3>{product.name}</h3>
      </Link>
      <p className="price">
        {inr(product.price)}
        {product.compareAt ? <span className="compare">{inr(product.compareAt)}</span> : null}
      </p>
    </article>
  )
}
