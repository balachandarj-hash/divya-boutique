import { asset } from '../lib/asset'

export default function About() {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>About Anisha Boutique</h1>
          <p>A Chennai house of ethnic and western wear for women and kids.</p>
        </div>
      </div>
      <div className="wrap about-grid">
        <div>
          <img src={asset('images/about-store.jpg')} alt="Anisha Boutique store" style={{ borderRadius: 18 }} />
          <img
            src={asset('images/atelier.jpg')}
            alt="Racks in the atelier"
            style={{ borderRadius: 18, marginTop: 18 }}
          />
        </div>
        <div>
          <h2>The house</h2>
          <p style={{ margin: '14px 0', color: 'var(--muted)' }}>
            Anisha Boutique began as a trunk of silks passed between sisters. Today we design and
            curate sarees, kurtis, western dresses and kids ethnic wear from T. Nagar, Chennai —
            small batches, honest fabrics, prices in rupees you can plan around.
          </p>
          <p style={{ margin: '14px 0', color: 'var(--muted)' }}>
            We work with weavers and stitch studios across Tamil Nadu and Uttar Pradesh. Pieces are
            photographed on real drapes, not stock mannequins, and packed to travel anywhere in
            India.
          </p>
          <h2 style={{ marginTop: 28 }}>What we stand for</h2>
          <p style={{ margin: '14px 0', color: 'var(--muted)' }}>
            Easy seven-day returns. Free shipping over ₹999. Secure checkout. And a team that still
            answers the phone when a blouse needs a second look.
          </p>
        </div>
      </div>
    </>
  )
}
