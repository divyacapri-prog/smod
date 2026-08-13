# SMOD

Build a complete modern D2C ecommerce website for a premium laundry detergent pod brand.

I will upload 5 product variant images. Each variant has its own packaging design and color scheme. Automatically extract colors, typography style, visual identity, and branding cues from the uploaded images and use them consistently throughout the corresponding landing page.

PRODUCT VARIANTS:

1. Regular Wash

2. Baby Care

3. Women's Inners

4. Socks Care

5. Sports Wear

SITE STRUCTURE:

Create 5 separate landing pages:

/regular

/baby

/womens-inners

/socks

/sports

Each landing page should be visually unique using the colors from the respective product packaging while maintaining the same premium brand identity and layout structure.

For each variant, offer:

- 20 Pods Pack

- 40 Pods Pack

Each SKU must have its own unique QR code.

QR CODE MATRIX:

Regular 20 Pods

Regular 40 Pods

Baby 20 Pods

Baby 40 Pods

Women's Inners 20 Pods

Women's Inners 40 Pods

Socks 20 Pods

Socks 40 Pods

Sports 20 Pods

Sports 40 Pods

TOTAL: 10 unique QR codes

Generate placeholder QR codes that can later be replaced with production URLs.

URL STRUCTURE:

/buy/regular-20

/buy/regular-40

/buy/baby-20

/buy/baby-40

/buy/womens-inners-20

/buy/womens-inners-40

/buy/socks-20

/buy/socks-40

/buy/sports-20

/buy/sports-40

LANDING PAGE SECTIONS:

1. Hero Section

- Large product image

- Variant-specific color theme

- Strong headline

- Short benefit-driven description

- CTA button "Buy Now"

- Display both 20 Pod and 40 Pod options

2. Why Pods Section

- Pre-measured detergent

- No spills

- Easy storage

- Travel friendly

- Eco conscious

- Premium cleaning performance

3. Variant Benefits Section

Regular:

- Everyday cleaning

- Fresh fragrance

- Fabric protection

Baby:

- Gentle on baby clothes

- Sensitive skin friendly

- Dermatologically safe positioning

Women's Inners:

- Delicate fabric care

- Odor control

- Hygiene focused

Socks:

- Deep odor removal

- Sweat stain reduction

- Long-lasting freshness

Sports:

- Activewear protection

- Sweat and odor control

- Performance fabric safe

4. How It Works

Step 1: Place pod

Step 2: Add clothes

Step 3: Start wash

Step 4: Enjoy fresh laundry

5. Product Comparison Table

20 Pods vs 40 Pods

Columns:

- Number of washes

- Cost per wash

- Best for

- Recommended household size

6. Testimonials Section

Generate realistic customer reviews specific to each category.

7. FAQ Section

Questions:

- How many clothes per pod?

- Is it suitable for front load machines?

- Is it suitable for top load machines?

- Are pods safe for fabrics?

- How should pods be stored?

8. Purchase Section

Display:

20 Pods Card

- Product image

- Price placeholder

- Buy button

- QR code

40 Pods Card

- Product image

- Price placeholder

- Buy button

- QR code

QR CODE BEHAVIOR

Each QR code should:

- Be unique

- Encode its respective purchase URL

- Be downloadable as PNG

- Be generated dynamically from URL data

- Have a visible SKU label beneath it

Example:

REG20 → /buy/regular-20

REG40 → /buy/regular-40

BABY20 → /buy/baby-20

BABY40 → /buy/baby-40

WIN20 → /buy/womens-inners-20

WIN40 → /buy/womens-inners-40

SOCK20 → /buy/socks-20

SOCK40 → /buy/socks-40

SPORT20 → /buy/sports-20

SPORT40 → /buy/sports-40

DESIGN REQUIREMENTS

- Premium D2C brand aesthetic

- Mobile-first responsive design

- Fast loading

- Modern animations

- Smooth scrolling

- Sticky CTA button

- Glassmorphism accents

- Subtle gradients

- Premium ecommerce look similar to Apple, Dyson, Notion, or modern Shopify brands

- Accessibility compliant

- SEO optimized

TECH STACK

- Next.js

- React

- Tailwind CSS

- TypeScript

- Dynamic QR code generation

- Reusable component architecture

- CMS-ready content structure

ADMIN REQUIREMENTS

Store all variant data in a centralized JSON configuration:

{

  variantName,

  colorPalette,

  images,

  benefits,

  pricing,

  qrCodeUrl20,

  qrCodeUrl40

}

All landing pages should be generated dynamically from this configuration.

Generate the complete website, all components, routing, responsive layouts, QR generation functionality, and sample content in one implementation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f6b7c527-f303-4b50-914d-49ab8e0013da).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
