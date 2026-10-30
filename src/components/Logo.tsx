import { Link } from 'react-router-dom'
import { asset } from '../lib/asset'

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Divya Boutique home">
      <img className="logo-mark" src={asset('images/logo.jpg')} alt="" />
      <span>
        <span className="logo-name">Divya</span>
        <span className="logo-sub">BOUTIQUE</span>
      </span>
    </Link>
  )
}
