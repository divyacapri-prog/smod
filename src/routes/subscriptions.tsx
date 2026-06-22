import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WavePattern } from "@/components/site/WavePattern";
import { BRAND_PALETTE, paletteToCssVars, VARIANTS } from "@/lib/variants";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "Subscribe & Save — SMOD" },
      { name: "description", content: "Subscribe to SMOD laundry pods and save up to 20%. Skip, pause or cancel any time. Free delivery on every refill." },
      { property: "og:title", content: "Subscribe & Save — SMOD" },
      { property: "og:description", content: "Up to 20% off, free shipping, flexible refills. Cancel any time." },
    ],
  }),
  component: SubscriptionsPage,
});

const FREQUENCIES = [
  { id: "1m", label: "Every month", discount: 10, blurb: "Best for couples & small households." },
  { id: "2m", label: "Every 2 months", discount: 15, blurb: "Most popular. Right for a family of 3–4." },
  { id: "3m", label: "Every 3 months", discount: 20, blurb: "Biggest savings. Stock up and forget." },
];

const PERKS = [
  { icon: "💸", t: "Save up to 20%", b: "Subscriber pricing on every refill, automatically." },
  { icon: "🚚", t: "Free shipping always", b: "No minimum order, no shipping surcharges." },
  { icon: "🗓️", t: "Skip or reschedule", b: "Going on holiday? Move your next refill in one tap." },
  { icon: "🔁", t: "Swap variants any time", b: "Switch between Regular, Sports and Socks before each refill." },
  { icon: "🚫", t: "Cancel any time", b: "No lock-in, no penalty. End the plan from your account." },
  { icon: "🎁", t: "Member-only drops", b: "First access to new variants and limited launches." },
];

const FAQ = [
  { q: "When is my subscription charged?", a: "We charge your saved payment method 2 days before each refill ships, so you can edit or skip it before billing." },
  { q: "Can I change the variant or pack size?", a: "Yes. Log in to your account and update the variant or 20/40 pod pack before your next refill date." },
  { q: "What if I have too many pods?", a: "Skip the next delivery, push it out by a month, or pause the plan entirely — all from your account." },
  { q: "Is there a minimum commitment?", a: "No. You can cancel at any time from your account, including after the first delivery." },
];

function SubscriptionsPage() {
  const [freq, setFreq] = useState("2m");
  const selected = FREQUENCIES.find((f) => f.id === freq)!;

  return (
    <div style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }} className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)` }}>
        <WavePattern edge="bottom" height={140} />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-28 text-center text-white md:pt-28">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>Subscribe & Save</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Never run out of pods.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Pick a frequency, save up to 20%, and let SMOD show up at your door right when you need a refill.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--brand)" }}>Choose your rhythm</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">How often do you do laundry?</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {FREQUENCIES.map((f) => {
            const active = f.id === freq;
            return (
              <button
                key={f.id}
                onClick={() => setFreq(f.id)}
                className="rounded-3xl border p-6 text-left transition-transform hover:-translate-y-1"
                style={{
                  borderColor: active ? "var(--brand)" : "color-mix(in oklab, var(--v-ink) 10%, transparent)",
                  background: active ? "color-mix(in oklab, var(--brand) 8%, var(--v-surface))" : "var(--v-surface)",
                  boxShadow: active ? "0 20px 50px -25px var(--brand)" : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--v-ink-soft)" }}>{f.label}</p>
                  <span className="rounded-full px-2 py-1 text-[10px] font-black text-white" style={{ background: "var(--brand)" }}>-{f.discount}%</span>
                </div>
                <p className="mt-4 text-2xl font-black" style={{ color: "var(--v-ink)" }}>Save {f.discount}%</p>
                <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>{f.blurb}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border p-6 md:p-8" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-bg-soft)" }}>
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--brand)" }}>Pick your starting variant</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {VARIANTS.map((v) => (
              <Link
                key={v.slug}
                to={`/${v.slug}` as string}
                className="flex items-center gap-3 rounded-2xl border bg-white p-4 transition-transform hover:-translate-y-0.5"
                style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
              >
                <span className="text-3xl">{v.emoji}</span>
                <div>
                  <p className="text-sm font-black" style={{ color: "var(--v-ink)" }}>{v.name}</p>
                  <p className="text-xs" style={{ color: "var(--v-ink-soft)" }}>
                    From ₹{Math.round(v.packs[0].price * (1 - selected.discount / 100))} with {selected.label.toLowerCase()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs" style={{ color: "var(--v-ink-soft)" }}>
            Payments are handled at checkout — subscription billing goes live with our payments rollout.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden pt-32 pb-16" style={{ background: "var(--v-bg-soft)" }}>
        <WavePattern />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--v-ink)" }}>Why subscribe</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Smarter than re-ordering.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((p) => (
              <div key={p.t} className="rounded-3xl border p-6" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
                <div className="text-3xl">{p.icon}</div>
                <h3 className="mt-3 text-lg font-black" style={{ color: "var(--v-ink)" }}>{p.t}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--brand)" }}>FAQ</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Subscription, demystified.</h2>
        </div>
        <div className="divide-y rounded-3xl border" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
          {FAQ.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold" style={{ color: "var(--v-ink)" }}>
                {f.q}
                <span className="text-xl transition-transform group-open:rotate-45" style={{ color: "var(--brand)" }}>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
