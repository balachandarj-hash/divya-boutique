export function asset(path: string): string {
  const clean = path.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${clean}`
}

export function inr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
