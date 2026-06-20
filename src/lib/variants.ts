export type Retailer = { name: string; url: string };

export type Variant = {
  slug: "regular" | "baby" | "womens-inners" | "socks" | "sports";
  name: string;
  tagline: string;
  headline: string;
  description: string;
  emoji: string;
  // Color palette (hex; consumed via CSS custom properties)
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
    buyPath: string; // /buy/...
  }[];
  retailers: Retailer[];
};

export const VARIANTS: Variant[] = [
  {
    slug: "regular",
    name: "Regular Wash",
    tagline: "Everyday brilliance",
    headline: "Daily laundry, perfected.",
    description:
      "A balanced triple-action pod for everyday loads. Bright whites, vivid colors, and a clean fragrance that lingers — never overwhelms.",
    emoji: "🧺",
    palette: {
      brand: "#1E5BFF",
      brandDeep: "#0B2E99",
      accent: "#FFD24C",
      bg: "#F4F7FF",
      bgSoft: "#E6EEFF",
      surface: "#FFFFFF",
      ink: "#0A1230",
      inkSoft: "#3D456B",
    },
    benefits: [
      { title: "Everyday Cleaning", description: "Lifts dirt, oils and food stains in a single cycle." },
      { title: "Fresh Fragrance", description: "A clean cotton scent designed to fade gracefully." },
      { title: "Fabric Protection", description: "Color-lock technology keeps fibers and dyes intact." },
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
  },
  {
    slug: "baby",
    name: "Baby Care",
    tagline: "Gentle from the first wash",
    headline: "Soft on skin. Tough on tiny messes.",
    description:
      "Plant-derived surfactants and a hypoallergenic formula made for newborn skin. Dermatologically tested for the most delicate fabrics.",
    emoji: "🍼",
    palette: {
      brand: "#FF8FB1",
      brandDeep: "#B14B6F",
      accent: "#7BD7C6",
      bg: "#FFF4F7",
      bgSoft: "#FFE3EC",
      surface: "#FFFFFF",
      ink: "#3A1B27",
      inkSoft: "#6B4452",
    },
    benefits: [
      { title: "Gentle on Baby Clothes", description: "Plant-based enzymes that protect soft cottons and muslins." },
      { title: "Sensitive Skin Friendly", description: "Free from dyes, parabens and harsh perfumes." },
      { title: "Dermatologically Safe", description: "Tested under pediatric supervision for newborn use." },
    ],
    testimonials: [
      { name: "Meera J.", location: "Pune", quote: "No rashes, no irritation. My pediatrician approved immediately.", rating: 5 },
      { name: "Sneha R.", location: "Hyderabad", quote: "Smells like nothing — exactly what I wanted for my newborn.", rating: 5 },
      { name: "Kavya M.", location: "Chennai", quote: "Stains from feeds disappear. Worth every rupee.", rating: 5 },
    ],
    packs: [
      { sku: "BABY20", size: 20, price: 549, perWash: 27.45, bestFor: "New parents", household: "Baby only loads", buyPath: "/buy/baby-20" },
      { sku: "BABY40", size: 40, price: 999, perWash: 24.98, bestFor: "Daily baby laundry", household: "Family with infant", buyPath: "/buy/baby-40" },
    ],
    retailers: [
      { name: "Amazon", url: "#" },
      { name: "Flipkart", url: "#" },
      { name: "Myntra", url: "#" },
      { name: "Zepto", url: "#" },
      { name: "Blinkit", url: "#" },
      { name: "Instamart", url: "#" },
    ],
  },
  {
    slug: "womens-inners",
    name: "Women's Inners",
    tagline: "Delicate, daily, dignified",
    headline: "Care your intimates actually deserve.",
    description:
      "pH-balanced and antibacterial. Designed for lingerie, lace and shapewear — preserving elasticity while keeping every fiber hygienically fresh.",
    emoji: "🌸",
    palette: {
      brand: "#7A3CFF",
      brandDeep: "#3D158F",
      accent: "#F2C6FF",
      bg: "#F7F2FF",
      bgSoft: "#ECDEFF",
      surface: "#FFFFFF",
      ink: "#1F1140",
      inkSoft: "#4A3B70",
    },
    benefits: [
      { title: "Delicate Fabric Care", description: "Protects lace, silk and elastic — wash after wash." },
      { title: "Odor Control", description: "Antibacterial action neutralises odor at the source." },
      { title: "Hygiene First", description: "Clinically tested formula for intimate apparel." },
    ],
    testimonials: [
      { name: "Ananya V.", location: "Bengaluru", quote: "My silk camisoles still look new. Game changer.", rating: 5 },
      { name: "Ritika S.", location: "Mumbai", quote: "Finally a detergent that respects lingerie.", rating: 4 },
      { name: "Tara D.", location: "Goa", quote: "Discreet fragrance and a genuinely clean feel.", rating: 5 },
    ],
    packs: [
      { sku: "WIN20", size: 20, price: 599, perWash: 29.95, bestFor: "Personal care loads", household: "1 person", buyPath: "/buy/womens-inners-20" },
      { sku: "WIN40", size: 40, price: 1099, perWash: 27.48, bestFor: "Weekly rotation", household: "1–2 people", buyPath: "/buy/womens-inners-40" },
    ],
    retailers: [
      { name: "Amazon", url: "#" },
      { name: "Flipkart", url: "#" },
      { name: "Myntra", url: "#" },
      { name: "Zepto", url: "#" },
      { name: "Blinkit", url: "#" },
      { name: "Instamart", url: "#" },
    ],
  },
  {
    slug: "socks",
    name: "Socks Care",
    tagline: "Odor, defeated",
    headline: "Sock-specific science. Seriously.",
    description:
      "An enzyme-loaded pod engineered for the toughest sweat odors and ground-in grime. Bring tired socks back to life.",
    emoji: "🧦",
    palette: {
      brand: "#0FBF8F",
      brandDeep: "#0A6E55",
      accent: "#FFE07A",
      bg: "#EFFBF6",
      bgSoft: "#D8F3E7",
      surface: "#FFFFFF",
      ink: "#0A2A22",
      inkSoft: "#3A5A50",
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
  },
  {
    slug: "sports",
    name: "Sports Wear",
    tagline: "Built for performance fabrics",
    headline: "Train hard. Wash smart.",
    description:
      "A technical pod tuned for moisture-wicking polyester, spandex and merino. Removes sweat, salts and odor without damaging fibers.",
    emoji: "🏃",
    palette: {
      brand: "#FF5722",
      brandDeep: "#A11800",
      accent: "#1F2937",
      bg: "#FFF3EF",
      bgSoft: "#FFDDD2",
      surface: "#FFFFFF",
      ink: "#1A0A05",
      inkSoft: "#5A2F22",
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
