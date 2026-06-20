import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findSku, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { QRCode } from "@/components/site/QRCode";

export const Route = createFileRoute("/buy/$sku")({
  loader: ({ params }) => {
    const item = findSku(params.sku);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const item = loaderData?.item;
    const title = item ? `Buy ${item.variant.name} — ${item.size} Pods` : "Buy Podwash";
    return { meta: [{ title }, { name: "description", content: item?.variant.description ?? "Buy Podwash pods" }] };
  },
  component: BuyPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-white p-8 text-center">
      <div>
        <h1 className="text-3xl font-black">SKU not found</h1>
        <Link to="/" className="mt-4 inline-block text-blue-600 underline">Back home</Link>
      </div>
    </div>
  ),
});

function BuyPage() {
  const { item } = Route.useLoaderData();
  const { variant } = item;
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${item.buyPath}` : item.buyPath;

  return (
    <div style={{ ...paletteToCssVars(variant.palette), background: "var(--v-bg)", color: "var(--v-ink)" }} className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-5 py-14">
        <Link to={`/${variant.slug}` as string} className="text-sm font-semibold" style={{ color: "var(--brand-deep)" }}>← Back to {variant.name}</Link>

        <div className="mt-6 grid gap-10 rounded-[2rem] border p-8 md:grid-cols-2 md:p-12" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)", boxShadow: "0 40px 80px -40px var(--brand)" }}>
          <div>
            <div
              className="aspect-square w-full rounded-3xl"
              style={{
                background: `radial-gradient(circle at 30% 30%, var(--accent), var(--brand) 60%, var(--brand-deep))`,
                boxShadow: "inset 0 -20px 40px rgba(0,0,0,0.25)",
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>{variant.emoji} {variant.name}</p>
            <h1 className="mt-2 text-5xl font-black tracking-tight">{item.size} Pods</h1>
            <p className="mt-3 text-base" style={{ color: "var(--v-ink-soft)" }}>{variant.description}</p>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-5xl font-black" style={{ color: "var(--brand-deep)" }}>₹{item.price}</span>
              <span className="text-sm" style={{ color: "var(--v-ink-soft)" }}>≈ ₹{item.perWash.toFixed(2)} / wash</span>
            </div>
            <button className="mt-6 rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: "var(--brand)" }}>
              Add to cart · ₹{item.price}
            </button>
            <div className="mt-8 flex items-center gap-6 rounded-2xl border p-5" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-bg-soft)" }}>
              <QRCode value={fullUrl} sku={item.sku} size={140} fg={variant.palette.brandDeep} bg={variant.palette.surface} />
              <div className="text-xs" style={{ color: "var(--v-ink-soft)" }}>
                <p className="font-bold" style={{ color: "var(--v-ink)" }}>Scan to share</p>
                <p className="mt-1 font-mono">{item.buyPath}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
