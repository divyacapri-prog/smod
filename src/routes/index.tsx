import { createFileRoute, Link } from "@tanstack/react-router";
import { VARIANTS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WavePattern } from "@/components/site/WavePattern";
import { AbstractArt } from "@/components/site/AbstractArt";
import { HandDropPodIcon, LoadClothesIcon, SpinWashIcon, ScrollReplayIcon } from "@/components/site/StepIcons";
import smodLogo from "@/assets/smod-logo-white.png.asset.json";
import packFront from "@/assets/smod-pack-front.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMOD — Smart Pods. Powerful Clean." },
      {
        name: "description",
        content: "SMOD — the Smart Pod. Smart dosing, Maximum clean, Optimised care, Dependable freshness.",
      },
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
  { letter: "S", word: "Smart", tag: "Dosage", svg: <PodIcon /> },
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
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12"
      fill="none"
      stroke="var(--brand)"
      strokeWidth="3"
      strokeLinecap="round"
    >
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

function PillarCard({ p }: { p: (typeof PILLARS)[number] }) {
  return (
    <article
      className="premium-card group relative flex items-center gap-5 overflow-hidden p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-6 text-[6rem] font-black leading-none opacity-[0.07]"
        style={{ color: "var(--brand)" }}
      >
        {p.letter}
      </div>
      <div className="relative shrink-0">{p.svg}</div>
      <div className="relative min-w-0">
        <div className="eyebrow" style={{ color: "var(--brand)" }}>
          {p.word}
        </div>
        <h3 className="mt-1 text-lg font-black leading-tight">{p.tag}</h3>
      </div>
    </article>

  );
}

const STEPS = [
  { n: "01", t: "Drop", b: "One pod in the drum.", Icon: HandDropPodIcon },
  { n: "02", t: "Load", b: "Any cycle, any load.", Icon: LoadClothesIcon },
  { n: "03", t: "Done", b: "Deep clean. Zero mess.", Icon: SpinWashIcon },
];

function Home() {
  return (
    <div
      style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen scroll-smooth"
    >
      <Header />

      {/* ============ HERO ============ */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)` }}
      >
        <WavePattern edge="bottom" color="rgba(255,255,255,0.12)" height={140} />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div
            className="absolute -left-20 top-10 h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, color-mix(in oklab, white 60%, transparent), transparent 60%)",
            }}
          />
          <div
            className="absolute right-10 top-40 h-40 w-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, color-mix(in oklab, white 70%, transparent), transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 70%, transparent), transparent 60%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-24 text-center text-white md:py-40">
          <img src={smodLogo.url} alt="SMOD" className="h-24 w-auto md:h-32" />
          <h1 className="headline-xl max-w-4xl text-5xl text-white md:text-7xl lg:text-[5.5rem]">
            No mess, <span style={{ color: "var(--accent)" }}>zero guesswork.</span>
          </h1>
          <p className="max-w-xl text-base text-white/80 md:text-lg">
            Smart dosing. Maximum clean. Optimised care. Dependable freshness.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href="#variants"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("variants")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="rounded-full bg-white px-8 py-4 text-sm font-bold shadow-xl transition-transform hover:scale-[1.03]"
              style={{ color: "var(--brand)" }}
            >
              Shop the range
            </a>
            <a
              href="#pillars"
              className="rounded-full border border-white/40 px-8 py-4 text-sm font-bold text-white hover:bg-white/10"
            >
              How it works
            </a>
          </div>
        </div>


        {/* trust strip — icon based */}
        <div className="relative border-t border-white/15 bg-black/10">
          <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-5 py-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🐇</span>Cruelty Free
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">♻️</span>Recyclable
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🌀</span>Top + Front Load
            </div>
          </div>
        </div>
      </section>

      {/* ============ SMOD WORDMARK INFOGRAPHIC ============ */}
      <section className="relative overflow-hidden">
        {/* Abstract packaging-inspired artwork as backdrop */}
        <div aria-hidden className="absolute inset-0 -z-0">
          <AbstractArt opacity={0.55} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--v-bg) 70%, transparent) 0%, color-mix(in oklab, var(--v-bg) 30%, transparent) 50%, color-mix(in oklab, var(--v-bg) 80%, transparent) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-32 text-center md:py-44">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>
            Who we are
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center text-6xl font-black tracking-tight md:text-8xl">
            <span style={{ color: "var(--brand)" }}>SM</span>
            <span style={{ color: "#728198" }}>ART&nbsp;P</span>
            <span style={{ color: "var(--brand)" }}>OD</span>
          </div>
          <p className="mx-auto mt-6 max-w-md text-base font-medium md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            A tiny laboratory in every pod.
          </p>
        </div>

      </section>

      {/* ============ FOUR PILLARS — pack at center, pillars radiating ============ */}
      <section id="pillars" className="section-pad-lg relative overflow-hidden" style={{ background: "var(--v-bg-soft)" }}>
        <WavePattern />
        <div className="relative mx-auto max-w-7xl px-5">
          <div className="mb-16 text-center md:mb-20">
            <p className="eyebrow" style={{ color: "var(--v-ink)" }}>
              S · M · O · D
            </p>
            <h2 className="headline-xl mt-4 text-4xl md:text-6xl">Four pillars. One pod.</h2>
          </div>


          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="order-2 grid grid-cols-2 gap-4 md:order-1 md:grid-cols-1">
              {PILLARS.slice(0, 2).map((p) => (
                <PillarCard key={p.letter} p={p} />
              ))}
            </div>

            <div className="relative order-1 flex justify-center md:order-2">
              <div
                aria-hidden
                className="absolute inset-0 -m-10 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent), transparent 70%)",
                }}
              />
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
      <section className="section-pad mx-auto max-w-7xl px-5">
        <div className="mb-16 text-center md:mb-20">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>
            How it works
          </p>
          <h2 className="headline-xl mt-4 text-4xl md:text-6xl">Three steps. Zero mess.</h2>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16%] right-[16%] top-24 hidden h-px md:block"
            style={{ background: `repeating-linear-gradient(90deg, var(--brand) 0 8px, transparent 8px 16px)` }}
          />
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative flex flex-col items-center text-center">
              <div
                className="relative grid h-48 w-48 place-items-center rounded-full shadow-xl ring-1 ring-black/5"
                style={{ background: "var(--v-surface)", color: "var(--brand-deep)" }}
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white"
                  style={{ background: `linear-gradient(135deg, var(--brand), var(--brand-deep))` }}
                >
                  Step {i + 1}
                </span>
                {s.n === "03" ? (
                  <s.Icon className="h-32 w-32" />
                ) : (
                  <ScrollReplayIcon Icon={s.Icon} className="h-32 w-32" />
                )}
              </div>
              <h3 className="mt-6 text-xl font-black">{s.t}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>
                {s.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 4-IN-1 CONCEPT ============ */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: `linear-gradient(135deg, var(--v-bg-soft), var(--v-surface))` }}
      >
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>
              One pod. Four actions.
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">4-in-1 laundry care.</h2>
            <p className="mt-3 text-base" style={{ color: "var(--v-ink-soft)" }}>
              Detergent, comforter, softener and antimicrobial — all sealed into a single pod.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                icon: "🧼",
                title: "Detergent",
                body: "Triple-enzyme deep clean lifts dirt and tough stains.",
              },
              { n: "02", icon: "👕", title: "Comforter", body: "Restores softness and a cozy feel to every fibre." },
              { n: "03", icon: "🌸", title: "Softener", body: "Long-lasting fresh scent woven into your laundry." },
              { n: "04", icon: "🛡️", title: "Anti-microbial", body: "Fights odor-causing bacteria, wash after wash." },
            ].map((f) => (
              <div
                key={f.title}
                className="relative overflow-hidden rounded-3xl border bg-white p-6 transition-transform hover:-translate-y-1"
                style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
              >
                <div
                  aria-hidden
                  className="absolute -right-2 -top-4 text-[4rem] font-black leading-none opacity-[0.08]"
                  style={{ color: "var(--brand)" }}
                >
                  {f.n}
                </div>
                <div className="relative text-3xl">{f.icon}</div>
                <h3 className="relative mt-3 text-lg font-black">{f.title}</h3>
                <p className="relative mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY PODS ============ */}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>
            Why pods
          </p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Detergent, Redesigned.</h2>
          <p className="mt-3 text-base" style={{ color: "var(--v-ink-soft)" }}>
            Six reasons our customers never go back to bottles or boxes.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "⚖️", title: "Pre-measured", body: "Exactly one pod per load. No guesswork." },
            { icon: "✈️", title: "Travel friendly", body: "No spills — sealed film dissolves only in water." },
            { icon: "📦", title: "Easy storage", body: "Resealable ziplock pack, fits any laundry shelf." },
            { icon: "🛡️", title: "Anti-microbial", body: "Fights odor-causing bacteria, every wash." },
            { icon: "🌿", title: "Bio-degradable", body: "Plant-derived film breaks down cleanly." },
            { icon: "⭐", title: "Premium clean", body: "Triple-action enzymes per pod." },
          ].map((w) => (
            <div
              key={w.title}
              className="rounded-3xl border bg-white p-6 transition-transform hover:-translate-y-1"
              style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
            >
              <div className="text-3xl">{w.icon}</div>
              <h3 className="mt-3 text-lg font-bold">{w.title}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ VARIANTS ============ */}
      <section
        id="variants"
        className="relative overflow-hidden pt-32 pb-16"
        style={{ background: "var(--v-bg-soft)" }}
      >
        <WavePattern />
        <div className="relative mx-auto max-w-7xl px-5">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--v-ink)" }}>
              The range
            </p>
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
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
                  style={{ background: "var(--brand)" }}
                />
                <div className="relative flex items-center gap-4">
                  <div className="text-5xl">{v.emoji}</div>
                  <div>
                    <h3 className="text-xl font-black">{v.name}</h3>
                    <p className="text-xs" style={{ color: "var(--v-ink-soft)" }}>
                      From ₹{v.packs[0].price}
                    </p>
                  </div>
                </div>
                <div className="relative mt-5 flex items-center justify-between">
                  <div
                    className="flex gap-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--brand-deep)" }}
                  >
                    {v.packs.map((p) => (
                      <span
                        key={p.sku}
                        className="rounded-full border px-2 py-1"
                        style={{ borderColor: "color-mix(in oklab, var(--brand) 25%, transparent)" }}
                      >
                        {p.size}
                      </span>
                    ))}
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold text-white transition-transform group-hover:translate-x-1"
                    style={{ background: "var(--brand)" }}
                  >
                    Shop →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-10 text-center text-white md:p-16"
          style={{ background: `linear-gradient(135deg, var(--brand), var(--brand-deep))` }}
        >
          <WavePattern color="rgba(255,255,255,0.18)" />
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-30"
            style={{ background: "var(--accent)" }}
          />
          <div className="relative pt-24 pb-8">
            <h2 className="text-3xl font-black md:text-5xl">Smarter wash. Starts here.</h2>
            <a
              href="#variants"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("variants")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-6 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold shadow-lg transition-transform hover:scale-[1.03]"
              style={{ color: "var(--brand)" }}
            >
              Shop SMOD pods →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
