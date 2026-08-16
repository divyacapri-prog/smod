import type { Variant } from "@/lib/variants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/**
 * Everything that used to sit in seven always-open cards, collapsed into
 * dropdowns that open one at a time. Lives in the buy column on the product
 * page so the detail is next to the price rather than a screen below it.
 */
export function ProductDetails({ variant }: { variant: Variant }) {
  const p = variant.packaging;

  return (
    <Accordion type="single" collapsible defaultValue="description" className="mt-8 w-full">
      <AccordionItem value="description">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
            {variant.description}
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="info">
        <AccordionTrigger>Product information</AccordionTrigger>
        <AccordionContent>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt style={{ color: "var(--v-ink-soft)" }}>Wash count</dt>
            <dd className="m-0 font-bold">{variant.packs.map((x) => `${x.size} pods`).join(" · ")}</dd>
            <dt style={{ color: "var(--v-ink-soft)" }}>Net weight</dt>
            <dd className="m-0 font-bold">{p.weight}</dd>
            <dt style={{ color: "var(--v-ink-soft)" }}>Fragrance</dt>
            <dd className="m-0 font-bold">{p.fragrance}</dd>
            <dt style={{ color: "var(--v-ink-soft)" }}>Suitable for</dt>
            <dd className="m-0 font-bold">{p.machines.join(" · ")}</dd>
            <dt style={{ color: "var(--v-ink-soft)" }}>Marketed by</dt>
            <dd className="m-0 font-bold">Vyam Trading Ventures LLP, Coimbatore</dd>
          </dl>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="benefits">
        <AccordionTrigger>Key benefits</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-3">
            {p.benefits.map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="text-lg leading-none" aria-hidden>{b.icon}</span>
                <span>
                  <span className="block text-sm font-bold" style={{ color: "var(--v-ink)" }}>{b.title}</span>
                  <span className="block text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>{b.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="ingredients">
        <AccordionTrigger>Ingredients</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
            Anionic &amp; Non-Ionic Surfactants, Enzymes, Glycerin, Colorant, Polyethylene Glycol,
            Propylene Glycol, Fragrance &amp; Water.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="caution">
        <AccordionTrigger>Caution &amp; safety</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc space-y-1.5 pl-5 text-sm" style={{ color: "var(--v-ink-soft)" }}>
            {p.caution.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="certs">
        <AccordionTrigger>Certifications &amp; claim</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2">
            {p.certifications.map((c) => (
              <span
                key={c}
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                style={{
                  borderColor: "color-mix(in oklab, var(--brand) 30%, transparent)",
                  background: "color-mix(in oklab, var(--brand) 8%, transparent)",
                }}
              >
                ✓ {c}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold" style={{ color: "var(--v-ink)" }}>{p.claim}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
