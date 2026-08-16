import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AbstractArt } from "@/components/site/AbstractArt";
import { LeafIcon, RecycleIcon, PodIcon, ScaleIcon } from "@/components/site/FeatureIcons";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our story — SMOD" },
      {
        name: "description",
        content:
          "Eco-friendly by design and built around one smart pod. Why SMOD replaced scoops, jugs and guesswork.",
      },
      { property: "og:title", content: "Our story — SMOD" },
      { property: "og:url", content: "/our-story" },
    ],
    links: [{ rel: "canonical", href: "/our-story" }],
  }),
  component: OurStory,
});

const ICON_BOX: React.CSSProperties = {
  display: "grid",
  placeItems: "center",
  width: "3.5rem",
  height: "3.5rem",
  borderRadius: "1rem",
  color: "var(--brand)",
  background: "color-mix(in oklab, var(--brand) 8%, white)",
  border: "1px solid color-mix(in oklab, var(--brand) 16%, transparent)",
};

function OurStory() {
  return (
    <div
      style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen scroll-smooth"
    >
      <Header />

      {/* ---- Hero ---- */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: `
            radial-gradient(65% 55% at 82% 18%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 72%),
            linear-gradient(160deg, color-mix(in oklab, var(--brand) 92%, white) 0%, color-mix(in oklab, var(--brand-deep) 90%, black) 100%)`,
        }}
      >
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="eyebrow" style={{ color: "var(--accent)" }}>Our story</p>
          <h1 className="headline-2xl mt-5 text-balance text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            A tiny laboratory
            <br />
            in every pod.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
            SMOD started with one question: why does getting clothes clean still involve scoops,
            spills and guesswork? Two ideas answer it.
          </p>
        </div>
        <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="relative block h-12 w-full md:h-20" style={{ color: "var(--v-bg)" }}>
          <path d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </section>

      {/* ---- The two ideas ---- */}
      <section className="section-pad relative overflow-hidden">
        <div className="relative mx-auto max-w-[1200px] px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="premium-card p-9">
              <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: "var(--brand)" }}>
                ① Eco-friendly design
              </p>
              <h2 className="mt-4 text-2xl font-black tracking-tight md:text-3xl">
                Our pod dissolves — but doesn&rsquo;t dissolve our Earth.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
                The water-soluble film disappears completely in every wash. No plastic scoop, no
                residue, no half-empty jug in the utility cupboard. The outer pack is fully
                recyclable, so less ends up in landfill.
              </p>
              <div className="mt-7 flex gap-4">
                <span style={ICON_BOX}><LeafIcon className="h-7 w-7" /></span>
                <span style={ICON_BOX}><RecycleIcon className="h-7 w-7" /></span>
              </div>
            </article>

            <article className="premium-card p-9">
              <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: "var(--brand)" }}>
                ② Smart pod
              </p>
              <h2 className="mt-4 text-2xl font-black tracking-tight md:text-3xl">
                Four actions, pre-measured.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
                Smart dosing. Maximum clean. Optimised care. Dependable freshness. Detergent,
                comforter, softener and anti-microbial — sealed into a single pod that knows exactly
                how much of itself to give.
              </p>
              <div className="mt-7 flex gap-4">
                <span style={ICON_BOX}><PodIcon className="h-7 w-7" /></span>
                <span style={ICON_BOX}><ScaleIcon className="h-7 w-7" /></span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ---- Wordmark ---- */}
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
        <div className="relative mx-auto max-w-[1200px] px-6 py-28 text-center md:py-40">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>Who we are</p>
          <div className="mt-8 flex flex-wrap items-center justify-center text-5xl font-black tracking-tight md:text-8xl lg:text-9xl">
            <span style={{ color: "var(--brand)" }}>SM</span>
            <span style={{ color: "#728198" }}>ART&nbsp;P</span>
            <span style={{ color: "var(--brand)" }}>OD</span>
          </div>
          <p className="mx-auto mt-8 max-w-md text-base font-medium md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            A tiny laboratory in every pod — designed in Coimbatore, sold across India.
          </p>
          <Link
            to="/shop"
            className="mt-10 inline-block rounded-full px-9 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-transform hover:scale-[1.03]"
            style={{ background: "var(--brand)" }}
          >
            Shop the range
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
