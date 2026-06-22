import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WavePattern } from "@/components/site/WavePattern";
import { BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — SMOD" },
      { name: "description", content: "Free shipping across India, easy 7-day returns, and how to reach support for SMOD laundry pods." },
      { property: "og:title", content: "Shipping & Returns — SMOD" },
      { property: "og:description", content: "Free shipping, 7-day returns, and damaged-on-arrival replacements for SMOD pods." },
    ],
  }),
  component: ShippingPage,
});

const SHIPPING = [
  { t: "Free standard shipping", b: "On every order across India. No minimum cart value." },
  { t: "Dispatch in 24 hours", b: "Orders placed before 4 pm IST ship the same business day." },
  { t: "Delivery in 3–7 days", b: "Metros in 3–4 days, rest of India in 5–7 days via our courier partners." },
  { t: "Order tracking", b: "You'll get an email and SMS with a tracking link as soon as we hand off the pack." },
];

const RETURNS = [
  { t: "7-day easy returns", b: "If the pouch is unopened and seal intact, we'll pick it up and refund in full." },
  { t: "Damaged on arrival", b: "Send a photo within 48 hours of delivery — we'll replace the pack at no cost." },
  { t: "Wrong item shipped", b: "We cover the reverse pickup and ship the right variant on priority." },
  { t: "Refund timeline", b: "Refunds are processed within 5 business days of pickup, to the original payment method." },
];

function ShippingPage() {
  return (
    <div style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }} className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)` }}>
        <WavePattern edge="bottom" height={140} />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-28 text-center text-white md:pt-28">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>Shipping & Returns</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Fast, free, no fine print.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Every SMOD order ships free across India. If something arrives wrong, we make it right.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">Shipping</h2>
            <div className="mt-6 space-y-4">
              {SHIPPING.map((s) => (
                <Card key={s.t} t={s.t} b={s.b} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black md:text-3xl">Returns</h2>
            <div className="mt-6 space-y-4">
              {RETURNS.map((s) => (
                <Card key={s.t} t={s.t} b={s.b} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border p-6 md:p-8" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-bg-soft)" }}>
          <h3 className="text-xl font-black">How to start a return</h3>
          <ol className="mt-4 space-y-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>
            <li>1. Email <a className="font-bold underline" style={{ color: "var(--brand)" }} href="mailto:hello@smod.in">hello@smod.in</a> with your order ID within 7 days of delivery.</li>
            <li>2. Share a photo if the pouch is damaged or the wrong variant was sent.</li>
            <li>3. We schedule a free reverse pickup within 2 business days.</li>
            <li>4. Refund or replacement is processed once the pack is collected.</li>
          </ol>
          <p className="mt-4 text-xs" style={{ color: "var(--v-ink-soft)" }}>
            Note: For hygiene reasons, opened or partially used packs are not eligible for return unless the product is defective.
          </p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-bold text-white" style={{ background: "var(--brand)" }}>
            Contact support
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Card({ t, b }: { t: string; b: string }) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
      <h3 className="text-base font-black" style={{ color: "var(--v-ink)" }}>{t}</h3>
      <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>{b}</p>
    </div>
  );
}
