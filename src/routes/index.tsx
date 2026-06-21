import { createFileRoute, Link } from "@tanstack/react-router";
import { VARIANTS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import smodLogo from "@/assets/smod-logo-white.png.asset.json";
import packFront from "@/assets/smod-pack-front.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMOD — Smart Pods. Powerful Clean." },
      { name: "description", content: "SMOD — the Smart Pod. Smart dosing, Maximum clean, Optimised care, Dependable freshness." },
      { property: "og:title", content: "SMOD — Smart Pods for every load" },
      { property: "og:description", content: "Smart. Maximum. Optimised. Dependable." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

// Compact pillar tiles — icon-first, minimal copy
const PILLARS = [
  { letter: "S", word: "Smart", tag: "Dosing", svg: <PodIcon /> },
  { letter: "M", word: "Maximum", tag: "Clean", svg: <SplashIcon /> },
  { letter: "O", word: "Optimised", tag: "Care", svg: <FabricIcon /> },
  { letter: "D", word: "Dependable", tag: "Freshness", svg: <LeafIcon /> },
];

function PodIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12">
      <defs>
        <linearGradient id="podg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--brand)" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="44" height="44" rx="14" fill="url(#podg)" />
      <circle cx="24" cy="26" r="6" fill="white" opacity=".9" />
      <circle cx="42" cy="40" r="8" fill="white" opacity=".7" />
    </svg>
  );
}
function SplashIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="var(--brand)">
      <path d="M32 4c8 12 18 20 18 32a18 18 0 11-36 0c0-12 10-20 18-32z" />
      <circle cx="26" cy="40" r="4" fill="white" opacity=".6" />
    </svg>
  );
}
function FabricIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round">
      <path d="M8 20 Q16 12 24 20 T40 20 T56 20" />
      <path d="M8 34 Q16 26 24 34 T40 34 T56 34" />
      <path d="M8 48 Q16 40 24 48 T40 48 T56 48" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="var(--brand)">
      <path d="M52 8C28 8 12 24 12 44c0 5 1 9 3 12C18 38 32 24 52 20c-10 8-22 18-28 36 16 0 32-14 32-36V8z" />
    </svg>
  );
}

function PillarCard({ p }: { p: typeof PILLARS[number] }) {
  return (
    <article
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-xl"
      style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
    >
      <div aria-hidden className="pointer-events-none absolute -right-3 -top-5 text-[5rem] font-black leading-none opacity-[0.07]" style={{ color: "var(--brand)" }}>
        {p.letter}
      </div>
      <div className="relative shrink-0">{p.svg}</div>
      <div className="relative min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--brand)" }}>{p.word}</div>
        <h3 className="text-base font-black leading-tight">{p.tag}</h3>
      </div>
    </article>
  );
}

const STEPS = [
  { n: "01", t: "Drop", b: "One pod in the drum." },
  { n: "02", t: "Load", b: "Any cycle, any load." },
  { n: "03", t: "Done", b: "Deep clean. Zero mess." },
];

function Home() {
  return (
    <div
      style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen"
    >
      <Header />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)` }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, white 60%, transparent), transparent 60%)" }} />
          <div className="absolute right-10 top-40 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, white 70%, transparent), transparent 60%)" }} />
          <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 70%, transparent), transparent 60%)" }} />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-16 text-center text-white md:py-24">
          <img src={smodLogo.url} alt="SMOD" className="h-20 w-auto md:h-28" />
          <div className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/85">No mess, zero guesswork</div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] md:text-6xl">
            One pod. <span className="opacity-80">One wash.</span> <span style={{ color: "var(--accent)" }}>Powerful clean.</span>
          </h1>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link to="/regular" className="rounded-full bg-white px-7 py-3 text-sm font-bold shadow-lg transition-transform hover:scale-[1.03]" style={{ color: "var(--brand)" }}>
              Shop the range
            </Link>
            <a href="#pillars" className="rounded-full border border-white/40 px-7 py-3 text-sm font-bold text-white hover:bg-white/10">
              How it works
            </a>
          </div>
        </div>

        {/* trust strip — icon based */}
        <div className="relative border-t border-white/15 bg-black/10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/85 md:grid-cols-4">
            <div className="flex flex-col items-center gap-1"><span className="text-2xl">🐇</span>Cruelty Free</div>
            <div className="flex flex-col items-center gap-1"><span className="text-2xl">♻️</span>Recyclable</div>
            <div className="flex flex-col items-center gap-1"><span className="text-2xl">🇮🇳</span>Made in India</div>
            <div className="flex flex-col items-center gap-1"><span className="text-2xl">🌀</span>Top + Front Load</div>
          </div>
        </div>
      </section>

      {/* ============ SMOD WORDMARK INFOGRAPHIC ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>What it means</p>
        <div className="mt-6 flex flex-wrap items-end justify-center gap-2 text-5xl font-black md:text-7xl">
          <span style={{ color: "var(--brand)" }}>S</span>
          <span className="text-base font-bold opacity-60 md:text-xl">mart</span>
          <span style={{ color: "var(--brand)" }}>p</span>
          <span style={{ color: "var(--brand)" }}>O</span>
          <span style={{ color: "var(--brand)" }}>D</span>
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm font-medium" style={{ color: "var(--v-ink-soft)" }}>
          A tiny laboratory in every pod.
        </p>
      </section>

      {/* ============ FOUR PILLARS — pack at center, pillars radiating ============ */}
      <section id="pillars" className="relative overflow-hidden py-20" style={{ background: "var(--v-bg-soft)" }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>S · M · O · D</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Four pillars. One pod.</h2>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="order-2 grid grid-cols-2 gap-4 md:order-1 md:grid-cols-1">
              {PILLARS.slice(0, 2).map((p) => (
                <PillarCard key={p.letter} p={p} />
              ))}
            </div>

            <div className="relative order-1 flex justify-center md:order-2">
              <div aria-hidden className="absolute inset-0 -m-10 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent), transparent 70%)" }} />
              <div className="relative rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-8">
                <img src={packFront.url} alt="SMOD pack" className="block h-[280px] w-auto md:h-[420px]" />
              </div>
            </div>


            <div className="order-3 grid grid-cols-2 gap-4 md:grid-cols-1">
              {PILLARS.slice(2).map((p) => (
                <PillarCard key={p.letter} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS — visual flow ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>How it works</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Three steps. Zero mess.</h2>
        </div>
        <div className="relative grid gap-6 md:grid-cols-3">
          <div aria-hidden className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-px md:block" style={{ background: `repeating-linear-gradient(90deg, var(--brand) 0 8px, transparent 8px 16px)` }} />
          {STEPS.map((s) => (
            <div key={s.n} className="relative flex flex-col items-center text-center">
              <div className="grid h-24 w-24 place-items-center rounded-full text-2xl font-black text-white shadow-lg" style={{ background: `linear-gradient(135deg, var(--brand), var(--brand-deep))` }}>
                {s.n}
              </div>
              <h3 className="mt-5 text-xl font-black">{s.t}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>{s.b}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ============ VARIANTS ============ */}
      <section id="variants" className="py-16" style={{ background: "var(--v-bg-soft)" }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>The range</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">One pod for every load.</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VARIANTS.map((v) => (
              <Link
                key={v.slug}
                to={`/${v.slug}` as string}
                className="group relative overflow-hidden rounded-3xl border bg-white p-6 transition-transform hover:-translate-y-1"
                style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
              >
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl" style={{ background: "var(--brand)" }} />
                <div className="relative flex items-center gap-4">
                  <div className="text-5xl">{v.emoji}</div>
                  <div>
                    <h3 className="text-xl font-black">{v.name}</h3>
                    <p className="text-xs" style={{ color: "var(--v-ink-soft)" }}>From ₹{v.packs[0].price}</p>
                  </div>
                </div>
                <div className="relative mt-5 flex items-center justify-between">
                  <div className="flex gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--brand-deep)" }}>
                    {v.packs.map((p) => (
                      <span key={p.sku} className="rounded-full border px-2 py-1" style={{ borderColor: "color-mix(in oklab, var(--brand) 25%, transparent)" }}>
                        {p.size}
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-bold text-white transition-transform group-hover:translate-x-1" style={{ background: "var(--brand)" }}>Shop →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="relative overflow-hidden rounded-[2.5rem] p-10 text-center text-white md:p-16" style={{ background: `linear-gradient(135deg, var(--brand), var(--brand-deep))` }}>
          <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-30" style={{ background: "var(--accent)" }} />
          <div className="relative">
            <h2 className="text-3xl font-black md:text-5xl">Smarter wash. Starts here.</h2>
            <Link to="/regular" className="mt-6 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold shadow-lg transition-transform hover:scale-[1.03]" style={{ color: "var(--brand)" }}>
              Shop SMOD pods →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
