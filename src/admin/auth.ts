const SESSION_KEY = 'divya-admin-session'
const HASH_KEY = 'divya-admin-password-hash'
const DEFAULT_PASSWORD = 'DivyaAdmin'
const TTL_MS = 8 * 60 * 60 * 1000

export interface AdminSession {
  role: 'owner'
  exp: number
}

export async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function expectedHash(): Promise<string> {
  const stored = localStorage.getItem(HASH_KEY)
  if (stored) return stored
  return sha256(DEFAULT_PASSWORD)
}

export function readSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as AdminSession
    if (!session.exp || session.exp < Date.now() || session.role !== 'owner') {
      sessionStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function assertAdmin(): AdminSession {
  const session = readSession()
  if (!session) throw new Error('Unauthorized')
  return session
}

export function isAdminAuthed(): boolean {
  return Boolean(readSession())
}

export async function loginAdmin(password: string): Promise<boolean> {
  const got = await sha256(password)
  const expected = await expectedHash()
  if (got !== expected) return false
  const session: AdminSession = { role: 'owner', exp: Date.now() + TTL_MS }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return true
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY)
}

export async function setAdminPassword(next: string) {
  assertAdmin()
  localStorage.setItem(HASH_KEY, await sha256(next))
}
