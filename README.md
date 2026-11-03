# Divya Boutique

A production-style boutique shop for Indian ethnic and western women’s and kids wear. Prices in INR.

**Live:** https://balachandarj-hash.github.io/divya-boutique/

## Stack

- Vite + React 19 + TypeScript
- React Router
- Client-side cart, wishlist and checkout (no live payments)
- GitHub Pages via GitHub Actions

## Local

```bash
npm install
npm run dev
```

Production build (GitHub Pages base path):

```bash
GITHUB_PAGES=true npm run build
npm run preview
```

## Pages

Home, Shop (with category and price filters), Product, Cart, Checkout, Collections, About, Contact, Wishlist, Account.

Admin dashboard (separate layout): open `/admin`. Staff password is `DivyaAdmin` until changed in Settings. There is no Admin link in the shop header.

GitHub Pages has no Node server, so the shop and admin share one browser store:

- Session bag: `divya-cart` (unchanged)
- Cart registry: `divya-shop-carts` (active / abandoned / converted)
- Orders: `divya-orders` (checkout writes here; admin Orders and Dashboard read it)
- Admin session: `sessionStorage` key `divya-admin-session` (owner role, 8 hours)

Guests are stored as “Guest shopper” until they sign in on Account. Abandoned carts use the hours window in Settings (default 24). Placing an order marks that cart converted.
