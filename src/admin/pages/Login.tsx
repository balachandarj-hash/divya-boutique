import { FormEvent, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { asset } from '../../lib/asset'
import { isAdminAuthed, loginAdmin } from '../auth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const from = (location.state as { from?: string } | null)?.from || '/admin'
  if (isAdminAuthed()) return <Navigate to={from === '/admin/login' ? '/admin' : from} replace />

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const password = String(new FormData(e.currentTarget).get('password') || '')
    const ok = await loginAdmin(password)
    if (!ok) {
      setError('Wrong password.')
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div id="admin-root" className="grid min-h-screen place-items-center bg-cream px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-[0_10px_28px_rgba(80,40,30,0.08)]">
        <img src={asset('images/logo.jpg')} alt="" className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-rose" />
        <h1 className="mt-4 text-center text-2xl">Divya Boutique</h1>
        <p className="mb-6 text-center text-xs uppercase tracking-[0.16em] text-muted">Admin</p>
        <label className="block text-sm text-ink2">
          Staff password
          <input
            name="password"
            type="password"
            required
            autoFocus
            className="mt-1 w-full rounded-xl border border-line px-3 py-2 outline-none"
          />
        </label>
        {error ? <p className="mt-2 text-sm text-rose">{error}</p> : null}
        <button type="submit" className="mt-5 w-full rounded-xl bg-ink py-2.5 text-sm text-white hover:bg-ink2">
          Sign in
        </button>
        <p className="mt-4 text-center text-xs text-muted">Staff only. Session stays in this browser tab.</p>
      </form>
    </div>
  )
}
