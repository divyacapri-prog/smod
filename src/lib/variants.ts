import frontAsset from "@/assets/smod-regular-front.jpg.asset.json";
import backAsset from "@/assets/smod-regular-back.jpg.asset.json";
import innerwearPack from "@/assets/smod-innerwear-pack.jpg.asset.json";
import babyPack from "@/assets/smod-baby-pack.jpg.asset.json";

export type Retailer = { name: string; url: string };

export type Packaging = {
  productName: string;
  subtitle: string;
  claim: string;
  weight: string;
  fragrance: string;
  benefits: { icon: string; title: string; body: string }[];
  directions: { step: number; body: string }[];
  dosage: { load: string; pods: string }[];
  caution: string[];
  certifications: string[]; // e.g. "Cruelty Free", "Recyclable Packaging"
  machines: string[];
  highlights: string[]; // marketing badges
  imageUrl?: string;
  imageFrontUrl?: string;
  imageBackUrl?: string;
};

export type Variant = {
  slug: "regular" | "socks" | "sports" | "innerwear" | "baby";
  name: string;
  tagline: string;
  headline: string;
  description: string;
  emoji: string;
  palette: {
    brand: string;
    brandDeep: string;
    accent: string;
    bg: string;
    bgSoft: string;
    surface: string;
    ink: string;
    inkSoft: string;
  };
  benefits: { title: string; description: string }[];
  testimonials: { name: string; location: string; quote: string; rating: number }[];
  packs: {
    sku: string;
    size: 20 | 40;
    price: number;
    perWash: number;
    bestFor: string;
    household: string;
    buyPath: string;
  }[];
  retailers: Retailer[];
  packaging: Packaging;
};

// Master SMOD brand palette (extracted from Regular packaging artwork)
export const BRAND_PALETTE = {
  brand: "#2A3A86",       // Deep Cobalt Blue
  brandDeep: "#1D2029",   // Charcoal Navy
  accent: "#756CA1",      // Soft Violet Blue
  bg: "#FFFFFF",          // White
  bgSoft: "#E4DED3",      // Pale Cream Beige
  surface: "#FFFFFF",
  ink: "#1D2029",
  inkSoft: "#728198",     // Muted Blue Grey
};

export const VARIANTS: Variant[] = [
  {
    slug: "regular",
    name: "Regular",
    tagline: "For the whole family's clothes",
    headline: "Daily laundry, perfected.",
    description:
      "Smod Laundry Washing Pods are convenient, effective and safe for the whole family's clothes. Suitable for all fabrics and colors.",
    emoji: "🧺",
    palette: BRAND_PALETTE,
    benefits: [
      { title: "Deep Clean", description: "Powerful stain removal in a single cycle." },
      { title: "Fresh Scent", description: "Long lasting freshness, never overpowering." },
      { title: "Safe for Colors", description: "Gentle on fabrics, brilliant on whites." },
    ],
    testimonials: [
      { name: "Aarav S.", location: "Mumbai", quote: "Genuinely the cleanest my whites have looked in years. No more scooping powder.", rating: 5 },
      { name: "Priya N.", location: "Bengaluru", quote: "One pod per load and done. The fragrance is subtle and premium.", rating: 5 },
      { name: "Rohan K.", location: "Delhi", quote: "Switched the whole family over. Even tough stains rinse out clean.", rating: 4 },
    ],
    packs: [
      { sku: "REG20", size: 20, price: 499, perWash: 24.95, bestFor: "Singles & couples", household: "1–2 people", buyPath: "/buy/regular-20" },
      { sku: "REG40", size: 40, price: 899, perWash: 22.48, bestFor: "Families", household: "3–5 people", buyPath: "/buy/regular-40" },
    ],
    retailers: [
      { name: "Amazon", url: "#" },
      { name: "Flipkart", url: "#" },
      { name: "Myntra", url: "#" },
      { name: "Zepto", url: "#" },
      { name: "Blinkit", url: "#" },
      { name: "Instamart", url: "#" },
    ],
    packaging: {
      productName: "smod Laundry Washing Pods",
      subtitle: "For Whole Family Clothes",
      claim: "Powerful Clean · Smart Detergent",
      weight: "250 g",
      fragrance: "Long-lasting fresh scent",
      benefits: [
        { icon: "👕", title: "Deep Clean", body: "Powerful stain removal" },
        { icon: "🌸", title: "Fresh Scent", body: "Long lasting freshness" },
        { icon: "🌿", title: "Eco Friendly", body: "Biodegradable film" },
        { icon: "✨", title: "Safe for Colors", body: "Gentle on fabrics" },
      ],
      directions: [
        { step: 1, body: "Put pod(s) in the drum before adding clothes." },
        { step: 2, body: "Add clothes." },
        { step: 3, body: "Select cycle & start washing. No need to cut or tear the pod. The film dissolves completely in water." },
      ],
      dosage: [
        { load: "0–5 kg", pods: "1 pod" },
        { load: "5–8 kg", pods: "2 pods" },
        { load: "8 kg or more", pods: "3 pods" },
      ],
      caution: [
        "Keep out of reach of children.",
        "Avoid contact with eyes.",
        "Do not ingest. If swallowed, seek medical advice immediately.",
        "Store in a cool, dry place.",
        "Do not handle pods with wet hands.",
      ],
      certifications: ["Cruelty Free", "Recyclable Packaging"],
      machines: ["Top Load", "Front Load"],
      highlights: ["Powerful Clean", "Smart Detergent", "20 Wash Pods"],
      imageFrontUrl: frontAsset.url,
      imageBackUrl: backAsset.url,
    },
  },
  {
    slug: "socks",
    name: "Socks",
    tagline: "Odor, defeated",
    headline: "Serious Sock-Specific Science",
    description:
      "An enzyme-loaded pod engineered for the toughest sweat odors and ground-in grime. Bring tired socks back to life.",
    emoji: "🧦",
    palette: {
      brand: "#2A4B9B",       // Cobalt Blue (logo)
      brandDeep: "#1E3870",   // Rich dark cobalt
      accent: "#897BAA",      // Soft Violet
      bg: "#B5B8BE",          // Medium-light grey — clearly grey, readable
      bgSoft: "#A6A9AF",      // Slightly darker section grey
      surface: "#FFFFFF",     // White cards for crisp contrast
      ink: "#000000",         // Pure black for maximum readability
      inkSoft: "#3A3C42",     // Dark grey for secondary text
    },
    benefits: [
      { title: "Deep Odor Removal", description: "Bio-enzymes break down sweat residue at the molecular level." },
      { title: "Sweat Stain Reduction", description: "Lifts yellowing from heels, toes and arches." },
      { title: "Long-lasting Freshness", description: "Anti-microbial finish keeps socks fresher for longer." },
    ],
    testimonials: [
      { name: "Vikram T.", location: "Pune", quote: "My gym socks smell like socks again. Not biohazards.", rating: 5 },
      { name: "Arjun P.", location: "Delhi", quote: "Worth it just for the white sneakers' inner liners.", rating: 4 },
      { name: "Neel C.", location: "Mumbai", quote: "Did not believe pods could fix this. Stand corrected.", rating: 5 },
    ],
    packs: [
      { sku: "SOCK20", size: 20, price: 479, perWash: 23.95, bestFor: "Athletes & commuters", household: "1–2 people", buyPath: "/buy/socks-20" },
      { sku: "SOCK40", size: 40, price: 849, perWash: 21.23, bestFor: "Active households", household: "3–5 people", buyPath: "/buy/socks-40" },
    ],
    retailers: [
      { name: "Amazon", url: "#" },
      { name: "Flipkart", url: "#" },
      { name: "Myntra", url: "#" },
      { name: "Zepto", url: "#" },
      { name: "Blinkit", url: "#" },
      { name: "Instamart", url: "#" },
    ],
    packaging: {
      productName: "smod Laundry Washing Pods",
      subtitle: "For Socks Care",
      claim: "Odor Destroyer · Anti-Microbial",
      weight: "250 g",
      fragrance: "Fresh mint & eucalyptus",
      benefits: [
        { icon: "👕", title: "Deep Clean", body: "Powerful stain removal" },
        { icon: "🌸", title: "Fresh Scent", body: "Long lasting freshness" },
        { icon: "🌿", title: "Eco Friendly", body: "Biodegradable film" },
        { icon: "✨", title: "Safe for Colors", body: "Gentle on fabrics" },
      ],
      directions: [
        { step: 1, body: "Put pod(s) in the drum before adding clothes." },
        { step: 2, body: "Add socks and activewear." },
        { step: 3, body: "Select cycle & start washing. The film dissolves completely in water." },
      ],
      dosage: [
        { load: "Up to 20 pairs", pods: "1 pod" },
        { load: "20–40 pairs", pods: "2 pods" },
        { load: "Mixed laundry load", pods: "2 pods" },
      ],
      caution: [
        "Keep out of reach of children.",
        "Avoid contact with eyes.",
        "Do not ingest. If swallowed, seek medical advice immediately.",
        "Store in a cool, dry place.",
        "Do not handle pods with wet hands.",
      ],
      certifications: ["Cruelty Free", "Recyclable Packaging"],
      machines: ["Top Load", "Front Load"],
      highlights: ["Odor Destroyer", "Anti-Microbial", "Smart Detergent"],
    },
  },
  {
    slug: "sports",
    name: "Sports",
    tagline: "Built for performance fabrics",
    headline: "Train hard. Wash smart.",
    description:
      "A technical pod tuned for moisture-wicking polyester, spandex and merino. Removes sweat, salts and odor without damaging fibers.",
    emoji: "🏃",
    palette: {
      brand: "#0074E1",       // Deep Cobalt Blue — graphic mid-tones
      brandDeep: "#1A1A1A",   // Matte Black — container body & text panel
      accent: "#E14DCA",      // Vibrant Fuchsia — swirl highlights
      bg: "#0A0A0A",          // Near black page background
      bgSoft: "#141414",      // Slightly lighter dark sections
      surface: "#1A1A1A",     // Matte black cards
      ink: "#F2F2F2",         // Clean Off-White — all text & icons
      inkSoft: "#B0B0B0",     // Muted grey for secondary text
    },
    benefits: [
      { title: "Activewear Protection", description: "Preserves stretch, shape and wicking performance." },
      { title: "Sweat & Odor Control", description: "Neutralises bacterial odor without masking it." },
      { title: "Performance Fabric Safe", description: "Tested on Lycra, Dri-FIT, merino and recycled poly." },
    ],
    testimonials: [
      { name: "Karan B.", location: "Bengaluru", quote: "My running tees feel new again. No more stink after one wear.", rating: 5 },
      { name: "Isha L.", location: "Mumbai", quote: "Yoga sets stay soft and stretchy. Love the citrus note.", rating: 5 },
      { name: "Dev M.", location: "Hyderabad", quote: "Cycling kit washes have been transformed.", rating: 4 },
    ],
    packs: [
      { sku: "SPORT20", size: 20, price: 529, perWash: 26.45, bestFor: "Weekly trainers", household: "1 person", buyPath: "/buy/sports-20" },
      { sku: "SPORT40", size: 40, price: 949, perWash: 23.73, bestFor: "Daily athletes", household: "1–3 people", buyPath: "/buy/sports-40" },
    ],
    retailers: [
      { name: "Amazon", url: "#" },
      { name: "Flipkart", url: "#" },
      { name: "Myntra", url: "#" },
      { name: "Zepto", url: "#" },
      { name: "Blinkit", url: "#" },
      { name: "Instamart", url: "#" },
    ],
    packaging: {
      productName: "smod Laundry Washing Pods",
      subtitle: "For Sports Wear",
      claim: "Performance Clean · Fiber Safe",
      weight: "250 g",
      fragrance: "Cool citrus & marine",
      benefits: [
        { icon: "👕", title: "Deep Clean", body: "Powerful stain removal" },
        { icon: "🌸", title: "Fresh Scent", body: "Long lasting freshness" },
        { icon: "🌿", title: "Eco Friendly", body: "Biodegradable film" },
        { icon: "✨", title: "Safe for Colors", body: "Gentle on fabrics" },
      ],
      directions: [
        { step: 1, body: "Put pod(s) in the drum before adding clothes." },
        { step: 2, body: "Add activewear. Avoid mixing with heavy cottons." },
        { step: 3, body: "Use cold/warm cycle. The film dissolves completely in water." },
      ],
      dosage: [
        { load: "0–5 kg", pods: "1 pod" },
        { load: "5–8 kg", pods: "2 pods" },
        { load: "8 kg or more", pods: "3 pods" },
      ],
      caution: [
        "Keep out of reach of children.",
        "Avoid contact with eyes.",
        "Do not ingest. If swallowed, seek medical advice immediately.",
        "Store in a cool, dry place.",
        "Do not handle pods with wet hands.",
      ],
      certifications: ["Cruelty Free", "Recyclable Packaging"],
      machines: ["Top Load", "Front Load"],
      highlights: ["Performance Clean", "Fiber Safe", "Smart Detergent"],
    },
  },
  {
    slug: "innerwear",
    name: "Intimate Wear",
    tagline: "Gentle care for delicates",
    headline: "Made with women care, for you.",
    description:
      "Smod Intimate Wear Cleaning Pods are specially formulated to remove tough stains, odor & bacteria while being gentle on delicate fabrics. Ideal for bras, panties and other intimate wear.",
    emoji: "🌸",
    palette: {
      brand: "#F5398E",       // Vibrant pink
      brandDeep: "#8E527F",   // Deep mauve
      accent: "#F899C1",      // Soft pink accent
      bg: "#FBDCE7",          // Pale blush page bg
      bgSoft: "#F5E8D8",      // Warm cream sections
      surface: "#FFFFFF",
      ink: "#1D2A6B",
      inkSoft: "#8E527F",
    },
    benefits: [
      { title: "Deep Clean", description: "Removes tough stains and odor from intimate fabrics." },
      { title: "Gentle Care", description: "Safe on lace, mesh and delicate elastics." },
      { title: "Antimicrobial", description: "Fights odor and bacteria, all day fresh." },
    ],
    testimonials: [
      { name: "Meera J.", location: "Mumbai", quote: "Finally a pod that doesn't shred my lace bras. Game changer.", rating: 5 },
      { name: "Ananya R.", location: "Bengaluru", quote: "Smells lovely and my whites actually stay white.", rating: 5 },
      { name: "Sneha P.", location: "Delhi", quote: "pH balanced and gentle — exactly what delicates need.", rating: 4 },
    ],
    packs: [
      { sku: "INNER20", size: 20, price: 519, perWash: 25.95, bestFor: "Solo wardrobes", household: "1 person", buyPath: "/buy/innerwear-20" },
      { sku: "INNER40", size: 40, price: 929, perWash: 23.23, bestFor: "Shared households", household: "2–4 people", buyPath: "/buy/innerwear-40" },
    ],
    retailers: [
      { name: "Amazon", url: "#" },
      { name: "Flipkart", url: "#" },
      { name: "Myntra", url: "#" },
      { name: "Zepto", url: "#" },
      { name: "Blinkit", url: "#" },
      { name: "Instamart", url: "#" },
    ],
    packaging: {
      productName: "smod Intimate Wear Cleaning Pods",
      subtitle: "For Your Delicate Innerwear",
      claim: "Powerful Clean Every Time · pH Balanced Gentle Formula",
      weight: "250 g",
      fragrance: "Soft floral freshness",
      benefits: [
        { icon: "👕", title: "Deep Clean", body: "Powerful stain removal" },
        { icon: "🌸", title: "Fresh Scent", body: "Long lasting freshness" },
        { icon: "🌿", title: "Eco Friendly", body: "Biodegradable film" },
        { icon: "✨", title: "Safe for Colors", body: "Gentle on fabrics" },
      ],
      directions: [
        { step: 1, body: "Put 1 pod in the drum before adding innerwear." },
        { step: 2, body: "Add your innerwear." },
        { step: 3, body: "Select cycle & start washing. No need to cut or tear the pod. The film dissolves completely in water." },
      ],
      dosage: [
        { load: "0–5 kg", pods: "1 pod" },
        { load: "5–8 kg", pods: "2 pods" },
        { load: "8 kg or more", pods: "3 pods" },
      ],
      caution: [
        "Keep out of reach of children.",
        "Avoid contact with eyes.",
        "Do not ingest. If swallowed, seek medical advice immediately.",
        "Store in a cool, dry place.",
        "Do not handle pods with wet hands.",
      ],
      certifications: ["Cruelty Free", "Antimicrobial", "Recyclable Packaging"],
      machines: ["Top Load", "Front Load"],
      highlights: ["For Bras", "For Panties", "pH Balanced"],
      imageUrl: innerwearPack.url,
    },
  },
  {
    slug: "baby",
    name: "Baby",
    tagline: "Made with mom love",
    headline: "Deep Clean. Gentle Care.",
    description:
      "Smod Baby Laundry Pods are designed to deliver a powerful clean while being extra gentle on baby's skin and clothes. Our pre-measured pods dissolve quickly in water to remove tough stains and odors, keeping fabrics soft, fresh and safe for your little one.",
    emoji: "👶",
    palette: {
      brand: "#8E527F",       // Deep mauve
      brandDeep: "#905579",   // Plum
      accent: "#B78AD8",      // Soft lavender accent (from baby pods)
      bg: "#E9E2E5",          // Soft warm grey bg
      bgSoft: "#D8D3D9",      // Cool dove sections
      surface: "#FFFFFF",
      ink: "#1D2A6B",
      inkSoft: "#8E527F",
    },
    benefits: [
      { title: "Gentle on Sensitive Skin", description: "Dermatologically tested, antimicrobial formula." },
      { title: "Powerful Stain Removal", description: "Tackles milk, food and play stains in one wash." },
      { title: "Antimicrobial & Safe", description: "Free from bleach, parabens and harsh dyes." },
    ],
    testimonials: [
      { name: "Riya M.", location: "Pune", quote: "No rashes, no fuss. My baby's clothes come out beautifully soft.", rating: 5 },
      { name: "Tanvi S.", location: "Hyderabad", quote: "Even the stubborn pureed-carrot stains rinse right out.", rating: 5 },
      { name: "Aparna K.", location: "Chennai", quote: "Peace of mind in a little pod. Highly recommend.", rating: 5 },
    ],
    packs: [
      { sku: "BABY20", size: 20, price: 549, perWash: 27.45, bestFor: "New parents", household: "1 baby", buyPath: "/buy/baby-20" },
      { sku: "BABY40", size: 40, price: 979, perWash: 24.48, bestFor: "Growing families", household: "1–2 kids", buyPath: "/buy/baby-40" },
    ],
    retailers: [
      { name: "Amazon", url: "#" },
      { name: "Flipkart", url: "#" },
      { name: "Myntra", url: "#" },
      { name: "Zepto", url: "#" },
      { name: "Blinkit", url: "#" },
      { name: "Instamart", url: "#" },
    ],
    packaging: {
      productName: "smod Baby Laundry Pods",
      subtitle: "For your baby. For your peace of mind.",
      claim: "Deep Clean. Gentle Care.",
      weight: "250 g",
      fragrance: "Soft, baby-safe scent",
      benefits: [
        { icon: "👕", title: "Deep Clean", body: "Powerful stain removal" },
        { icon: "🌸", title: "Fresh Scent", body: "Long lasting freshness" },
        { icon: "🌿", title: "Eco Friendly", body: "Biodegradable film" },
        { icon: "✨", title: "Safe for Colors", body: "Gentle on fabrics" },
      ],
      directions: [
        { step: 1, body: "Add 1 pod to empty drum." },
        { step: 2, body: "Add your baby clothes." },
        { step: 3, body: "Select cycle & start washing." },
      ],
      dosage: [
        { load: "0–5 kg", pods: "1 pod" },
        { load: "5–8 kg", pods: "2 pods" },
        { load: "8 kg or more", pods: "3 pods" },
      ],
      caution: [
        "Keep out of reach of children.",
        "Avoid contact with eyes.",
        "Do not ingest. If swallowed, seek medical advice immediately.",
        "Store in a cool, dry place.",
        "Do not handle pods with wet hands.",
      ],
      certifications: ["Cruelty Free", "Antimicrobial", "Recyclable Packaging", "Dermatologically Tested"],
      machines: ["Top Load", "Front Load"],
      highlights: ["Antimicrobial", "Safe for Colors & Fabrics"],
      imageUrl: babyPack.url,
    },
  },
];

export const getVariant = (slug: string) => VARIANTS.find((v) => v.slug === slug);

export const ALL_SKUS = VARIANTS.flatMap((v) =>
  v.packs.map((p) => ({ ...p, variant: v }))
);

export const findSku = (skuPath: string) =>
  ALL_SKUS.find((p) => p.buyPath === `/buy/${skuPath}`);

export const paletteToCssVars = (p: Variant["palette"]): React.CSSProperties =>
  ({
    "--brand": p.brand,
    "--brand-deep": p.brandDeep,
    "--accent": p.accent,
    "--v-bg": p.bg,
    "--v-bg-soft": p.bgSoft,
    "--v-surface": p.surface,
    "--v-ink": p.ink,
    "--v-ink-soft": p.inkSoft,
  } as React.CSSProperties);
