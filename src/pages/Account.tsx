import { FormEvent } from 'react'
import { useStore } from '../context/Store'

export default function Account() {
  const { user, signIn, signOut } = useStore()

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    signIn({
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
    })
  }

  return (
    <div className="wrap" style={{ maxWidth: 520, padding: '36px 0 72px' }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>{user ? `Hello, ${user.name.split(' ')[0]}` : 'Account'}</h1>
      {user ? (
        <div className="card">
          <p>{user.email}</p>
          <p className="meta-line">Saved on this device only — a demo account, not a live login.</p>
          <button type="button" className="btn btn-ghost" style={{ marginTop: 16 }} onClick={signOut}>
            Sign out
          </button>
        </div>
      ) : (
        <form className="card" onSubmit={onSubmit}>
          <p className="meta-line" style={{ marginBottom: 12 }}>
            Sign in to keep your name on checkout. Nothing is sent to a server.
          </p>
          <div className="field">
            <label htmlFor="aname">Name</label>
            <input id="aname" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="aemail">Email</label>
            <input id="aemail" name="email" type="email" required />
          </div>
          <button type="submit" className="btn btn-rose">
            Sign in
          </button>
        </form>
      )}
    </div>
  )
}
