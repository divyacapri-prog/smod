import { createFileRoute, Link } from "@tanstack/react-router";
import { VARIANTS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductTileGrid } from "@/components/site/ProductTiles";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop all pods — SMOD" },
      {
        name: "description",
        content:
          "Every SMOD pod in one place — Regular, Sports, Baby, Socks and Intimate Wear, in 20 and 40 pod packs.",
      },
      { property: "og:title", content: "Shop all pods — SMOD" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div
      style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen scroll-smooth"
    >
      <Header />

      <section className="relative overflow-hidden pb-4 pt-14">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="depth-blob depth-float-slow"
            style={{ top: "4%", left: "-6%", width: "26rem", height: "26rem", background: "color-mix(in oklab, var(--brand) 18%, transparent)" }}
          />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6">
          <p className="text-[12.5px]" style={{ color: "var(--v-ink-soft)" }}>
            <Link to="/" className="hover:underline">Home</Link> · Shop
          </p>
          <p className="eyebrow mt-6" style={{ color: "var(--brand)" }}>Shop products</p>
          <h1 className="headline-2xl mt-4 text-3xl sm:text-4xl md:text-6xl">One pod for every load.</h1>
          <p className="mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
            Five formulas. Same pre-measured pod. Both pack sizes on every product — pick the load
            you&rsquo;re washing.
          </p>

          <ProductTileGrid variants={VARIANTS} columns={5} />
        </div>
      </section>

      <div className="mt-16">
        <ComingSoon />
      </div>

      <section className="section-pad mx-auto max-w-[1200px] px-6">
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-12 text-center text-white md:p-20"
          style={{
            background: "linear-gradient(135deg, var(--brand), var(--brand-deep))",
            boxShadow: "0 60px 120px -50px var(--brand)",
          }}
        >
          <h2 className="headline-2xl text-4xl text-white md:text-5xl">Not sure which one?</h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/85">
            Regular handles the whole family&rsquo;s wash. The rest are specialists.
          </p>
          <Link
            to="/regular"
            className="mt-8 inline-block rounded-full bg-white px-9 py-4 text-sm font-bold uppercase tracking-wider shadow-xl transition-transform hover:scale-[1.03]"
            style={{ color: "var(--brand)" }}
          >
            Start with Regular
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
