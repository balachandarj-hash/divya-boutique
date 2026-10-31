import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ImagePlus, X } from 'lucide-react'
import { findSimilarProducts } from '../lib/imageSearch'
import type { Product } from '../data/catalog'
import ProductCard from './ProductCard'

export default function ImageSearch() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()
  const [preview, setPreview] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [hits, setHits] = useState<Product[] | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
    setHits(null)
    setError('')
    setBusy(false)
  }, [pathname])

  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const file = [...(e.clipboardData?.files ?? [])].find((f) => f.type.startsWith('image/'))
      if (file) {
        e.preventDefault()
        void run(file)
      }
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [])

  async function run(file: File) {
    setError('')
    setBusy(true)
    setHits(null)
    setOpen(true)
    const url = URL.createObjectURL(file)
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
    try {
      const list = await findSimilarProducts(file)
      setHits(list)
    } catch {
      setError('Could not read that photo. Try another one.')
    } finally {
      setBusy(false)
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = [...e.dataTransfer.files].find((f) => f.type.startsWith('image/'))
    if (file) void run(file)
  }

  function closeResults() {
    setOpen(false)
    setHits(null)
    setError('')
    setBusy(false)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  return (
    <>
      <aside className="img-search" aria-label="Search by image">
        <p className="img-search-label">Search by Image</p>
        <button
          type="button"
          className="img-search-frame"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <span className="qr-corner tl" />
          <span className="qr-corner tr" />
          <span className="qr-corner bl" />
          <span className="qr-corner br" />
          {preview ? (
            <img src={preview} alt="Uploaded look" />
          ) : (
            <span className="img-search-empty">
              <ImagePlus size={22} />
              <small>Paste or drop a photo</small>
            </span>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void run(file)
            e.target.value = ''
          }}
        />
      </aside>

      {open ? (
        <div className="img-search-overlay" role="dialog" aria-label="Similar pieces">
          <button type="button" className="img-search-backdrop" aria-label="Close search" onClick={closeResults} />
          <div className="img-search-panel">
            <div className="img-search-panel-head">
              <div className="img-search-panel-look">
                {preview ? <img src={preview} alt="" /> : null}
                <div>
                  <h2>Looks like this</h2>
                  <p>{busy ? 'Reading your photo…' : 'Pieces close to the photo you shared.'}</p>
                </div>
              </div>
              <button type="button" className="icon-btn" onClick={closeResults} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            {error ? <p className="meta-line">{error}</p> : null}
            {busy ? <p className="meta-line">Matching colours and fabric from your photo…</p> : null}
            {hits && hits.length > 0 ? (
              <div className="grid-4">
                {hits.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : null}
            {hits && hits.length === 0 && !busy ? (
              <p className="meta-line">No close matches. Try another photo or browse the shop.</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
