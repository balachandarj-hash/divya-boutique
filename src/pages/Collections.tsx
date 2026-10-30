import { Link, useParams } from 'react-router-dom'
import { COLLECTIONS, productsByCollection, type CollectionId } from '../data/catalog'
import ProductCard from '../components/ProductCard'
import { asset } from '../lib/asset'

export default function Collections() {
  const { slug } = useParams()
  const current = COLLECTIONS.find((c) => c.id === slug)

  if (slug && !current) {
    return (
      <div className="empty">
        <h1>Collection not found</h1>
        <Link to="/collections" className="btn btn-rose" style={{ marginTop: 16 }}>
          All collections
        </Link>
      </div>
    )
  }

  if (current) {
    const items = productsByCollection(current.id as CollectionId)
    return (
      <>
        <div className="page-hero">
          <div className="wrap">
            <h1>{current.label}</h1>
            <p>{current.blurb}</p>
          </div>
        </div>
        <div className="wrap" style={{ padding: '24px 0 56px' }}>
          <p className="crumbs">
            <Link to="/">Home</Link> / <Link to="/collections">Collections</Link> / {current.label}
          </p>
          <div className="grid-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>Collections</h1>
          <p>Edits for weddings, festivals, summer days and little stars.</p>
        </div>
      </div>
      <div className="wrap" style={{ padding: '24px 0 56px' }}>
        <div className="grid-3">
          {COLLECTIONS.map((c) => (
            <Link key={c.id} to={`/collections/${c.id}`} className="collection-card">
              <img src={asset(c.image)} alt="" />
              <div className="copy">
                <h3>{c.label}</h3>
                <p>{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
