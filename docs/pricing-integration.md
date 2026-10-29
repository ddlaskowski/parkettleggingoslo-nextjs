# Dedicated pricing page

`/priser` uses the existing `HomeClient` composition unchanged. Despite its name,
it already provides everything needed on either route:

1. One `PriceCalculator` maintains its own selection state and calls the existing
   `estimatePrice` engine.
2. `onSendInquiry` passes the existing configuration/result payload to
   `HomeClient`'s existing formatter.
3. The formatter sets the contact prefill locally on the same page.
4. The calculator scrolls to the local `#kontakt`; `ContactForm` submits the
   existing payload to the unchanged `/api/contact` handler.

The local section IDs `pris` and `kontakt` occur once per page. Switching routes
starts a separate component instance; selections are not transferred across
routes. No new persistence or cross-route state contract is introduced. Moving
between calculator and form on the same page preserves the mounted calculator.

There is no new pricing engine, price table, formatter, API, or contact form.
`pricingConfig.ts`, `PriceCalculator.tsx`, `HomeClient.tsx`, and `ContactForm.tsx`
are unchanged in this phase. The existing handshake and tracking behavior is reused.

The CSS module only adjusts the pricing-page calculator layout on small screens.
It wraps option prices and long labels and reduces nested padding. It does not
hide controls, rewrite prices, or alter the homepage calculator layout.

## Content and navigation

- All monetary values remain in the calculator and its approved configuration.
- FAQs explain minimum-job application, VAT display, add-ons, waste handling,
  and why the displayed installation rate can differ from total divided by area.
- Existing global `Pris` navigation now links to `/priser`; no item is added.
- The homepage's local hero/calculator links and `#pris` remain available.
- Service-page calculator links now point to `/priser#pris`.
- The form remains immediately after the calculator, as in the homepage
  composition. The final CTA returns to that existing local form.

## Validation boundary

Use browser checks for selections, keyboard controls, labels, prefill, disabled
submission states, route links, and responsive layout. Test request payloads,
success, API errors, and network failure with a mocked `fetch`; never send a
verification inquiry to the live backend. The contact API itself is not changed.
