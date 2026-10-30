import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Divya Boutique home">
      <svg className="logo-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M24 6c2.4 8 8.4 14 16.4 16.4C32.4 24.8 26.4 30.8 24 38.8 21.6 30.8 15.6 24.8 7.6 22.4 15.6 20 21.6 14 24 6Z"
          fill="#C45B74"
        />
        <circle cx="24" cy="22.5" r="3.4" fill="#F6E8DC" />
        <path
          d="M24 32c1.4 4.6 4.8 8.2 9.4 9.6C28.8 42.8 25.4 46.4 24 51c-1.4-4.6-4.8-8.2-9.4-9.4C19.2 40.2 22.6 36.6 24 32Z"
          fill="#C45B74"
          opacity="0.85"
        />
      </svg>
      <span>
        <span className="logo-name">Divya</span>
        <span className="logo-sub">BOUTIQUE</span>
      </span>
    </Link>
  )
}
