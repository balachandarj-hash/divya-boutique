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

Admin dashboard (mock data, separate layout): open `/admin` — for example `http://127.0.0.1:5173/admin` or `https://balachandarj-hash.github.io/divya-boutique/admin`. There is no Admin link in the shop header.
