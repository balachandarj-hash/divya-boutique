import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { useAdmin } from './AdminState'

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { toast } = useAdmin()

  return (
    <div id="admin-root" className="flex min-h-screen bg-cream">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="flex-1 px-4 py-6 lg:px-7">
          <Outlet />
        </main>
      </div>
      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-ink px-4 py-3 text-sm text-white shadow-lg">{toast}</div>
      ) : null}
    </div>
  )
}
