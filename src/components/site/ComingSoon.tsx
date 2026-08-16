import { useState } from "react";
import { COMING_SOON } from "@/lib/variants";

/**
 * Products that exist as a plan but not yet as a SKU. Driven by the
 * `available` flag in lib/variants.ts — flip it to true and move the product
 * into VARIANTS when it launches; nothing here needs editing.
 */
export function ComingSoon() {
  const pending = COMING_SOON.filter((c) => !c.available);
  if (!pending.length) return null;

  return (
    <section id="coming-soon" className="section-pad relative overflow-hidden" style={{ background: "var(--v-bg-soft)" }}>
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6">
        <p className="eyebrow" style={{ color: "var(--brand)" }}>Coming soon</p>
        <h2 className="headline-2xl mt-4 text-3xl sm:text-4xl md:text-5xl">The range is growing.</h2>
        <p className="mt-4 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
          Same pre-measured pod thinking, new jobs around the house.
        </p>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {pending.map((c) => (
            <NotifyCard key={c.slug} product={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NotifyCard({ product }: { product: (typeof COMING_SOON)[number] }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to a real destination (mailing list, form endpoint, CRM).
    // Until then this only acknowledges the input — nothing is stored or sent.
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };

  return (
    <div
      className="rounded-[20px] border border-dashed p-7"
      style={{ borderColor: "rgba(29,32,41,.22)", background: "var(--v-surface, #fff)" }}
    >
      <div className="grid h-32 place-items-center rounded-[15px] text-5xl" style={{ background: product.gradient }}>
        <span aria-hidden>{product.emoji}</span>
      </div>
      <span
        className="mt-5 inline-block rounded-full px-3 py-1.5 text-[9.5px] font-black uppercase tracking-[0.16em]"
        style={{ color: "var(--brand)", background: "color-mix(in oklab, var(--brand) 10%, transparent)" }}
      >
        {product.status}
      </span>
      <h3 className="mt-3 text-[22px] font-black tracking-tight">{product.name}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
        {product.body}
      </p>

      {done ? (
        <p className="mt-5 text-[13px] font-bold" style={{ color: "var(--brand)" }}>
          Thanks &mdash; we&rsquo;ll be in touch when {product.name} lands.
        </p>
      ) : (
      <form className="mt-5 flex gap-2" onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email me when it lands"
          aria-label={`Notify me about ${product.name}`}
          className="min-w-0 flex-1 rounded-full border px-4 py-2.5 text-[13px] outline-none"
          style={{ borderColor: "rgba(29,32,41,.14)" }}
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-full px-4 py-2.5 text-[12.5px] font-extrabold text-white"
          style={{ background: "var(--brand)" }}
        >
          Notify me
        </button>
      </form>
      )}
    </div>
  );
}
