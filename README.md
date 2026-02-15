**Live demo:** https://parkettleggingoslo-vercel.vercel.app/

# Parkettlegging Oslo — Next.js Pricing Calculator Landing Page

A production-ready service landing page built with **Next.js (App Router)** and **TypeScript**.
The core feature is a **dynamic pricing calculator** designed to increase lead quality by setting expectations upfront.

## Why this project?
Service businesses often waste time on low-budget inquiries and “free estimate” calls.
This project solves that by combining:
- transparent pricing ranges
- automatic volume discounts
- configurable add-ons
- minimum job enforcement

Result: fewer low-quality leads, more serious inquiries.

## Key features
- **Dynamic price estimator** (m² slider + floor type selection)
- **Volume discount tiers** (automatic multiplier based on area)
- **Add-ons** (per m² and fixed fees)
- **Minimum job protection**
- Clean, Scandinavian-style UI
- Responsive layout and SEO-ready structure

## Tech stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Architecture
- `src/app` — routing/layout (App Router)
- `src/components` — UI components (`PriceCalculator`, `Header`, `Services`)
- `src/lib/pricingConfig.ts` — pricing config + pure calculation function `estimatePrice()`

Business logic is separated from UI to keep the calculator testable and reusable.

## Running locally
```bash
npm install
npm run dev
