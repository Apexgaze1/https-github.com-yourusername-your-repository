# NeatHarbor Goods

**Clear the clutter. Make room for life.**

NeatHarbor Goods is an online storefront focused on practical organization products for home, travel, work, kitchens, closets, tech, and small spaces.

## Live Storefront

The storefront is published with GitHub Pages:

https://apexgaze1.github.io/https-github.com-yourusername-your-repository/

## Store Features

- Mobile-friendly product catalog
- Product-specific shop codes using the `NHG-` prefix
- Secure Square-hosted checkout links
- Shipping and return information
- NeatHarbor customer-help chatbot
- Email-alert signup with explicit marketing consent
- Refined product imagery and Hot Sale presentation

## Payment Security

Customer payments are processed through Square-hosted checkout. NeatHarbor Goods does not ask customers to send card numbers, CVV codes, bank credentials, or payment passwords through the website chat, email, or social media.

## NEAT20 Status

The NEAT20 member-discount checkout is currently **under verification**. It must not be treated or promoted as an active verified discount until an eligible order successfully produces the correct discounted Square-hosted checkout.

Regular product-specific Square checkout remains available independently of the NEAT20 verification process.

## Checkout Verification Standard

Before a checkout path is considered production-ready, verify:

1. The storefront product name matches the intended product.
2. The displayed storefront price matches the intended regular price.
3. The product opens the correct Square-hosted checkout.
4. The Square checkout shows the correct product and amount.
5. For NEAT20, the generated Square-hosted checkout must independently confirm the correct discounted amount.

A working payment link alone does not establish fulfillment automation.

## Fulfillment

Supplier mappings and fulfillment automation are managed separately from payment processing. Automatic fulfillment should remain fail-closed for any product whose exact supplier variant or bridge readiness has not been verified.

## Repository

The main storefront is currently implemented in `index.html`, with supporting assets stored in the repository.

## Operating Principle

NeatHarbor should not publish unverified claims about discounts, inventory, delivery times, customer reviews, scarcity, sales volume, or automated fulfillment. Customer-facing information should reflect the currently verified state of the storefront and checkout systems.
