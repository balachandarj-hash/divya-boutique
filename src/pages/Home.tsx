import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/catalog'
import ProductCard from '../components/ProductCard'
import Floral from '../components/Floral'
import { asset } from '../lib/asset'

const SLIDES = [
  {
    eyebrow: 'New Collection',
    title: 'Trendy Styles for Every You',
    text: 'Explore our latest collection of ethnic & western wear designed for your every mood.',
    image: 'images/hero.jpg',
    to: '/shop',
  },
  {
    eyebrow: 'Wedding Trousseau',
    title: 'Silks Made for Celebration',
    text: 'Kanjeevaram, Banarasi and tissue drapes for the days you will remember.',
    image: 'images/hero-saree.jpg',
    to: '/collections/wedding',
  },
  {
    eyebrow: 'Everyday Edit',
    title: 'Kurtis That Keep Up',
    text: 'Breathable cottons and festive sets for work, weekends and family functions.',
    image: 'images/hero-kurti.jpg',
    to: '/shop/kurtis',
  },
]

const USPS = [
  { icon: Truck, title: 'Free Shipping', text: 'On orders above ₹999' },
  { icon: RotateCcw, title: 'Easy Returns', text: '7 days hassle free' },
  { icon: ShieldCheck, title: 'Secure Payments', text: '100% secure checkout' },
  { icon: Headphones, title: 'Customer Support', text: "We're here to help" },
]

export default function Home() {
  const [i, setI] = useState(0)
  const slide = SLIDES[i]
  const arrivals = [
    'ab-saree-purple-gold',
    'ab-half-saree-pink',
    'ab-half-saree-black',
    'ab-kurta-emerald',
    'ab-kurta-blush',
  ]
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p))

  return (
    <>
      <section className="wrap hero" aria-label="Featured collection">
        <Floral />
        <div className="hero-copy">
          <div className="eyebrow">{slide.eyebrow}</div>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <div>
            <Link to={slide.to} className="btn btn-rose">
              Shop now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-photo">
          <img src={asset(slide.image)} alt="" />
        </div>
        <button
          type="button"
          className="hero-nav prev"
          aria-label="Previous slide"
          onClick={() => setI((n) => (n === 0 ? SLIDES.length - 1 : n - 1))}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="hero-nav next"
          aria-label="Next slide"
          onClick={() => setI((n) => (n + 1) % SLIDES.length)}
        >
          <ChevronRight size={18} />
        </button>
      </section>

      <section className="wrap usps">
        {USPS.map((u) => (
          <div key={u.title} className="usp">
            <u.icon size={26} strokeWidth={1.6} />
            <div>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="wrap cats">
        {CATEGORIES.map((c) => (
          <Link key={c.id} to={`/shop/${c.id}`} className="cat-card">
            <img src={asset(c.image)} alt="" />
            <div className="copy">
              <h3>{c.label}</h3>
              <p>{c.tagline}</p>
              <span className="shop-now">
                Shop now <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>New Arrivals</h2>
          <Link to="/shop?new=1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid-5">
          {arrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}
