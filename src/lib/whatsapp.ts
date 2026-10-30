export const STORE_WHATSAPP = '919688563463'

export function openStoreWhatsApp(text: string) {
  window.open(
    `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(text)}`,
    '_blank',
    'noopener,noreferrer',
  )
}
