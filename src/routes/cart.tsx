import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WavePattern } from "@/components/site/WavePattern";
import { BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — SMOD" },
      { name: "description", content: "Review your SMOD pods before checkout." },
      { property: "og:title", content: "Your SMOD Cart" },
      { property: "og:description", content: "Review your SMOD pods before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQty, remove, count } = useCart();

  return (
    <div
      style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen"
    >
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)` }}>
        <WavePattern edge="bottom" height={120} />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, white 60%, transparent), transparent 60%)" }} />
          <div className="absolute right-10 top-24 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 70%, transparent), transparent 60%)" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-24 text-center text-white md:pt-24">
          <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--accent)" }}>Your bag</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
            {count > 0 ? "Ready when you are." : "Your cart is empty."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            {count > 0 ? `${count} item${count === 1 ? "" : "s"} waiting. Free shipping on every order.` : "Discover SMOD pods and add your favorites."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        {lines.length === 0 ? (
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}>
            <p className="text-lg" style={{ color: "var(--v-ink-soft)" }}>Nothing here yet.</p>
            <Link to="/" className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: "var(--brand)" }}>
              Shop the range →
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
            {/* Lines */}
            <div className="space-y-4">
              {lines.map((l) => (
                <article
                  key={l.sku}
                  className="flex items-center gap-4 rounded-3xl border bg-white p-4 shadow-sm md:p-5"
                  style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl" style={{ background: "var(--v-bg-soft)" }}>
                    {l.imageUrl ? (
                      <img src={l.imageUrl} alt={l.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full" style={{ background: `linear-gradient(135deg, var(--brand), var(--brand-deep))` }} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--brand)" }}>{l.variantName}</p>
                    <h3 className="truncate text-base font-black">{l.name}</h3>
                    <p className="text-sm" style={{ color: "var(--v-ink-soft)" }}>₹{l.price} each</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border px-2 py-1" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 12%, transparent)" }}>
                    <button
                      aria-label="Decrease"
                      onClick={() => setQty(l.sku, l.qty - 1)}
                      className="grid h-7 w-7 place-items-center rounded-full text-sm font-black transition-colors hover:bg-black/5"
                    >−</button>
                    <span className="min-w-6 text-center text-sm font-black">{l.qty}</span>
                    <button
                      aria-label="Increase"
                      onClick={() => setQty(l.sku, l.qty + 1)}
                      className="grid h-7 w-7 place-items-center rounded-full text-sm font-black transition-colors hover:bg-black/5"
                    >+</button>
                  </div>
                  <div className="hidden w-24 text-right text-base font-black sm:block">₹{l.qty * l.price}</div>
                  <button
                    aria-label="Remove"
                    onClick={() => remove(l.sku)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm transition-colors hover:bg-black/5"
                    style={{ color: "var(--v-ink-soft)" }}
                  >✕</button>
                </article>
              ))}
            </div>

            {/* Summary */}
            <aside
              className="h-fit rounded-3xl border bg-white p-6 shadow-sm md:sticky md:top-24"
              style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
            >
              <h2 className="text-xl font-black">Order summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt style={{ color: "var(--v-ink-soft)" }}>Subtotal</dt>
                  <dd className="font-bold">₹{subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt style={{ color: "var(--v-ink-soft)" }}>Shipping</dt>
                  <dd className="font-bold">Free</dd>
                </div>
                <div className="flex justify-between">
                  <dt style={{ color: "var(--v-ink-soft)" }}>Tax</dt>
                  <dd className="font-bold">Included</dd>
                </div>
                <div className="my-3 h-px" style={{ background: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }} />
                <div className="flex items-baseline justify-between">
                  <dt className="text-base font-black">Total</dt>
                  <dd className="text-3xl font-black" style={{ color: "var(--brand-deep)" }}>₹{subtotal}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.01]"
                style={{ background: "var(--brand)" }}
              >
                Proceed to checkout →
              </Link>
              <Link
                to="/"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 text-sm font-bold"
                style={{ borderColor: "color-mix(in oklab, var(--v-ink) 15%, transparent)", color: "var(--v-ink)" }}
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
