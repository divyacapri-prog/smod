import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WavePattern } from "@/components/site/WavePattern";
import { BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { useCart } from "@/lib/cart";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — SMOD" },
      { name: "description", content: "Complete your SMOD order. Secure checkout, free shipping." },
      { property: "og:title", content: "SMOD Checkout" },
      { property: "og:description", content: "Complete your SMOD order. Secure checkout, free shipping." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, clear, count } = useCart();
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  const onPlace = (e: React.FormEvent) => {
    e.preventDefault();
    lines.forEach((l) =>
      track("purchase_completed", { sku: l.sku, variant: l.variantSlug, price: l.price * l.qty })
    );
    setPlaced(true);
    clear();
  };

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
          <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--accent)" }}>Almost there</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
            {placed ? "Order placed." : "Secure checkout."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            {placed ? "We've started preparing your SMOD order — a confirmation is on its way." : "Payments coming soon — placing an order will simulate a confirmation for now."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        {placed ? (
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full text-2xl text-white" style={{ background: "var(--brand)" }}>✓</div>
            <h2 className="mt-4 text-2xl font-black">Thank you for your order</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>Confirmation has been queued. Payments integration is coming soon.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/" className="rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: "var(--brand)" }}>Back to home</Link>
              <Link to="/regular" className="rounded-full border px-6 py-3 text-sm font-bold" style={{ borderColor: "var(--brand)", color: "var(--brand-deep)" }}>Shop more</Link>
            </div>
          </div>
        ) : count === 0 ? (
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}>
            <h2 className="text-2xl font-black">Your cart is empty</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>Add a pod or two before checking out.</p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="mt-6 rounded-full px-6 py-3 text-sm font-bold text-white"
              style={{ background: "var(--brand)" }}
            >
              Shop the range →
            </button>
          </div>
        ) : (
          <form onSubmit={onPlace} className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            {/* Forms */}
            <div className="space-y-6">
              <Block title="Contact">
                <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
                <Field label="Phone" name="phone" type="tel" required placeholder="+91…" />
              </Block>

              <Block title="Shipping address">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" name="firstName" required />
                  <Field label="Last name" name="lastName" required />
                </div>
                <Field label="Address" name="address" required placeholder="Flat, building, street" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City" name="city" required />
                  <Field label="State" name="state" required />
                  <Field label="PIN" name="pin" required />
                </div>
              </Block>

              <Block title="Payment">
                <div className="rounded-2xl border border-dashed p-5 text-sm" style={{ borderColor: "color-mix(in oklab, var(--brand) 30%, transparent)", background: "color-mix(in oklab, var(--brand) 6%, transparent)" }}>
                  <p className="font-bold" style={{ color: "var(--brand-deep)" }}>Payment gateway coming soon</p>
                  <p className="mt-1" style={{ color: "var(--v-ink-soft)" }}>For now, placing the order will simulate a successful checkout so you can preview the flow end-to-end.</p>
                </div>
              </Block>
            </div>

            {/* Summary */}
            <aside
              className="h-fit rounded-3xl border bg-white p-6 shadow-sm md:sticky md:top-24"
              style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
            >
              <h2 className="text-xl font-black">Order summary</h2>
              <ul className="mt-4 space-y-3">
                {lines.map((l) => (
                  <li key={l.sku} className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl" style={{ background: "var(--v-bg-soft)" }}>
                      {l.imageUrl ? (
                        <img src={l.imageUrl} alt={l.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full" style={{ background: `linear-gradient(135deg, var(--brand), var(--brand-deep))` }} />
                      )}
                      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-black text-white" style={{ background: "var(--brand)" }}>{l.qty}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{l.name}</p>
                      <p className="text-xs" style={{ color: "var(--v-ink-soft)" }}>₹{l.price} × {l.qty}</p>
                    </div>
                    <div className="text-sm font-black">₹{l.qty * l.price}</div>
                  </li>
                ))}
              </ul>

              <div className="my-5 h-px" style={{ background: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }} />

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt style={{ color: "var(--v-ink-soft)" }}>Subtotal</dt><dd className="font-bold">₹{subtotal}</dd></div>
                <div className="flex justify-between"><dt style={{ color: "var(--v-ink-soft)" }}>Shipping</dt><dd className="font-bold">Free</dd></div>
                <div className="flex items-baseline justify-between pt-2">
                  <dt className="text-base font-black">Total</dt>
                  <dd className="text-3xl font-black" style={{ color: "var(--brand-deep)" }}>₹{subtotal}</dd>
                </div>
              </dl>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.01]"
                style={{ background: "var(--brand)" }}
              >
                Place order →
              </button>
              <Link
                to="/cart"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 text-sm font-bold"
                style={{ borderColor: "color-mix(in oklab, var(--v-ink) 15%, transparent)", color: "var(--v-ink)" }}
              >
                Back to cart
              </Link>
            </aside>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}>
      <h2 className="text-lg font-black">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink)" }}>{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black"
        style={{ borderColor: "rgba(0,0,0,0.12)" }}
      />
    </div>
  );
}
