import { STORE_PROFILE } from '../data/mock'
import { useAdmin } from '../AdminState'

export default function Settings() {
  const { notify } = useAdmin()

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
        <p className="mt-4 text-xs text-muted">Read-only. These match the live shop. Nothing is saved to a server.</p>
      </section>
      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="mb-4 text-lg">Dashboard preferences</h2>
        <label className="mb-3 flex items-center justify-between gap-3 text-sm">
          Low-stock alerts
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-rose" />
        </label>
        <label className="mb-6 flex items-center justify-between gap-3 text-sm">
          Compact tables
          <input type="checkbox" className="h-4 w-4 accent-rose" />
        </label>
        <button
          type="button"
          className="rounded-xl bg-ink px-4 py-2 text-sm text-white"
          onClick={() => notify('Preferences stay on this device only')}
        >
          Save preferences
        </button>
      </section>
    </div>
  )
}
