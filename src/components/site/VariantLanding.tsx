import { Link } from "@tanstack/react-router";
import { useState, type ReactElement } from "react";
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
import { HandDropPodIcon, LoadClothesIcon, SpinWashIcon } from "./StepIcons";

const PURCHASE_BASE = typeof window !== "undefined" ? window.location.origin : "";

const WHY_PODS = [
  { icon: "⚖️", title: "Pre-measured", body: "Exactly one pod per load. No guesswork." },
  { icon: "🧴", title: "No spills", body: "Sealed film dissolves only in water." },
  { icon: "📦", title: "Easy storage", body: "Resealable ziplock pack, fits any laundry shelf." },
  { icon: "✈️", title: "Travel friendly", body: "TSA-friendly. Hotel-ready." },
  { icon: "🌿", title: "Eco conscious", body: "Plant-based, biodegradable formula." },
  { icon: "⭐", title: "Premium clean", body: "Triple-action enzymes per pod." },
];

const HOW: { title: string; body: string; Icon: (p: { className?: string }) => JSX.Element }[] = [
  { title: "Drop a pod", body: "One pod into the empty drum.", Icon: HandDropPodIcon },
  { title: "Load clothes", body: "Add laundry directly on top.", Icon: LoadClothesIcon },
  { title: "Start the wash", body: "Any cycle. The film dissolves cleanly.", Icon: SpinWashIcon },
];

const FAQS = [
  { q: "How many clothes per pod?", a: "One pod is calibrated for a standard load of up to 5 kg. For very large loads, use two." },
  { q: "Is it suitable for front load machines?", a: "Yes. The film dissolves cleanly at all front-load temperatures." },
  { q: "Is it suitable for top load machines?", a: "Yes. Place the pod into the empty drum before adding clothes for best results." },
  { q: "Are pods safe for fabrics?", a: "Absolutely. Each variant is tuned to its target fabric type — never abrasive." },
  { q: "How should pods be stored?", a: "Keep the tub closed, dry, and out of reach of children. Do not handle with wet hands." },
];

export function VariantLanding({ variant }: { variant: Variant }) {
  const [p20, p40] = variant.packs;

  return (
    <div style={{ ...paletteToCssVars(variant.palette), background: "var(--v-bg)", color: "var(--v-ink)" }} className="min-h-screen scroll-smooth">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <WavePattern />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: `radial-gradient(closest-side, var(--brand), transparent 70%)` }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-md" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 15%, transparent)", color: "var(--v-ink)", background: "color-mix(in oklab, var(--v-surface) 60%, transparent)" }}>
              <span>{variant.emoji}</span> {variant.tagline}
            </div>
            <h1 className="mt-5 text-balance text-5xl font-black leading-[1.02] tracking-tight md:text-7xl" style={{ color: "var(--v-ink)" }}>
              {variant.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
              {variant.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
                style={{ background: "var(--brand)", boxShadow: "0 15px 40px -15px var(--brand)" }}
              >
                Buy Now
              </a>
              <a href="#how" className="rounded-full border px-6 py-3 text-sm font-bold transition-colors" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 20%, transparent)", color: "var(--v-ink)" }}>
                How it works
              </a>
            </div>
            <div className="mt-8 flex gap-3">
              <PackPill label="20 Pods" price={p20.price} to={p20.buyPath} />
              <PackPill label="40 Pods" price={p40.price} to={p40.buyPath} featured />
            </div>
          </div>

          {/* Product visual */}
          <div className="relative">
            <div
              className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] border p-8"
              style={{
                background: `linear-gradient(135deg, var(--v-surface), var(--v-bg-soft))`,
                borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
                boxShadow: "0 40px 80px -30px color-mix(in oklab, var(--brand) 50%, transparent)",
              }}
            >
              <div className="absolute inset-0" aria-hidden style={{ background: `radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--brand) 35%, transparent), transparent 55%)` }} />
              <div className="relative flex h-full flex-col items-center justify-center gap-6">
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square w-20 rounded-2xl"
                      style={{
                        background: i % 2 === 0
                          ? `radial-gradient(circle at 30% 30%, var(--accent), var(--brand))`
                          : `radial-gradient(circle at 70% 30%, var(--brand), var(--brand-deep))`,
                        boxShadow: "inset 0 -8px 16px rgba(0,0,0,0.15), 0 6px 14px rgba(0,0,0,0.12)",
                      }}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--v-ink-soft)" }}>SMOD · {variant.name}</p>
                  <p className="mt-1 text-2xl font-black" style={{ color: "var(--v-ink)" }}>{variant.emoji} {variant.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT INFORMATION — auto-rendered from packaging artwork data */}
      <ProductInformation variant={variant} />

      {/* WHY PODS */}
      <Section eyebrow="Why pods" title="Detergent, redesigned." subtitle="Six reasons our customers never go back to bottles or boxes.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_PODS.map((w) => (
            <div key={w.title} className="rounded-3xl border p-6 backdrop-blur-sm transition-transform hover:-translate-y-1" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "color-mix(in oklab, var(--v-surface) 70%, transparent)" }}>
              <div className="text-3xl">{w.icon}</div>
              <h3 className="mt-3 text-lg font-bold" style={{ color: "var(--v-ink)" }}>{w.title}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BENEFITS */}
      <Section eyebrow={variant.name} title="Built specifically for this load." subtitle="Every variant has its own enzyme cocktail. This is what makes the difference.">
        <div className="grid gap-5 md:grid-cols-3">
          {variant.benefits.map((b, i) => (
            <div
              key={b.title}
              className="relative overflow-hidden rounded-3xl p-7 text-white"
              style={{
                background: i === 1 ? `linear-gradient(140deg, var(--brand), var(--brand-deep))` : `linear-gradient(140deg, var(--brand-deep), var(--brand))`,
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

      {/* HOW IT WORKS */}
      <Section id="how" eyebrow="How it works" title="Four steps. Three minutes." subtitle="Less thinking, more clean clothes.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map((s) => (
            <div key={s.step} className="rounded-3xl border p-6" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
              <div className="font-mono text-sm font-bold" style={{ color: "var(--brand)" }}>STEP {s.step}</div>
              <h3 className="mt-2 text-xl font-bold" style={{ color: "var(--v-ink)" }}>{s.title}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPARISON */}
      <Section eyebrow="Compare packs" title="20 Pods vs 40 Pods" subtitle="Same formula. Different commitment.">
        <div className="overflow-hidden rounded-3xl border" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: "var(--v-bg-soft)" }}>
                <th className="p-5 font-bold" style={{ color: "var(--v-ink)" }}>Feature</th>
                <th className="p-5 font-bold" style={{ color: "var(--v-ink)" }}>20 Pods</th>
                <th className="p-5 font-bold" style={{ color: "var(--v-ink)" }}>40 Pods · Best value</th>
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
            <figure key={t.name} className="rounded-3xl border p-6" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
              <div className="text-sm" style={{ color: "var(--accent)" }}>
                {"★".repeat(t.rating)}<span style={{ color: "color-mix(in oklab, var(--v-ink) 20%, transparent)" }}>{"★".repeat(5 - t.rating)}</span>
              </div>
              <blockquote className="mt-3 text-base leading-relaxed" style={{ color: "var(--v-ink)" }}>"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold" style={{ color: "var(--v-ink-soft)" }}>
                {t.name} <span className="opacity-60">· {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Quick answers." subtitle="Everything you need before your first wash.">
        <div className="mx-auto max-w-3xl divide-y rounded-3xl border" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
          {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </Section>

      {/* PURCHASE */}
      <Section id="shop" eyebrow="Shop" title="Pick your pack." subtitle="Scan the QR or tap to buy. Free shipping on every order.">
        <div className="grid gap-6 md:grid-cols-2">
          <PurchaseCard variant={variant} pack={p20} />
          <PurchaseCard variant={variant} pack={p40} featured />
        </div>
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--v-ink-soft)" }}>Also available on</p>
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

function Section({ id, eyebrow, title, subtitle, children }: { id?: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--brand)" }}>{eyebrow}</p>
        <h2 className="mt-3 text-balance text-4xl font-black tracking-tight md:text-5xl" style={{ color: "var(--v-ink)" }}>{title}</h2>
        {subtitle && <p className="mt-3 text-base" style={{ color: "var(--v-ink-soft)" }}>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Row({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr>
      <td className="p-5 font-semibold" style={{ color: "var(--v-ink)" }}>{label}</td>
      <td className="p-5" style={{ color: "var(--v-ink-soft)" }}>{a}</td>
      <td className="p-5 font-semibold" style={{ color: "var(--v-ink)" }}>{b}</td>
    </tr>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="block w-full px-6 py-5 text-left">
      <div className="flex items-center justify-between gap-4">
        <span className="font-bold" style={{ color: "var(--v-ink)" }}>{q}</span>
        <span className="text-xl transition-transform" style={{ color: "var(--brand)", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </div>
      {open && <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>{a}</p>}
    </button>
  );
}

function PackPill({ label, price, to, featured }: { label: string; price: number; to: string; featured?: boolean }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
      style={
        featured
          ? { background: "var(--v-ink)", color: "var(--v-surface)", borderColor: "var(--v-ink)" }
          : { background: "var(--v-surface)", color: "var(--v-ink)", borderColor: "color-mix(in oklab, var(--v-ink) 15%, transparent)" }
      }
    >
      <span>{label}</span>
      <span className="opacity-70">₹{price}</span>
    </Link>
  );
}

function PurchaseCard({ variant, pack, featured }: { variant: Variant; pack: Variant["packs"][number]; featured?: boolean }) {
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
        <span className="absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: "var(--brand)" }}>
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
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink-soft)" }}>{variant.name}</p>
            <p className="mt-1 text-2xl font-black" style={{ color: "var(--v-ink)" }}>{pack.size} Pods</p>
            <p className="mt-1 text-3xl font-black" style={{ color: "var(--v-ink)" }}>₹{pack.price}</p>
            <p className="text-xs" style={{ color: "var(--v-ink-soft)" }}>≈ ₹{pack.perWash.toFixed(2)} per wash</p>
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
          <QRCode value={fullUrl} sku={pack.sku} fg={variant.palette.brandDeep} bg={variant.palette.surface} />
          <p className="mt-3 text-center text-xs" style={{ color: "var(--v-ink-soft)" }}>
            Scan to buy<br />
            <span className="font-mono">{pack.buyPath}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
