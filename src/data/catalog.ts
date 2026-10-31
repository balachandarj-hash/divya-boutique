export type CategoryId = 'sarees' | 'kurtis' | 'western' | 'kids'

export type CollectionId =
  | 'festive'
  | 'wedding'
  | 'summer'
  | 'little-stars'
  | 'work-weekend'

export interface Product {
  id: string
  slug: string
  name: string
  category: CategoryId
  price: number
  compareAt?: number
  colors: string[]
  sizes: string[]
  fabric: string
  care: string
  description: string
  details?: string[]
  images: string[]
  tags: string[]
  isNew?: boolean
  collections: CollectionId[]
  rating: number
  reviews: number
}

export const CATEGORIES: {
  id: CategoryId
  label: string
  tagline: string
  image: string
}[] = [
  {
    id: 'sarees',
    label: 'Sarees',
    tagline: 'Traditional Elegance',
    image: 'images/cat-saree.jpg',
  },
  {
    id: 'kurtis',
    label: 'Kurtis',
    tagline: 'Everyday Comfort',
    image: 'images/cat-kurti.jpg',
  },
  {
    id: 'western',
    label: 'Western Wear',
    tagline: 'Trendy & Chic',
    image: 'images/cat-western.jpg',
  },
  {
    id: 'kids',
    label: 'Kids Wear',
    tagline: 'Little Styles. Big Smiles',
    image: 'images/cat-kids.jpg',
  },
]

export const COLLECTIONS: {
  id: CollectionId
  label: string
  blurb: string
  image: string
}[] = [
  {
    id: 'festive',
    label: 'Festive Edit',
    blurb: 'Zari, jewel tones and occasion-ready sets for Diwali and family celebrations.',
    image: 'images/p-yellow-kurta.jpg',
  },
  {
    id: 'wedding',
    label: 'Wedding Trousseau',
    blurb: 'Kanjeevaram silks, banarasi weaves and heirloom-inspired drapes.',
    image: 'images/cat-saree.jpg',
  },
  {
    id: 'summer',
    label: 'Summer Linen',
    blurb: 'Breathable cottons, florals and light layers for warm Indian afternoons.',
    image: 'images/kurti-floral-green.jpg',
  },
  {
    id: 'little-stars',
    label: 'Little Stars',
    blurb: 'Ethnic lehengas, kurta pajamas and play-ready western looks for kids.',
    image: 'images/cat-kids.jpg',
  },
  {
    id: 'work-weekend',
    label: 'Work & Weekend',
    blurb: 'Polished western dresses and co-ords that travel from desk to dinner.',
    image: 'images/cat-western.jpg',
  },
]

const ADULT = ['XS', 'S', 'M', 'L', 'XL']
const SAREE = ['Free Size']
const KIDS = ['2–3Y', '4–5Y', '6–7Y', '8–9Y', '10–12Y']

export const PRODUCTS: Product[] = [
  {
    id: 'ab-saree-purple-gold',
    slug: 'purple-gold-embroidered-sequinned-saree',
    name: 'Purple Gold Embroidered Sequinned Saree',
    category: 'sarees',
    price: 800,
    colors: ['Purple', 'Gold'],
    sizes: SAREE,
    fabric: 'Embroidered fabric with sequinned border',
    care: 'Dry clean recommended. Keep sequins and embroidery away from snags.',
    description:
      'A purple and gold toned saree with an embroidered border and embellished sequinned detail. Comes with an unstitched blouse piece — ready to stitch to fit.',
    details: [
      'Purple & gold toned saree',
      'Embroidered saree with border',
      'Has embellished sequinned detail',
      'The saree comes with an unstitched blouse piece',
    ],
    images: ['images/p-purple-gold-saree.jpg'],
    tags: ['embroidered', 'sequin', 'border', 'blouse-piece', 'party'],
    isNew: true,
    collections: ['festive', 'wedding'],
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 'ab-saree-kanjee',
    slug: 'kanjeevaram-magenta-gold-saree',
    name: 'Kanjeevaram Magenta Gold Saree',
    category: 'sarees',
    price: 12990,
    compareAt: 15490,
    colors: ['Magenta', 'Gold'],
    sizes: SAREE,
    fabric: 'Pure Kanjeevaram silk with zari border',
    care: 'Dry clean only. Store in muslin.',
    description:
      'A temple-border Kanjeevaram in vivid magenta and molten gold. Drape it for weddings, receptions and the moments that deserve an heirloom.',
    images: ['images/saree-kanjee.jpg', 'images/cat-saree.jpg'],
    tags: ['silk', 'bridal', 'zari'],
    collections: ['wedding', 'festive'],
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 'ab-saree-purple',
    slug: 'banarasi-purple-silk-saree',
    name: 'Banarasi Purple Silk Saree',
    category: 'sarees',
    price: 8499,
    compareAt: 9990,
    colors: ['Purple', 'Gold'],
    sizes: SAREE,
    fabric: 'Handwoven Banarasi silk',
    care: 'Dry clean only.',
    description:
      'Deep purple silk with a dense gold pallu and velvet-contrast blouse energy. A festive classic that photographs beautifully.',
    images: ['images/saree-purple.jpg', 'images/saree-2.jpg'],
    tags: ['banarasi', 'festive'],
    collections: ['festive', 'wedding'],
    rating: 4.8,
    reviews: 96,
  },
  {
    id: 'ab-saree-wine',
    slug: 'wine-georgette-zari-saree',
    name: 'Wine Georgette Zari Saree',
    category: 'sarees',
    price: 4299,
    colors: ['Wine', 'Gold'],
    sizes: SAREE,
    fabric: 'Georgette with zari border',
    care: 'Gentle hand wash or dry clean.',
    description:
      'A fluid wine georgette with a glowing gold border — easy to pleat, easy to wear from pooja to cocktail hour.',
    images: ['images/p-wine-saree.jpg'],
    tags: ['georgette', 'party'],
    isNew: true,
    collections: ['festive'],
    rating: 4.7,
    reviews: 64,
  },
  {
    id: 'ab-saree-ivory',
    slug: 'ivory-tissue-silk-saree',
    name: 'Ivory Tissue Silk Saree',
    category: 'sarees',
    price: 6799,
    colors: ['Ivory', 'Gold'],
    sizes: SAREE,
    fabric: 'Tissue silk',
    care: 'Dry clean only.',
    description:
      'Moonlit ivory tissue that catches the light with every step. Pair with gold jewellery for haldi, engagement or a summer wedding.',
    images: ['images/p-ivory-saree.jpg'],
    tags: ['tissue', 'pastel'],
    collections: ['wedding', 'summer'],
    rating: 4.8,
    reviews: 71,
  },
  {
    id: 'ab-saree-emerald',
    slug: 'emerald-silk-gold-border-saree',
    name: 'Emerald Silk Gold Border Saree',
    category: 'sarees',
    price: 9499,
    colors: ['Emerald', 'Gold'],
    sizes: SAREE,
    fabric: 'Silk blend with woven zari',
    care: 'Dry clean only.',
    description:
      'Jewel emerald silk with a broad gold border — the colour of mango leaves after rain. A statement drape for sangeet and reception.',
    images: ['images/saree-green2.jpg'],
    tags: ['silk', 'jewel'],
    collections: ['wedding', 'festive'],
    rating: 4.9,
    reviews: 88,
  },
  {
    id: 'ab-saree-handloom',
    slug: 'handloom-festive-silk-saree',
    name: 'Handloom Festive Silk Saree',
    category: 'sarees',
    price: 5599,
    colors: ['Red', 'Gold', 'Ivory'],
    sizes: SAREE,
    fabric: 'Handloom silk blend',
    care: 'Dry clean recommended.',
    description:
      'A traditional red-and-gold handloom drape for temple visits, family functions and the first day of festivities.',
    images: ['images/saree-stairs2.jpg'],
    tags: ['handloom', 'traditional'],
    collections: ['festive'],
    rating: 4.6,
    reviews: 54,
  },
  {
    id: 'ab-kurta-emerald',
    slug: 'emerald-zari-kurta-set',
    name: 'Emerald Zari Kurta Set',
    category: 'kurtis',
    price: 2899,
    colors: ['Emerald', 'Gold'],
    sizes: ADULT,
    fabric: 'Art silk with zari embroidery',
    care: 'Dry clean or gentle cold wash.',
    description:
      'A jewel-green kurta with gold threadwork at the yoke. Tailored straight, it layers cleanly with palazzos or churidar.',
    images: ['images/p-green-kurta.jpg'],
    tags: ['zari', 'festive'],
    isNew: true,
    collections: ['festive'],
    rating: 4.8,
    reviews: 142,
  },
  {
    id: 'ab-kurta-blush',
    slug: 'blush-floral-cotton-kurta',
    name: 'Blush Floral Cotton Kurta',
    category: 'kurtis',
    price: 2199,
    colors: ['Blush', 'Gold'],
    sizes: ADULT,
    fabric: 'Printed cotton',
    care: 'Machine wash cold, gentle cycle.',
    description:
      'Soft blush florals on breathable cotton — the kurta you reach for on warm afternoons, coffee dates and mehendi mornings.',
    images: ['images/p-pink-kurta.jpg', 'images/hero.jpg'],
    tags: ['floral', 'cotton'],
    isNew: true,
    collections: ['summer'],
    rating: 4.7,
    reviews: 203,
  },
  {
    id: 'ab-kurta-violet',
    slug: 'royal-violet-anarkali',
    name: 'Royal Violet Anarkali',
    category: 'kurtis',
    price: 3299,
    compareAt: 3799,
    colors: ['Violet', 'Gold'],
    sizes: ADULT,
    fabric: 'Georgette with embroidered neckline',
    care: 'Dry clean only.',
    description:
      'A flared violet anarkali with a gilded neckline. Dramatic without being heavy — made for festive evenings.',
    images: ['images/p-purple-kurta.jpg'],
    tags: ['anarkali', 'festive'],
    isNew: true,
    collections: ['festive'],
    rating: 4.8,
    reviews: 117,
  },
  {
    id: 'ab-kurta-black',
    slug: 'midnight-chikankari-kurta',
    name: 'Midnight Chikankari Kurta',
    category: 'kurtis',
    price: 2499,
    colors: ['Black', 'Silver'],
    sizes: ADULT,
    fabric: 'Rayon with chikankari-inspired embroidery',
    care: 'Hand wash cold.',
    description:
      'Inky black with silver-white embroidery down the placket. Evening ease that still feels considered.',
    images: ['images/p-black-kurta.jpg'],
    tags: ['chikankari', 'evening'],
    isNew: true,
    collections: ['work-weekend'],
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 'ab-kurta-blue',
    slug: 'powder-blue-silk-kurta',
    name: 'Powder Blue Silk Kurta',
    category: 'kurtis',
    price: 1999,
    colors: ['Powder Blue'],
    sizes: ADULT,
    fabric: 'Silk blend',
    care: 'Gentle hand wash.',
    description:
      'A calm powder-blue kurta with a clean round neck. Pair with ivory palazzos for office poojas and weekend brunches.',
    images: ['images/p-blue-kurta.jpg'],
    tags: ['silk', 'everyday'],
    isNew: true,
    collections: ['summer', 'work-weekend'],
    rating: 4.5,
    reviews: 76,
  },
  {
    id: 'ab-kurta-mustard',
    slug: 'mustard-festive-kurta',
    name: 'Mustard Festive Kurta',
    category: 'kurtis',
    price: 2299,
    colors: ['Mustard', 'Gold'],
    sizes: ADULT,
    fabric: 'Cotton silk',
    care: 'Dry clean or gentle wash.',
    description:
      'Mustard with a gold border — sunshine for Diwali mornings and dandiya nights. A colour that loves jhumkas.',
    images: ['images/p-yellow-kurta.jpg'],
    tags: ['festive', 'cotton-silk'],
    isNew: true,
    collections: ['festive'],
    rating: 4.7,
    reviews: 131,
  },
  {
    id: 'ab-kurta-mint',
    slug: 'mint-everyday-kurti',
    name: 'Mint Everyday Kurti',
    category: 'kurtis',
    price: 1599,
    colors: ['Mint', 'Ivory'],
    sizes: ADULT,
    fabric: 'Cotton cambric',
    care: 'Machine wash cold.',
    description:
      'A mint printed kurti cut for all-day comfort. Office, market, school run — this is the one that earns its hanger.',
    images: ['images/cat-kurti.jpg', 'images/hero-kurti.jpg'],
    tags: ['cotton', 'everyday'],
    collections: ['summer', 'work-weekend'],
    rating: 4.4,
    reviews: 210,
  },
  {
    id: 'ab-kurta-garden',
    slug: 'garden-floral-kurta-set',
    name: 'Garden Floral Kurta Set',
    category: 'kurtis',
    price: 3499,
    colors: ['Ivory', 'Berry', 'Green'],
    sizes: ADULT,
    fabric: 'Hand-block printed cotton with dupatta',
    care: 'Gentle hand wash. Dry in shade.',
    description:
      'A complete set: floral kurta, matching pants and a light printed dupatta. Block prints that feel like a courtyard in spring.',
    images: ['images/kurti-floral-green.jpg'],
    tags: ['set', 'block-print'],
    collections: ['summer'],
    rating: 4.9,
    reviews: 184,
  },
  {
    id: 'ab-west-rose',
    slug: 'rose-garden-midi-dress',
    name: 'Rose Garden Midi Dress',
    category: 'western',
    price: 2499,
    colors: ['Blush', 'Ivory'],
    sizes: ADULT,
    fabric: 'Printed georgette',
    care: 'Gentle cold wash.',
    description:
      'A blush floral midi with a soft drape and covered neckline. Desk to dinner without changing a thing.',
    images: ['images/cat-western.jpg'],
    tags: ['midi', 'floral'],
    isNew: true,
    collections: ['work-weekend', 'summer'],
    rating: 4.7,
    reviews: 92,
  },
  {
    id: 'ab-west-wrap',
    slug: 'ivory-rose-wrap-dress',
    name: 'Ivory Rose Wrap Dress',
    category: 'western',
    price: 2799,
    colors: ['Ivory', 'Rose'],
    sizes: ADULT,
    fabric: 'Crepé with floral print',
    care: 'Hand wash cold.',
    description:
      'An ivory wrap dotted with garden roses. Tie it to your waist, add kolhapuris or heels.',
    images: ['images/west-2.jpg'],
    tags: ['wrap', 'floral'],
    collections: ['summer', 'work-weekend'],
    rating: 4.6,
    reviews: 67,
  },
  {
    id: 'ab-west-coord',
    slug: 'cream-linen-coord-set',
    name: 'Cream Linen Co-ord Set',
    category: 'western',
    price: 3299,
    colors: ['Cream', 'Sand'],
    sizes: ADULT,
    fabric: 'Linen blend',
    care: 'Machine wash cold, hang dry.',
    description:
      'A relaxed cream co-ord — camp shirt and wide-leg trousers. Tailored enough for Fridays, easy enough for travel.',
    images: ['images/p-cream-coord.jpg'],
    tags: ['coord', 'linen'],
    collections: ['work-weekend', 'summer'],
    rating: 4.8,
    reviews: 58,
  },
  {
    id: 'ab-kids-lehenga',
    slug: 'ivory-gold-girls-lehenga',
    name: 'Ivory Gold Girls Lehenga',
    category: 'kids',
    price: 1899,
    colors: ['Ivory', 'Gold'],
    sizes: KIDS,
    fabric: 'Net and silk blend with embroidery',
    care: 'Dry clean only.',
    description:
      'A keepsake lehenga in ivory and gold for weddings, namakaranams and festive portraits. Soft lining, twirl-ready skirt.',
    images: ['images/cat-kids.jpg'],
    tags: ['lehenga', 'festive'],
    isNew: true,
    collections: ['little-stars', 'festive', 'wedding'],
    rating: 4.9,
    reviews: 73,
  },
  {
    id: 'ab-kids-sharara',
    slug: 'peach-floral-sharara-set',
    name: 'Peach Floral Sharara Set',
    category: 'kids',
    price: 1699,
    colors: ['Peach', 'Gold'],
    sizes: KIDS,
    fabric: 'Georgette with floral embroidery',
    care: 'Gentle hand wash.',
    description:
      'A peach sharara set with scattered florals. Comfortable for long functions and sweet enough for the family album.',
    images: ['images/p-girls-sharara.jpg'],
    tags: ['sharara', 'festive'],
    collections: ['little-stars', 'festive'],
    rating: 4.7,
    reviews: 41,
  },
  {
    id: 'ab-kids-kurta',
    slug: 'ivory-boys-kurta-pajama',
    name: 'Ivory Boys Kurta Pajama',
    category: 'kids',
    price: 1299,
    colors: ['Ivory', 'Gold'],
    sizes: KIDS,
    fabric: 'Silk blend with stole',
    care: 'Gentle wash or dry clean.',
    description:
      'Ivory kurta pajama with a slim gold stole. The outfit little groomsmen and pooja mornings were waiting for.',
    images: ['images/p-boys-kurta.jpg'],
    tags: ['kurta', 'boys'],
    collections: ['little-stars', 'festive', 'wedding'],
    rating: 4.8,
    reviews: 52,
  },
  {
    id: 'ab-kids-play',
    slug: 'corduroy-play-dress',
    name: 'Berry Corduroy Play Dress',
    category: 'kids',
    price: 1299,
    colors: ['Berry', 'Beige'],
    sizes: KIDS,
    fabric: 'Soft corduroy cotton',
    care: 'Machine wash cold.',
    description:
      'A berry corduroy dress built for building blocks and birthday parties. Pocketed, lined, and ready to play.',
    images: ['images/kids-4.jpg'],
    tags: ['everyday', 'cotton'],
    collections: ['little-stars', 'work-weekend'],
    rating: 4.5,
    reviews: 38,
  },
  {
    id: 'ab-kids-navy',
    slug: 'navy-anchor-kids-set',
    name: 'Navy Anchor Kids Set',
    category: 'kids',
    price: 1499,
    colors: ['Navy', 'White'],
    sizes: KIDS,
    fabric: 'Cotton jersey',
    care: 'Machine wash cold.',
    description:
      'Navy-and-white weekend sets with a hint of nautical charm. Soft jersey that survives the school run.',
    images: ['images/kids-5.jpg'],
    tags: ['everyday', 'cotton'],
    collections: ['little-stars'],
    rating: 4.4,
    reviews: 29,
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function productsByCategory(category?: CategoryId): Product[] {
  if (!category) return PRODUCTS
  return PRODUCTS.filter((p) => p.category === category)
}

export function productsByCollection(id: CollectionId): Product[] {
  return PRODUCTS.filter((p) => p.collections.includes(id))
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collections.some((c) => product.collections.includes(c))),
  ).slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return PRODUCTS
  return PRODUCTS.filter((p) =>
    [p.name, p.category, p.fabric, p.description, ...(p.details ?? []), ...p.tags, ...p.colors]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
}

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id
}
