# NeatHarbor Goods

> **Clear the clutter. Make room for life.**

A lightweight, mobile-friendly ecommerce storefront for practical organization products across home, kitchen, closets, travel, work, and tech — with product-specific Square-hosted checkout.

**Storefront:** https://apexgaze1.github.io/https-github.com-yourusername-your-repository/

---

## Overview

NeatHarbor Goods is built around a simple operating idea: make useful organization products easy to discover, understand, and purchase without unnecessary checkout complexity.

This repository contains the customer-facing NeatHarbor storefront and supporting assets. The current implementation emphasizes a focused catalog, mobile usability, secure external payment processing, clear customer-service information, and conservative production-readiness rules.

## Current Status

| Area | Status | Notes |
| --- | --- | --- |
| Storefront | Active | GitHub Pages storefront |
| Product catalog | Active | Product cards, search/filtering and NHG shop codes |
| Regular Square checkout | Integrated | Product-specific Square-hosted checkout links are present |
| Payment-security messaging | Active | Customers are directed to Square for payment |
| Customer-help chatbot | Active | Handles basic store and policy questions |
| Email-alert signup | Integrated | Requires explicit marketing consent |
| NEAT20 member checkout | **Verification pending** | Do not promote as a verified discount until a real discounted Square checkout is confirmed |
| Automated supplier fulfillment | **Verification gated** | Must remain fail-closed unless exact variant mapping and bridge readiness are verified |

> **Production rule:** “present in the code” is not the same as “verified end to end.”

## Customer Experience

The storefront currently provides:

- Responsive shopping for desktop and mobile
- Featured and Hot Sale product presentation
- Search and category filtering
- Standardized `NHG-` product/shop codes
- Product-specific Square checkout links
- Shipping and return information
- Payment-security guidance
- Email-alert signup with consent
- Basic customer-service chatbot
- Shareable storefront/product navigation
- Refined product imagery

## Checkout Architecture

Regular purchases follow a deliberately simple path:

```text
Customer
   ↓
NeatHarbor product
   ↓
Matching product-specific checkout link
   ↓
Square-hosted checkout
   ↓
Customer completes payment with Square
```

NeatHarbor does **not** request payment-card numbers, CVV codes, bank credentials, or payment passwords through website chat, email, or social media.

### Regular Checkout Verification

A regular checkout path is considered verified only when all of the following match:

1. Storefront product name
2. Storefront regular price
3. Intended product-specific Square URL
4. Product presented by Square
5. Amount presented by Square

A valid URL by itself is not sufficient evidence that the entire checkout path is correct.

## NEAT20 Member Checkout

NEAT20 is intended as a member offer for qualifying merchandise over $30.

**Current status: verification pending.**

The storefront must not represent NEAT20 as a verified or guaranteed discount until an end-to-end test demonstrates that the member flow creates a genuine Square-hosted checkout with the correct product and discounted amount.

The intended flow is:

```text
Customer gives marketing consent
   ↓
Member access is issued
   ↓
Eligible product is selected
   ↓
NeatHarbor backend requests member checkout
   ↓
Square-hosted discounted checkout is created
   ↓
Product + discounted amount are independently verified
```

Until that final verification succeeds, regular Square checkout remains the production path.

## Payment Security

Payment processing is separated from the storefront wherever practical.

**Customer safety standard**

- Complete payment only through the matching Square-hosted checkout.
- Never send card numbers or CVV codes through NeatHarbor chat.
- Never send banking passwords or payment credentials by email.
- Never provide payment credentials through social-media messages.
- Treat unexpected payment requests outside the approved checkout path as unverified.

## Product Identification

NeatHarbor uses standardized product codes beginning with:

```text
NHG-
```

These codes provide a stable internal reference for storefront navigation, supplier mapping, checkout verification, and operational troubleshooting.

A product's storefront identity, price, checkout URL, supplier variant, and fulfillment mapping should be treated as separate fields and verified independently.

## Fulfillment Safety Gate

Successful payment does **not** automatically mean supplier fulfillment is automated.

Automatic order submission should remain fail-closed unless the specific product has:

- An exact supplier product mapping
- The correct supplier variant
- Confirmed pack/count interpretation where applicable
- Valid fulfillment credentials
- A functioning integration bridge
- Successful end-to-end testing

If any required mapping is ambiguous, the order should require manual review rather than guessing a supplier variant.

## Repository Structure

The project is intentionally lightweight.

```text
/
├── index.html          # Main storefront
├── README.md           # Project and operating documentation
└── assets/             # Storefront/product visual assets
```

The storefront currently uses a primarily static front end, while functionality requiring protected credentials or server-side commerce operations must remain outside the public client code.

## Deployment

The customer-facing site is published with GitHub Pages from this repository.

Production changes should follow this sequence:

```text
Edit
  ↓
Review
  ↓
Commit
  ↓
Deploy
  ↓
Verify the public storefront
  ↓
Verify affected checkout/customer flows
```

A successful source commit is not, by itself, proof that a public deployment or external payment flow works correctly.

## Operational Standards

NeatHarbor follows a verification-first approach.

Do not publish or imply unverified claims concerning:

- Discounts or coupon availability
- Product inventory
- Delivery dates
- Customer reviews
- Sales volume
- Scarcity or urgency
- Supplier fulfillment status
- Automated order processing
- Profit or savings guarantees

Customer-facing statements should reflect the state that has actually been verified.

## Privacy & Marketing

Marketing email should be sent only to people who have explicitly consented to receive it.

Customer payment credentials should never be collected through the NeatHarbor email signup, chatbot, or social-media channels.

Production credentials, API secrets, private tokens, and supplier/payment authentication material must never be committed to this public repository.

## Release Checklist

Before describing the storefront as fully transaction-ready:

- [ ] Public storefront loads successfully
- [ ] Product names and prices match the intended catalog
- [ ] Regular Square links resolve to the matching product and amount
- [ ] Mobile shopping flow is usable
- [ ] Shipping and return information is visible
- [ ] Payment-security messaging is visible
- [ ] Customer-help functionality works as intended
- [ ] No secrets or private credentials are exposed in client code
- [ ] NEAT20 remains marked pending until discounted Square checkout passes end-to-end verification
- [ ] Automatic fulfillment remains gated until supplier bridge readiness passes end-to-end verification

## Development Priorities

Current priorities are:

1. Complete regular Square checkout verification.
2. Complete the NEAT20 → backend → Square discounted-checkout test.
3. Verify fulfillment mappings independently from payment readiness.
4. Keep customer-facing claims synchronized with verified system status.
5. Continue improving accessibility, performance, product presentation, and mobile usability.

## Maintenance

This README is intended to function as both a project introduction and a high-level operating reference. Update it whenever the storefront architecture, payment flow, fulfillment state, deployment method, or production-readiness status materially changes.

---

### NeatHarbor Goods

**Practical organization. Clear purchasing paths. Verification before promotion.**
