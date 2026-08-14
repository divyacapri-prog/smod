import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Variant } from "@/lib/variants";
import { paletteToCssVars } from "@/lib/variants";
import { track } from "@/lib/analytics";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyCTA } from "./StickyCTA";
import { QRCode } from "./QRCode";
import { ProductInformation } from "./ProductInformation";
import { WavePattern } from "./WavePattern";
import packFront from "@/assets/smod-pack-front.png";


const PURCHASE_BASE = typeof window !== "undefined" ? window.location.origin : "";

const WHY_PODS = [
  { icon: "⚖️", title: "Pre-measured", body: "Exactly one pod per load. No guesswork." },
  { icon: "✈️", title: "Travel friendly", body: "No spills — sealed film dissolves only in water." },
  { icon: "📦", title: "Easy storage", body: "Resealable ziplock pack, fits any laundry shelf." },
  { icon: "🛡️", title: "Anti-microbial", body: "Fights odor-causing bacteria, every wash." },
  { icon: "⭐", title: "Premium clean", body: "Triple-action enzymes per pod." },
];

const FAQS = [
  {
    q: "How many clothes per pod?",
    a: "One pod is calibrated for a standard load of up to 5 kg. For very large loads, use two.",
  },
  {
    q: "Is it suitable for front load machines?",
    a: "Yes. The film dissolves cleanly at all front-load temperatures.",
  },
  {
    q: "Is it suitable for top load machines?",
    a: "Yes. Place the pod into the empty drum before adding clothes for best results.",
  },
  {
    q: "Are pods safe for fabrics?",
    a: "Absolutely. Each variant is tuned to its target fabric type — never abrasive.",
  },
  {
    q: "How should pods be stored?",
    a: "Keep the resealable pouch zipped, dry, and out of reach of children. Do not handle with wet hands.",
  },
];

export function VariantLanding({ variant }: { variant: Variant }) {
  const [p20, p40] = variant.packs;
  const [selectedPack, setSelectedPack] = useState<typeof p20>(p40);
  const productImage = variant.packaging.imageUrl || variant.packaging.imageFrontUrl || packFront;

  return (
    <div
      style={{ ...paletteToCssVars(variant.palette), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen scroll-smooth"
    >
      <Header />

      {/* HERO — Dropps-style PDP: large gallery left, sticky buy column right */}
      <section className="relative overflow-hidden" style={{ background: "var(--v-bg-soft)" }}>
        <div className="relative mx-auto grid max-w-[1400px] items-start gap-10 px-6 pt-28 pb-16 md:grid-cols-[1.1fr_1fr] md:gap-16 md:pt-36 md:pb-24">
          {/* Gallery */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[2.5rem]"
              style={{
                background: `linear-gradient(160deg, color-mix(in oklab, var(--brand) 18%, var(--v-bg-soft)), var(--v-bg-soft))`,
                aspectRatio: "4 / 5",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 60%)`,
                }}
              />
              <div className="relative flex h-full items-center justify-center p-10">
                <img
                  src={productImage}
                  alt={`SMOD ${variant.name} pack`}
                  className="max-h-[520px] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]"
                />
              </div>
              <span
                className="absolute left-6 top-6 rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur"
                style={{ background: "rgba(255,255,255,0.85)", color: "var(--brand)" }}
              >
                {variant.emoji} SMOD {variant.name}
              </span>
            </div>
          </div>

          {/* Buy column */}
          <div className="md:sticky md:top-28">
            <p className="eyebrow" style={{ color: "var(--brand)" }}>
              {variant.tagline}
            </p>
            <h1
              className="headline-2xl mt-4 text-balance text-4xl md:text-5xl lg:text-6xl"
              style={{ color: "var(--v-ink)" }}
            >
              {variant.headline}
            </h1>
            <p className="mt-5 text-base leading-relaxed md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
              {variant.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {variant.benefits.slice(0, 3).map((b) => (
                <span
                  key={b.title}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-bold"
                  style={{
                    borderColor: "color-mix(in oklab, var(--v-ink) 15%, transparent)",
                    color: "var(--v-ink)",
                    background: "var(--v-surface)",
                  }}
                >
                  ✓ {b.title}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.25em]" style={{ color: "var(--v-ink-soft)" }}>
                Choose your pack
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {variant.packs.map((pack) => {
                  const active = pack.sku === selectedPack.sku;
                  return (
                    <button
                      key={pack.sku}
                      onClick={() => setSelectedPack(pack)}
                      className="relative rounded-2xl border-2 p-4 text-left transition-all"
                      style={{
                        borderColor: active ? "var(--brand)" : "color-mix(in oklab, var(--v-ink) 12%, transparent)",
                        background: active
                          ? "color-mix(in oklab, var(--brand) 8%, var(--v-surface))"
                          : "var(--v-surface)",
                      }}
                    >
                      {pack.size === 40 && (
                        <span
                          className="absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white"
                          style={{ background: "var(--brand)" }}
                        >
                          Best value
                        </span>
                      )}
                      <p className="text-lg font-black" style={{ color: "var(--v-ink)" }}>
                        {pack.size} Pods
                      </p>
                      <p className="text-xs" style={{ color: "var(--v-ink-soft)" }}>
                        ₹{pack.perWash.toFixed(2)} / wash
                      </p>
                      <p className="mt-2 text-xl font-black" style={{ color: "var(--v-ink)" }}>
                        ₹{pack.price}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <Link
              to={selectedPack.buyPath}
              className="mt-6 flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-extrabold uppercase tracking-[0.2em] text-white shadow-xl transition-transform hover:scale-[1.01]"
              style={{ background: "var(--brand)", boxShadow: "0 20px 50px -20px var(--brand)" }}
            >
              Buy {selectedPack.size} Pods · ₹{selectedPack.price}
            </Link>
            <a
              href="#shop"
              className="mt-3 block text-center text-xs font-bold uppercase tracking-[0.25em] underline-offset-4 hover:underline"
              style={{ color: "var(--v-ink-soft)" }}
            >
              Or scan QR to purchase ↓
            </a>

            <div
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-5 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
                color: "var(--v-ink-soft)",
              }}
            >
              <span>🌀 Top + Front Load</span>
            </div>
          </div>
        </div>
      </section>


      {/* PRODUCT INFORMATION — auto-rendered from packaging artwork data */}
      <ProductInformation variant={variant} />

      {/* WHY PODS */}
      <Section
        eyebrow="Why pods"
        title="Detergent, Redesigned."
        subtitle="Six reasons our customers never go back to bottles or boxes."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_PODS.map((w) => (
            <div
              key={w.title}
              className="premium-card p-7 backdrop-blur-sm"
              style={{ background: "color-mix(in oklab, var(--v-surface) 70%, transparent)" }}
            >
              <div className="text-4xl">{w.icon}</div>
              <h3 className="mt-5 text-xl font-black" style={{ color: "var(--v-ink)" }}>
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
                {w.body}
              </p>
            </div>
          ))}
        </div>

      </Section>

      {/* BENEFITS */}
      <Section
        eyebrow={variant.name}
        title="Built specifically for this load."
        subtitle="Every variant has its own enzyme cocktail. This is what makes the difference."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {variant.benefits.map((b, i) => (
            <div
              key={b.title}
              className="relative overflow-hidden rounded-3xl p-7 text-white"
              style={{
                background:
                  i === 1
                    ? `linear-gradient(140deg, var(--brand), var(--brand-deep))`
                    : `linear-gradient(140deg, var(--brand-deep), var(--brand))`,
                boxShadow: "0 30px 60px -30px var(--brand)",
              }}
            >
              <div className="text-4xl font-black opacity-30">0{i + 1}</div>
              <h3 className="mt-4 text-2xl font-black">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-90">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPARISON */}
      <Section eyebrow="Compare packs" title="20 Pods vs 40 Pods" subtitle="Same formula. Different commitment.">
        <div
          className="overflow-hidden rounded-3xl border"
          style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: "var(--v-bg-soft)" }}>
                <th className="p-5 font-bold" style={{ color: "var(--v-ink)" }}>
                  Feature
                </th>
                <th className="p-5 font-bold" style={{ color: "var(--v-ink)" }}>
                  20 Pods
                </th>
                <th className="p-5 font-bold" style={{ color: "var(--v-ink)" }}>
                  40 Pods · Best value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 8%, transparent)" }}>
              <Row label="Number of washes" a="20" b="40" />
              <Row label="Cost per wash" a={`₹${p20.perWash.toFixed(2)}`} b={`₹${p40.perWash.toFixed(2)}`} />
              <Row label="Best for" a={p20.bestFor} b={p40.bestFor} />
              <Row label="Recommended household" a={p20.household} b={p40.household} />
              <Row label="Price" a={`₹${p20.price}`} b={`₹${p40.price}`} />
            </tbody>
          </table>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Reviews" title="What customers say." subtitle="Verified buyers, real loads.">
        <div className="grid gap-5 md:grid-cols-3">
          {variant.testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl border p-6"
              style={{
                borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
                background: "var(--v-surface)",
              }}
            >
              <div className="text-sm" style={{ color: "var(--accent)" }}>
                {"★".repeat(t.rating)}
                <span style={{ color: "color-mix(in oklab, var(--v-ink) 20%, transparent)" }}>
                  {"★".repeat(5 - t.rating)}
                </span>
              </div>
              <blockquote className="mt-3 text-base leading-relaxed" style={{ color: "var(--v-ink)" }}>
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold" style={{ color: "var(--v-ink-soft)" }}>
                {t.name} <span className="opacity-60">· {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Quick answers." subtitle="Everything you need before your first wash.">
        <div
          className="mx-auto max-w-3xl divide-y rounded-3xl border"
          style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}
        >
          {FAQS.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      {/* PURCHASE */}
      <Section
        id="shop"
        eyebrow="Shop"
        title="Pick your pack."
        subtitle="Scan the QR or tap to buy. Free shipping on every order."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <PurchaseCard variant={variant} pack={p20} />
          <PurchaseCard variant={variant} pack={p40} featured />
        </div>
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--v-ink-soft)" }}>
            Also available on
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {variant.retailers.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("retailer_click", { retailer: r.name, variant: variant.slug })}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: "color-mix(in oklab, var(--v-ink) 15%, transparent)",
                  color: "var(--v-ink)",
                  background: "var(--v-surface)",
                }}
              >
                {r.name}
                <ExternalLink size={14} style={{ color: "var(--brand)" }} />
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
      <StickyCTA variant={variant} />
      <div className="h-24" />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-pad mx-auto max-w-7xl px-5">
      <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
        <p className="eyebrow" style={{ color: "var(--brand)" }}>
          {eyebrow}
        </p>
        <h2
          className="headline-xl mt-4 text-balance text-4xl md:text-6xl"
          style={{ color: "var(--v-ink)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );

}

function Row({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr>
      <td className="p-5 font-semibold" style={{ color: "var(--v-ink)" }}>
        {label}
      </td>
      <td className="p-5" style={{ color: "var(--v-ink-soft)" }}>
        {a}
      </td>
      <td className="p-5 font-semibold" style={{ color: "var(--v-ink)" }}>
        {b}
      </td>
    </tr>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="block w-full px-6 py-5 text-left">
      <div className="flex items-center justify-between gap-4">
        <span className="font-bold" style={{ color: "var(--v-ink)" }}>
          {q}
        </span>
        <span
          className="text-xl transition-transform"
          style={{ color: "var(--brand)", transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
          {a}
        </p>
      )}
    </button>
  );
}


function PurchaseCard({
  variant,
  pack,
  featured,
}: {
  variant: Variant;
  pack: Variant["packs"][number];
  featured?: boolean;
}) {
  const fullUrl = `${PURCHASE_BASE}${pack.buyPath}`;
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border p-8"
      style={{
        borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
        background: featured ? `linear-gradient(160deg, var(--v-surface), var(--v-bg-soft))` : "var(--v-surface)",
        boxShadow: featured ? "0 30px 70px -30px var(--brand)" : "0 10px 30px -20px rgba(0,0,0,0.2)",
      }}
    >
      {featured && (
        <span
          className="absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ background: "var(--brand)" }}
        >
          Best value
        </span>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <div
            className="aspect-square rounded-2xl"
            style={{
              background: `radial-gradient(circle at 30% 30%, var(--accent), var(--brand) 60%, var(--brand-deep))`,
              boxShadow: "inset 0 -16px 28px rgba(0,0,0,0.25)",
            }}
          />
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink-soft)" }}>
              {variant.name}
            </p>
            <p className="mt-1 text-2xl font-black" style={{ color: "var(--v-ink)" }}>
              {pack.size} Pods
            </p>
            <p className="mt-1 text-3xl font-black" style={{ color: "var(--v-ink)" }}>
              ₹{pack.price}
            </p>
            <p className="text-xs" style={{ color: "var(--v-ink-soft)" }}>
              ≈ ₹{pack.perWash.toFixed(2)} per wash
            </p>
            <Link
              to={pack.buyPath}
              className="mt-4 inline-flex w-full justify-center rounded-full px-5 py-3 text-sm font-bold text-white"
              style={{ background: "var(--brand)" }}
            >
              Buy {pack.size} Pods
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <QRCode value={fullUrl} sku={pack.sku} fg="#000000" bg="#FFFFFF" />
          <p className="mt-3 text-center text-xs" style={{ color: "var(--v-ink-soft)" }}>
            Scan to buy
            <br />
            <span className="font-mono">{pack.buyPath}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
