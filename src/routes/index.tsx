import { createFileRoute, Link } from "@tanstack/react-router";
import { BEST_SELLERS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ClaimRotator } from "@/components/site/ClaimRotator";
import { HeroWaterFX } from "@/components/site/HeroWaterFX";
import { ProductTileGrid } from "@/components/site/ProductTiles";
import { PodIcon, ClothIcon, SoftenerIcon, ShieldIcon } from "@/components/site/FeatureIcons";
import { Splash } from "@/components/site/Splash";
import packFront from "@/assets/pods-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMOD — Smart Pods. Powerful Clean." },
      {
        name: "description",
        content:
          "SMOD — the Smart Pod. Smart dosing, Maximum clean, Optimised care, Dependable freshness.",
      },
      { property: "og:title", content: "SMOD — Smart Pods for every load" },
      { property: "og:description", content: "Smart. Maximum. Optimised. Dependable." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const FOUR_IN_ONE = [
  { Icon: PodIcon, title: "Detergent", sub: "Triple-enzyme deep clean",
    tint: "#E8ECFA", ink: "#2A3A86", art: "linear-gradient(160deg,#EEF1FC,#DCE3F7)" },
  { Icon: ClothIcon, title: "Comforter", sub: "Softness restored",
    tint: "#F3ECF8", ink: "#6B4C9A", art: "linear-gradient(160deg,#F6EFFB,#E7DCF3)" },
  { Icon: SoftenerIcon, title: "Softener", sub: "Long-lasting freshness",
    tint: "#FBEDF3", ink: "#A8477A", art: "linear-gradient(160deg,#FDF1F6,#F4DEE9)" },
  { Icon: ShieldIcon, title: "Anti-microbial", sub: "Odor-causing bacteria, gone",
    tint: "#E6F3EF", ink: "#1F7A63", art: "linear-gradient(160deg,#EDF7F4,#D8ECE5)" },
];

function Home() {
  return (
    <div
      style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen scroll-smooth"
    >
      <Splash />
      <Header />

      {/* ============ HERO ============ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `
            radial-gradient(65% 55% at 82% 18%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 72%),
            linear-gradient(160deg, color-mix(in oklab, var(--brand) 92%, white) 0%, color-mix(in oklab, var(--brand-deep) 90%, black) 100%)`,
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <svg className="absolute -right-24 bottom-0 h-[40rem] w-[40rem] opacity-[0.12]" viewBox="0 0 200 200" fill="none">
            <path
              d="M52,-58C66,-46,75,-28,77,-9C79,10,74,30,62,45C50,60,31,70,11,73C-9,76,-30,72,-46,61C-62,50,-72,32,-75,12C-78,-8,-74,-29,-62,-43C-50,-57,-30,-64,-10,-67C10,-70,30,-69,52,-58Z"
              transform="translate(100 100)"
              fill="color-mix(in oklab, white 60%, transparent)"
            />
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-5 pb-14 pt-10 sm:px-6 md:grid-cols-[1fr_1.05fr] md:gap-6 md:pb-28 md:pt-20">
          {/* Text — no logo here; the header already carries the mark */}
          <div className="text-white">
            <p className="text-[15px] font-black uppercase tracking-[0.16em] md:text-[20px]" style={{ color: "var(--accent)" }}>
              Detergent, redesigned
            </p>

            <ClaimRotator />

            <p className="mt-3 text-lg font-bold text-white/90 md:text-xl">No measure, no mess.</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/75">
              <span className="text-xs uppercase tracking-[0.18em] text-white/55">Replaces</span>
              <span className="line-through decoration-white/40">measuring cups</span>
              <span className="line-through decoration-white/40">powder scoops</span>
              <span className="line-through decoration-white/40">liquid jugs</span>
              <span aria-hidden className="text-white/50">→</span>
              <span className="font-bold text-white">one pod.</span>
            </div>

            <div className="mt-9">
              <Link
                to="/shop"
                className="inline-block rounded-full bg-white px-9 py-4 text-sm font-bold uppercase tracking-wider shadow-xl transition-transform hover:scale-[1.03]"
                style={{ color: "var(--brand)" }}
              >
                Shop all pods
              </Link>
            </div>
          </div>

          {/* Original pod render, over splash and bubbles */}
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0 -m-10 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 62%)",
              }}
            />
            <div className="relative flex w-full items-center justify-center">
              <HeroWaterFX layer="back" />
              <img
                src={packFront}
                alt="SMOD pods"
                className="product-float relative z-[2] h-[230px] w-auto sm:h-[300px] md:h-[420px] lg:h-[480px]"
              />
              <HeroWaterFX layer="front" />
            </div>
          </div>
        </div>

        <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="relative block h-12 w-full md:h-20" style={{ color: "var(--v-bg)" }}>
          <path d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </section>

      {/* ============ BEST SELLERS ============ */}
      <section id="best-sellers" className="section-pad relative overflow-hidden scroll-mt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="depth-blob depth-float-slow" style={{ top: "8%", left: "-6%", width: "26rem", height: "26rem", background: "color-mix(in oklab, var(--brand) 22%, transparent)" }} />
          <div className="depth-blob depth-float" style={{ bottom: "10%", right: "-4%", width: "22rem", height: "22rem", background: "color-mix(in oklab, var(--accent) 60%, transparent)" }} />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>Best sellers</p>
          <h2 className="headline-2xl mt-4 text-3xl sm:text-4xl md:text-6xl">What people reorder.</h2>
          <p className="mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            Ranked by repeat purchase. Same pre-measured pod in every pack.
          </p>
          <ProductTileGrid variants={BEST_SELLERS} showRank columns={3} />
        </div>
      </section>

      {/* ============ RANGE POINTER ============ */}
      <section className="section-pad relative overflow-hidden text-center" style={{ background: "var(--v-bg-soft)" }}>
        <div className="relative mx-auto max-w-[900px] px-6">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>The full range</p>
          <h2 className="headline-2xl mt-4 text-3xl sm:text-4xl md:text-5xl">A formula for every load.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            Everyday, gym kit, baby clothes, socks, delicates — one pod each, and more on the way.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full px-9 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-transform hover:scale-[1.03]"
            style={{ background: "var(--brand)" }}
          >
            Shop all products →
          </Link>
        </div>
      </section>

      {/* ============ 4-IN-1 (short) ============ */}
      <section className="section-pad relative overflow-hidden">
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h2 className="headline-2xl text-2xl sm:text-3xl md:text-4xl">4-in-1 laundry care.</h2>
            <p className="text-base" style={{ color: "var(--v-ink-soft)" }}>
              One pod. Four actions. No bottles, no measuring.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FOUR_IN_ONE.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center rounded-[24px] p-8 text-center transition-transform duration-200 hover:-translate-y-1.5"
                style={{ background: f.art, border: `1px solid ${f.tint}` }}
              >
                <span
                  className="grid h-24 w-24 place-items-center rounded-[26px] shadow-sm"
                  style={{ background: "rgba(255,255,255,.75)", color: f.ink }}
                >
                  <f.Icon className="h-14 w-14" />
                </span>
                <b className="mt-6 text-[19px] font-black tracking-tight" style={{ color: f.ink }}>
                  {f.title}
                </b>
                <span className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "#5B6472" }}>
                  {f.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
