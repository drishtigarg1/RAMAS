# Rama Stationers & Sports — feature gap audit

This audit reflects the current repository after the account/address slice was added.

## Done or substantially present

- React/Vite storefront shell and responsive home experience
- Express API with Mongo/Mongoose models
- JWT-protected customer/admin routes
- Product, category, brand and upload endpoints
- Cart and wishlist contexts
- Customer registration/login/logout flow
- Admin dashboard/product/order surfaces
- Backend price lookup and stock checks during order creation
- Saved addresses API with ownership checks, validation, default address handling and CRUD UI
- Checkout can select a saved address
- Orders retain a shipping address object at creation time
- Customer-friendly order/invoice identifiers and order status history fields added

## Partial

- Order history exists, but needs richer filters, tracking actions, invoice actions and item-level status
- Checkout has address reuse, but still needs multi-step delivery/payment UX and a backend payment abstraction
- Product images and catalogue data still need a proper Cloudinary-backed production data path
- Admin order management needs tracking, returns, refunds, customer detail and audit actions
- Authentication needs password reset, session invalidation, stronger token/cookie strategy and profile editing
- Search and filters exist in parts of the frontend but need complete backend-driven coverage
- Reviews, coupons, notifications and support need persistence and authorization models

## Not yet implemented

- Invoice model and server-generated PDF invoice delivery
- Razorpay order/signature/refund workflow
- Returns, replacements and partial refunds
- Support tickets and notification center
- Inventory transaction history and admin audit log
- Role-specific admin authorization
- Courier synchronization architecture
- Production deployment wiring for Vercel, Render, MongoDB Atlas and Cloudinary

## Known follow-up risks

- Existing legacy orders may not have `orderNumber`, `invoiceNumber` or `statusHistory`; all new code must remain backward-compatible while data is migrated.
- The current client API URL depends on environment configuration; local and production `.env.example` values should be aligned before deployment.
- Invoice numbering should move from timestamp-derived fallback to an atomic counter before production traffic.
