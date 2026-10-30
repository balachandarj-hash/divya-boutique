import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty">
      <h1>Page not found</h1>
      <p>That path has wandered off the rack.</p>
      <Link to="/" className="btn btn-rose" style={{ marginTop: 16 }}>
        Back home
      </Link>
    </div>
  )
}
