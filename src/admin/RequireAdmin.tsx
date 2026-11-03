import { Navigate, useLocation } from 'react-router-dom'
import { isAdminAuthed } from './auth'

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}
