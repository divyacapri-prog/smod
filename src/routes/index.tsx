import { createFileRoute, Link } from "@tanstack/react-router";
import { BEST_SELLERS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ClaimRotator } from "@/components/site/ClaimRotator";
import { HeroWaterFX } from "@/components/site/HeroWaterFX";
import { ProductTileGrid } from "@/components/site/ProductTiles";
import { PodIcon, ClothIcon, SoftenerIcon, ShieldIcon } from "@/components/site/FeatureIcons";
import packFront from "@/assets/smod-pack-front.png";

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
  { Icon: PodIcon, title: "Detergent", sub: "Triple-enzyme deep clean" },
  { Icon: ClothIcon, title: "Comforter", sub: "Softness restored" },
  { Icon: SoftenerIcon, title: "Softener", sub: "Long-lasting freshness" },
  { Icon: ShieldIcon, title: "Anti-microbial", sub: "Odor-causing bacteria, gone" },
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

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-6 pb-20 pt-16 md:grid-cols-[1fr_1.05fr] md:gap-6 md:pb-28 md:pt-20">
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

          {/* Product render, wrapped in water FX */}
          <div className="relative flex items-center justify-center md:justify-end">
            <div
              aria-hidden
              className="absolute inset-0 -m-16 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 62%)",
              }}
            />
            <div className="relative flex items-center justify-center">
              <HeroWaterFX layer="back" />
              <img
                src={packFront}
                alt="SMOD pods"
                className="product-float relative z-[2] h-[300px] w-auto md:h-[420px] lg:h-[480px]"
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
        <div className="relative mx-auto max-w-[1200px] px-6">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>Best sellers</p>
          <h2 className="headline-2xl mt-4 text-4xl md:text-6xl">What people reorder.</h2>
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
          <h2 className="headline-2xl mt-4 text-4xl md:text-5xl">Five formulas. One pod each.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            Regular, Sports, Baby, Socks and Intimate Wear — plus what&rsquo;s coming next.
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
        <div className="relative mx-auto max-w-[1200px] px-6">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h2 className="headline-2xl text-3xl md:text-4xl">4-in-1 laundry care.</h2>
            <p className="text-base" style={{ color: "var(--v-ink-soft)" }}>
              One pod. Four actions. No bottles, no measuring.
            </p>
          </div>

          <div
            className="mt-8 flex flex-wrap rounded-[20px] border p-2"
            style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface, #fff)" }}
          >
            {FOUR_IN_ONE.map((f, i) => (
              <div
                key={f.title}
                className="relative flex min-w-[45%] flex-1 flex-col items-center gap-3 px-4 py-6 text-center"
                style={i > 0 ? { boxShadow: "inset 1px 0 0 color-mix(in oklab, var(--v-ink) 8%, transparent)" } : undefined}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-[13px]"
                  style={{ background: "color-mix(in oklab, var(--brand) 10%, transparent)", color: "var(--brand)" }}
                >
                  <f.Icon className="h-7 w-7" />
                </span>
                <b className="text-[15px] font-black tracking-tight">{f.title}</b>
                <span className="text-[12.5px]" style={{ color: "var(--v-ink-soft)" }}>{f.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section-pad mx-auto max-w-[1400px] px-6">
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-12 text-center text-white md:p-24"
          style={{
            background: "linear-gradient(135deg, var(--brand), var(--brand-deep))",
            boxShadow: "0 60px 120px -50px var(--brand)",
          }}
        >
          <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-30" style={{ background: "var(--accent)" }} />
          <div className="relative">
            <h2 className="headline-2xl text-4xl text-white md:text-6xl">Smarter wash. Starts here.</h2>
            <Link
              to="/shop"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-sm font-bold uppercase tracking-wider shadow-xl transition-transform hover:scale-[1.03]"
              style={{ color: "var(--brand)" }}
            >
              Shop SMOD pods →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
