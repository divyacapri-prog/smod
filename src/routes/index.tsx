import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Splash } from "@/components/site/Splash";
import { VARIANTS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WavePattern } from "@/components/site/WavePattern";
import { AbstractArt } from "@/components/site/AbstractArt";
import { HandDropPodIcon, LoadClothesIcon, SpinWashIcon, ScrollReplayIcon } from "@/components/site/StepIcons";
import {
  PodIcon, ClothIcon, SoftenerIcon, ShieldIcon,
  ScaleIcon, SuitcaseIcon, BoxIcon, LeafIcon, SparkleIcon,
  CrueltyFreeIcon, RecycleIcon,
} from "@/components/site/FeatureIcons";
import smodLogo from "@/assets/smod-logo-white.png";
import packFront from "@/assets/smod-pack-front.png";
import innerwearPack from "@/assets/smod-innerwear-pack.jpg";
import babyPack from "@/assets/smod-baby-pack.jpg";
import regularPack from "@/assets/smod-regular-pack.jpeg";
import socksPack from "@/assets/smod-socks-pack.jpg";
import sportsPack from "@/assets/smod-sports-pack.jpg";

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
  regular: regularPack,
  socks: socksPack,
  sports: sportsPack,
  innerwear: innerwearPack,
  baby: babyPack,
};

const STEPS = [
  { n: "01", t: "Drop", b: "One pod in the drum.", Icon: HandDropPodIcon },
  { n: "02", t: "Load", b: "Any cycle, any load.", Icon: LoadClothesIcon },
  { n: "03", t: "Done", b: "Deep clean. Zero mess.", Icon: SpinWashIcon },
];

function Home() {
  const [showSplash, setShowSplash] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem("smod_splash_v1")) {
      setShowSplash(true);
      sessionStorage.setItem("smod_splash_v1", "1");
    }
  }, []);
  return (
    <>
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}
    <div
      style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen scroll-smooth"
    >
      <Header />

      {/* ============ HERO — product-dominant, restrained ============ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `
            radial-gradient(65% 55% at 82% 18%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 72%),
            linear-gradient(160deg, color-mix(in oklab, var(--brand) 92%, white) 0%, color-mix(in oklab, var(--brand-deep) 90%, black) 100%)`,
        }}
      >
        {/* Layer 2 — a single faint organic shape for depth */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <svg className="absolute -right-24 bottom-0 h-[40rem] w-[40rem] opacity-[0.12]" viewBox="0 0 200 200" fill="none">
            <path
              d="M52,-58C66,-46,75,-28,77,-9C79,10,74,30,62,45C50,60,31,70,11,73C-9,76,-30,72,-46,61C-62,50,-72,32,-75,12C-78,-8,-74,-29,-62,-43C-50,-57,-30,-64,-10,-67C10,-70,30,-69,52,-58Z"
              transform="translate(100 100)"
              fill="color-mix(in oklab, white 60%, transparent)"
            />
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-6 pt-28 pb-20 md:grid-cols-[1fr_1.15fr] md:gap-6 md:pt-36 md:pb-32 lg:gap-12">
          {/* Text — reduced emphasis */}
          <div className="text-white">
            <img src={smodLogo} alt="SMOD" className="h-12 w-auto md:h-14" />
            <p className="eyebrow mt-7" style={{ color: "var(--accent)" }}>
              Detergent, redesigned
            </p>
            <h1 className="headline-2xl mt-3 text-balance text-[2.75rem] leading-[1] text-white sm:text-5xl md:text-[4.25rem] lg:text-[5.25rem]">
              No scoops. No jugs.
              <br />
              <span style={{ color: "var(--accent)" }}>Just one pod.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
              Pre-measured 4-in-1 pods that dissolve right in the drum — detergent, softener,
              freshness and anti-microbial, sealed into one. One pod, one load, every time.
            </p>

            {/* replaces strip — retires the old way in plain sight */}
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/75">
              <span className="uppercase tracking-[0.18em] text-xs text-white/55">Replaces</span>
              <span className="line-through decoration-white/40">measuring cups</span>
              <span className="line-through decoration-white/40">powder scoops</span>
              <span className="line-through decoration-white/40">liquid jugs</span>
              <span aria-hidden className="text-white/50">→</span>
              <span className="font-bold text-white">one pod.</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
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

          {/* Layer 3 — clean product render */}
          <div className="relative flex items-center justify-center md:justify-end">
            {/* soft halo */}
            <div
              aria-hidden
              className="absolute inset-0 -m-16 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 62%)",
              }}
            />
            <img
              src={packFront}
              alt="SMOD pod pack"
              className="product-float relative h-[380px] w-auto md:h-[560px] lg:h-[680px]"
            />
            <span
              className="trust-chip absolute right-1 top-1 hidden md:inline-flex"
              style={{ color: "var(--brand-deep)" }}
            >
              ⭐ 4.8 / 5
            </span>
          </div>
        </div>

        {/* curved bottom — flow into next section */}
        <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="relative block h-12 w-full md:h-20" style={{ color: "var(--v-bg)" }}>
          <path d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </section>


      {/* ============ THE RANGE — layered storefront ============ */}
      <section id="range" className="relative overflow-hidden">
        {/* depth backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="depth-blob depth-float-slow" style={{ top: "8%", left: "-6%", width: "26rem", height: "26rem", background: "color-mix(in oklab, var(--brand) 22%, transparent)" }} />
          <div className="depth-blob depth-float" style={{ bottom: "10%", right: "-4%", width: "22rem", height: "22rem", background: "color-mix(in oklab, var(--accent) 60%, transparent)" }} />
        </div>

        <div className="relative section-pad-lg mx-auto max-w-[1400px] px-6">
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
            {VARIANTS.map((v, idx) => (
              <Link
                key={v.slug}
                to={`/${v.slug}` as string}
                className={`product-tile group ${idx % 2 === 1 ? "lg:translate-y-8" : ""}`}
                style={
                  {
                    "--tile-bg": v.palette.bgSoft,
                    "--brand": v.palette.brand,
                  } as React.CSSProperties
                }
              >
                {/* organic backdrop shape inside tile */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-2xl"
                  style={{ background: `color-mix(in oklab, ${v.palette.brand} 35%, transparent)` }}
                />
                <div className="tile-image">
                  <span
                    className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur"
                    style={{ background: "rgba(255,255,255,0.85)", color: v.palette.brand }}
                  >
                    {v.emoji} {v.name}
                  </span>
                  <img src={VARIANT_IMAGES[v.slug] || packFront} alt={`SMOD ${v.name} pack`} />
                </div>
                <div className="tile-body">
                  <h3 className="text-2xl font-black tracking-tight" style={{ color: "#1D2029" }}>
                    SMOD {v.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "#5B6472" }}>
                    {v.tagline}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: "#1D2029" }}>
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
        </div>
      </section>


      {/* ============ 4-IN-1 EDITORIAL ============ */}
      <section
        className="section-pad-lg relative overflow-hidden"
        style={{ background: "var(--v-bg-soft)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="depth-blob depth-float" style={{ top: "-6%", right: "10%", width: "30rem", height: "30rem", background: "color-mix(in oklab, var(--accent) 55%, transparent)" }} />
          <div className="depth-blob depth-float-slow" style={{ bottom: "-10%", left: "5%", width: "26rem", height: "26rem", background: "color-mix(in oklab, var(--brand) 18%, transparent)" }} />
          <svg className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" viewBox="0 0 200 200">
            <path d="M50,-60C62,-50,68,-32,71,-14C74,4,74,22,65,36C56,50,38,60,18,67C-2,74,-22,78,-39,71C-56,64,-70,46,-74,27C-78,8,-72,-13,-61,-28C-50,-43,-34,-52,-17,-60C0,-68,18,-75,32,-72C46,-69,38,-70,50,-60Z" transform="translate(100 100)" fill="var(--brand)"/>
          </svg>
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6">
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
              { n: "01", Icon: PodIcon, title: "Detergent", body: "Triple-enzyme deep clean lifts dirt and tough stains." },
              { n: "02", Icon: ClothIcon, title: "Comforter", body: "Restores softness and a cozy feel to every fibre." },
              { n: "03", Icon: SoftenerIcon, title: "Softener", body: "Long-lasting fresh scent woven into your laundry." },
              { n: "04", Icon: ShieldIcon, title: "Anti-microbial", body: "Fights odor-causing bacteria, wash after wash." },
            ].map((f, i) => (
              <div key={f.title} className={`feature-card ${i % 2 === 1 ? "lg:translate-y-6" : ""}`}>
                <div
                  aria-hidden
                  className="absolute -right-2 -top-4 text-[6rem] font-black leading-none opacity-[0.07]"
                  style={{ color: "var(--brand)" }}
                >
                  {f.n}
                </div>
                <div className="feature-icon"><f.Icon className="h-8 w-8" /></div>
                <h3 className="mt-6 text-xl font-black">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY PODS ============ */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="depth-blob depth-float-slow" style={{ top: "10%", left: "60%", width: "28rem", height: "28rem", background: "color-mix(in oklab, var(--accent) 40%, transparent)" }} />
        </div>
        <div className="relative section-pad-lg mx-auto max-w-[1400px] px-6">
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
              { Icon: ScaleIcon, title: "Pre-measured", body: "Exactly one pod per load. No guesswork." },
              { Icon: SuitcaseIcon, title: "Travel friendly", body: "No spills — sealed film dissolves only in water." },
              { Icon: BoxIcon, title: "Easy storage", body: "Resealable ziplock pack, fits any laundry shelf." },
              { Icon: ShieldIcon, title: "Anti-microbial", body: "Fights odor-causing bacteria, every wash." },
              { Icon: SparkleIcon, title: "Premium clean", body: "Triple-action enzymes per pod." },
            ].map((w, i) => (
              <div key={w.title} className={`feature-card ${i % 3 === 1 ? "lg:translate-y-8" : ""}`}>
                <div className="feature-icon"><w.Icon className="h-8 w-8" /></div>
                <h3 className="mt-6 text-xl font-black">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
                  {w.body}
                </p>
              </div>
            ))}
          </div>
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

      {/* ============ ECO ============ */}
      <section className="section-pad-lg relative overflow-hidden" style={{ background: "var(--brand-deep)" }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -right-16 -top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle at 50% 50%, var(--accent), transparent 65%)" }} />
          <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle at 50% 50%, var(--accent), transparent 65%)" }} />
        </div>
        <div className="relative mx-auto max-w-[1000px] px-6 text-center text-white">
          <p className="eyebrow" style={{ color: "var(--accent)" }}>🌍 Eco-friendly by design</p>
          <h2 className="headline-2xl mx-auto mt-5 max-w-3xl text-balance text-4xl leading-[1.05] md:text-6xl">
            Our POD dissolves in water, not our Earth.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/85 md:text-lg">
            The water-soluble film dissolves completely in every wash, and the pack is fully recyclable. Clean clothes, lighter footprint.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 text-left backdrop-blur">
              <div className="text-3xl">💧</div>
              <h3 className="mt-4 text-xl font-black">Dissolves completely in water</h3>
              <p className="mt-2 text-sm text-white/80">No plastic scoops, no residue — the film disappears in the wash.</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 text-left backdrop-blur">
              <div className="text-3xl">♻️</div>
              <h3 className="mt-4 text-xl font-black">Recyclable packaging</h3>
              <p className="mt-2 text-sm text-white/80">The outer pack is fully recyclable, so less ends up in landfill.</p>
            </div>
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
    </>
  );
}
