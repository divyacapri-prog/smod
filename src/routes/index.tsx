import { createFileRoute, Link } from "@tanstack/react-router";
import { VARIANTS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WavePattern } from "@/components/site/WavePattern";
import { AbstractArt } from "@/components/site/AbstractArt";
import { HandDropPodIcon, LoadClothesIcon, SpinWashIcon, ScrollReplayIcon } from "@/components/site/StepIcons";
import smodLogo from "@/assets/smod-logo-white.png.asset.json";
import packFront from "@/assets/smod-pack-front.png.asset.json";
import innerwearPack from "@/assets/smod-innerwear-pack.jpg.asset.json";
import babyPack from "@/assets/smod-baby-pack.jpg.asset.json";

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

const VARIANT_IMAGES: Record<string, string> = {
  regular: packFront.url,
  socks: packFront.url,
  sports: packFront.url,
  innerwear: innerwearPack.url,
  baby: babyPack.url,
};

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

      {/* ============ HERO — Dropps-style split, oversized product imagery ============ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, color-mix(in oklab, var(--brand) 92%, white) 0%, color-mix(in oklab, var(--brand-deep) 85%, black) 100%)`,
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
          <div
            className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, white 35%, transparent), transparent 65%)",
            }}
          />
          <div
            className="absolute -bottom-32 right-0 h-[32rem] w-[32rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--accent) 60%, transparent), transparent 65%)",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-6 pt-28 pb-16 md:grid-cols-2 md:gap-8 md:pt-40 md:pb-28 lg:gap-16">
          <div className="text-white">
            <img src={smodLogo.url} alt="SMOD" className="h-14 w-auto md:h-16" />
            <h1 className="headline-2xl mt-8 text-balance text-[3rem] leading-[1] text-white sm:text-6xl md:text-[5rem] lg:text-[6.25rem]">
              Made Smart.
              <br />
              <span style={{ color: "var(--accent)" }}>Made to Clean.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
              Pre-measured pods — engineered without the mess of scoops, jugs or guesswork.
              One pod, one load, every time.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#range"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("range")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="rounded-full bg-white px-9 py-4 text-sm font-bold uppercase tracking-wider shadow-xl transition-transform hover:scale-[1.03]"
                style={{ color: "var(--brand)" }}
              >
                Shop all pods
              </a>
            </div>
          </div>

          {/* Oversized product image */}
          <div className="relative flex items-center justify-center md:justify-end">
            <div
              aria-hidden
              className="absolute inset-0 -m-12 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent), transparent 65%)",
              }}
            />
            <img
              src={packFront.url}
              alt="SMOD pod pack"
              className="relative h-[360px] w-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)] md:h-[520px] lg:h-[620px]"
            />
          </div>
        </div>

        {/* Trust strip — Dropps press-bar style */}
        <div className="relative" style={{ background: "color-mix(in oklab, var(--accent) 50%, white)" }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.25em]" style={{ color: "var(--brand-deep)" }}>
            <span>🐇 Cruelty Free</span>
            <span className="opacity-30">·</span>
            <span>♻️ Recyclable</span>
            <span className="opacity-30">·</span>
            <span>🌀 Top + Front Load</span>
            <span className="opacity-30">·</span>
            <span>🌿 Bio-degradable Film</span>
          </div>
        </div>
      </section>

      {/* ============ THE RANGE — surfaced immediately (storefront first) ============ */}
      <section id="range" className="section-pad-lg mx-auto max-w-[1400px] px-6">
        <div className="mb-16 text-center md:mb-24">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>
            Meet the SMOD crew
          </p>
          <h2 className="headline-2xl mt-5 text-4xl md:text-6xl lg:text-7xl">One pod for every load.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            Five formulas. Same pre-measured pod. Pick the load you're washing.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              to={`/${v.slug}` as string}
              className="product-tile group"
              style={
                {
                  "--tile-bg": v.palette.bgSoft,
                  "--brand": v.palette.brand,
                } as React.CSSProperties
              }
            >
              <div className="tile-image">
                <span
                  className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ background: "rgba(255,255,255,0.85)", color: v.palette.brand }}
                >
                  {v.emoji} {v.name}
                </span>
                <img src={VARIANT_IMAGES[v.slug] || packFront.url} alt={`SMOD ${v.name} pack`} />
              </div>
              <div className="tile-body">
                <h3 className="text-2xl font-black tracking-tight" style={{ color: v.palette.ink }}>
                  SMOD {v.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: v.palette.inkSoft }}>
                  {v.tagline}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: v.palette.ink }}>
                    From ₹{v.packs[0].price}
                  </span>
                  <span
                    className="rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white transition-transform group-hover:translate-x-1"
                    style={{ background: v.palette.brand }}
                  >
                    Shop →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 4-IN-1 EDITORIAL ============ */}
      <section
        className="section-pad-lg relative overflow-hidden"
        style={{ background: "var(--v-bg-soft)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-16 grid items-end gap-8 md:mb-20 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow" style={{ color: "var(--brand)" }}>
                One pod. Four actions.
              </p>
              <h2 className="headline-2xl mt-5 text-4xl md:text-6xl lg:text-7xl">
                4-in-1 laundry care.
              </h2>
            </div>
            <p className="text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
              Detergent, comforter, softener and anti-microbial — all sealed into a single pod.
              No bottles. No measuring. No mess.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", icon: "🧼", title: "Detergent", body: "Triple-enzyme deep clean lifts dirt and tough stains." },
              { n: "02", icon: "👕", title: "Comforter", body: "Restores softness and a cozy feel to every fibre." },
              { n: "03", icon: "🌸", title: "Softener", body: "Long-lasting fresh scent woven into your laundry." },
              { n: "04", icon: "🛡️", title: "Anti-microbial", body: "Fights odor-causing bacteria, wash after wash." },
            ].map((f) => (
              <div key={f.title} className="premium-card relative overflow-hidden p-8">
                <div
                  aria-hidden
                  className="absolute -right-2 -top-4 text-[5rem] font-black leading-none opacity-[0.08]"
                  style={{ color: "var(--brand)" }}
                >
                  {f.n}
                </div>
                <div className="relative text-5xl">{f.icon}</div>
                <h3 className="relative mt-6 text-xl font-black">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY PODS ============ */}
      <section className="section-pad-lg mx-auto max-w-[1400px] px-6">
        <div className="mb-16 grid items-end gap-8 md:mb-20 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow" style={{ color: "var(--brand)" }}>
              Why pods
            </p>
            <h2 className="headline-2xl mt-5 text-4xl md:text-6xl lg:text-7xl">Detergent, Redesigned.</h2>
          </div>
          <p className="text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            Six reasons our customers never go back to bottles or boxes.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "⚖️", title: "Pre-measured", body: "Exactly one pod per load. No guesswork." },
            { icon: "✈️", title: "Travel friendly", body: "No spills — sealed film dissolves only in water." },
            { icon: "📦", title: "Easy storage", body: "Resealable ziplock pack, fits any laundry shelf." },
            { icon: "🛡️", title: "Anti-microbial", body: "Fights odor-causing bacteria, every wash." },
            { icon: "🌿", title: "Bio-degradable", body: "Plant-derived film breaks down cleanly." },
            { icon: "⭐", title: "Premium clean", body: "Triple-action enzymes per pod." },
          ].map((w) => (
            <div key={w.title} className="premium-card p-8">
              <div className="text-5xl">{w.icon}</div>
              <h3 className="mt-6 text-xl font-black">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section
        className="section-pad-lg relative overflow-hidden"
        style={{ background: "var(--v-bg-soft)" }}
      >
        <WavePattern />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <div className="mb-16 text-center md:mb-24">
            <p className="eyebrow" style={{ color: "var(--brand)" }}>
              How it works
            </p>
            <h2 className="headline-2xl mt-5 text-4xl md:text-6xl lg:text-7xl">Three steps. Zero mess.</h2>
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
                <h3 className="mt-7 text-2xl font-black">{s.t}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>
                  {s.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO WE ARE — SMOD wordmark ============ */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-0">
          <AbstractArt opacity={0.45} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--v-bg) 70%, transparent) 0%, color-mix(in oklab, var(--v-bg) 30%, transparent) 50%, color-mix(in oklab, var(--v-bg) 80%, transparent) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 py-32 text-center md:py-48">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>
            Who we are
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center text-6xl font-black tracking-tight md:text-8xl lg:text-9xl">
            <span style={{ color: "var(--brand)" }}>SM</span>
            <span style={{ color: "#728198" }}>ART&nbsp;P</span>
            <span style={{ color: "var(--brand)" }}>OD</span>
          </div>
          <p className="mx-auto mt-8 max-w-md text-base font-medium md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            A tiny laboratory in every pod.
          </p>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section-pad mx-auto max-w-[1400px] px-6">
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-12 text-center text-white md:p-24"
          style={{
            background: `linear-gradient(135deg, var(--brand), var(--brand-deep))`,
            boxShadow: "0 60px 120px -50px var(--brand)",
          }}
        >
          <WavePattern color="rgba(255,255,255,0.18)" />
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-30"
            style={{ background: "var(--accent)" }}
          />
          <div className="relative pt-20 pb-6">
            <h2 className="headline-2xl text-4xl text-white md:text-6xl lg:text-7xl">Smarter wash. Starts here.</h2>
            <a
              href="#range"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("range")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-sm font-bold uppercase tracking-wider shadow-xl transition-transform hover:scale-[1.03]"
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
