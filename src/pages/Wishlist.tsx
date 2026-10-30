import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/catalog'
import { useStore } from '../context/Store'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id))

  return (
    <div className="wrap" style={{ padding: '28px 0 56px' }}>
      <h1 style={{ fontSize: 36 }}>Wishlist</h1>
      {items.length === 0 ? (
        <div className="empty">
          <p>Tap the heart on a piece to save it here.</p>
          <Link to="/shop" className="btn btn-rose" style={{ marginTop: 16 }}>
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="grid-4" style={{ marginTop: 24 }}>
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
