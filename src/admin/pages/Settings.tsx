import { FormEvent, useState } from 'react'
import { STORE_PROFILE } from '../data/mock'
import { useAdmin } from '../AdminState'
import { setAdminPassword } from '../auth'

export default function Settings() {
  const { notify, settings, setAbandonedHours } = useAdmin()
  const [hours, setHours] = useState(String(settings.abandonedAfterHours))

  async function onPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = String(new FormData(e.currentTarget).get('password') || '')
    if (next.length < 6) {
      notify('Use at least 6 characters')
      return
    }
    await setAdminPassword(next)
    e.currentTarget.reset()
    notify('Staff password updated on this device')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="mb-4 text-lg">Store profile</h2>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Name</dt>
            <dd>{STORE_PROFILE.name}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Address</dt>
            <dd>{STORE_PROFILE.address}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Phone / WhatsApp</dt>
            <dd>{STORE_PROFILE.phone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Email</dt>
            <dd>{STORE_PROFILE.email}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted">Hours</dt>
            <dd>{STORE_PROFILE.hours}</dd>
          </div>
        </dl>
      </section>
      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="mb-4 text-lg">Abandoned carts</h2>
        <label className="block text-sm">
          Mark a bag abandoned after (hours)
          <input
            type="number"
            min={1}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line px-3 py-2"
          />
        </label>
        <button
          type="button"
          className="mt-3 rounded-xl bg-ink px-4 py-2 text-sm text-white"
          onClick={() => setAbandonedHours(Number(hours) || 24)}
        >
          Save window
        </button>
        <form onSubmit={onPassword} className="mt-8 border-t border-line pt-6">
          <h2 className="mb-3 text-lg">Staff password</h2>
          <input name="password" type="password" required minLength={6} placeholder="New password" className="w-full rounded-xl border border-line px-3 py-2 text-sm" />
          <button type="submit" className="mt-3 rounded-xl border border-line px-4 py-2 text-sm">
            Update password
          </button>
        </form>
      </section>
    </div>
  )
}
