import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variant } from "@/lib/variants";
import { pouchFor } from "@/lib/variants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HandDropPodIcon, LoadClothesIcon, SpinWashIcon, ScrollReplayIcon } from "./StepIcons";
import podMacro from "@/assets/smod-pack-front.png";

const STEP_ICONS = [HandDropPodIcon, LoadClothesIcon, SpinWashIcon];

type Shot = { src: string; label: string };

/**
 * Product gallery — a main image with a thumbnail strip, replacing the old
 * auto-advancing carousel. Pouch renders are used for both pack sizes; the pod
 * macro is a single shared asset across every variant. Slots that have no
 * artwork yet render as dashed placeholders rather than breaking the layout.
 */
function Gallery({ variant }: { variant: Variant }) {
  const shots: Shot[] = [
    { src: pouchFor(variant, 40) ?? "", label: "40-pod pouch" },
    { src: pouchFor(variant, 20) ?? "", label: "20-pod pouch" },
    { src: podMacro, label: "Pod macro" },
  ].filter((s) => Boolean(s.src));

  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [variant.slug]);

  const pending = ["In drum", "Lifestyle"];

  return (
    <div>
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-3xl border"
        style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-bg-soft)" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={shots[active]?.src}
            alt={`${variant.name} — ${shots[active]?.label}`}
            className="absolute left-[5%] top-[4%] h-[92%] w-[90%] object-contain"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>

      <div className="mt-3.5 flex gap-2.5">
        {shots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={s.label}
            aria-current={i === active}
            className="relative h-[90px] w-[74px] shrink-0 overflow-hidden rounded-xl border-[1.5px] transition-shadow"
            style={{
              borderColor: i === active ? "var(--brand)" : "color-mix(in oklab, var(--v-ink) 12%, transparent)",
              background: "var(--v-bg-soft)",
              boxShadow: i === active ? "0 0 0 3px color-mix(in oklab, var(--brand) 14%, transparent)" : undefined,
            }}
          >
            <img src={s.src} alt="" className="absolute left-[8%] top-[6%] h-[88%] w-[84%] object-contain" loading="lazy" />
          </button>
        ))}

        {pending.map((label) => (
          <span
            key={label}
            aria-hidden
            className="grid h-[90px] w-[74px] shrink-0 place-items-center rounded-xl border-[1.5px] border-dashed px-1 text-center text-[8.5px] font-extrabold uppercase leading-tight tracking-[0.05em]"
            style={{ borderColor: "color-mix(in oklab, var(--v-ink) 18%, transparent)", color: "#B4BCCB" }}
          >
            {label}
          </span>
        ))}
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
        Pouch renders for both pack sizes. The pod macro is one shared asset across all five
        variants — the two dashed slots are the shots still to be produced.
      </p>
    </div>
  );
}

export function ProductInformation({ variant }: { variant: Variant }) {
  const p = variant.packaging;

  return (
    <section id="product-information" className="section-pad mx-auto max-w-7xl px-5">
      <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
        <p className="eyebrow" style={{ color: "var(--brand)" }}>Product Information</p>
        <h2 className="headline-xl mt-4 text-balance text-4xl md:text-6xl" style={{ color: "var(--v-ink)" }}>
          {p.productName}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
          {p.subtitle}
        </p>
      </div>

      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <Gallery variant={variant} />
        </div>

        {/* Everything below the fold is collapsed — one section open at a time */}
        <div className="md:col-span-7">
          <Accordion type="single" collapsible defaultValue="description" className="w-full">
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
                  <dd className="font-bold">{variant.packs.map((x) => `${x.size} pods`).join(" · ")}</dd>
                  <dt style={{ color: "var(--v-ink-soft)" }}>Net weight</dt>
                  <dd className="font-bold">{p.weight}</dd>
                  <dt style={{ color: "var(--v-ink-soft)" }}>Fragrance</dt>
                  <dd className="font-bold">{p.fragrance}</dd>
                  <dt style={{ color: "var(--v-ink-soft)" }}>Suitable for</dt>
                  <dd className="font-bold">{p.machines.join(" · ")}</dd>
                  <dt style={{ color: "var(--v-ink-soft)" }}>Marketed by</dt>
                  <dd className="font-bold">Vyam Trading Ventures LLP, Coimbatore</dd>
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
                  Anionic &amp; Non-Ionic Surfactants, Enzymes, Glycerin, Colorant, Polyethylene
                  Glycol, Propylene Glycol, Fragrance &amp; Water.
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
        </div>
      </div>

      {/* ---- Directions: original StepIcons, replayed on scroll ---- */}
      <div className="mt-20 text-center">
        <p className="eyebrow" style={{ color: "var(--brand)" }}>Directions for use</p>
        <h3 className="headline-xl mt-4 text-3xl md:text-4xl">Three steps. Zero mess.</h3>

        <div className="relative mt-12 grid gap-10 md:grid-cols-3">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16%] right-[16%] top-24 hidden h-px md:block"
            style={{ background: "repeating-linear-gradient(90deg, var(--brand) 0 8px, transparent 8px 16px)" }}
          />
          {p.directions.slice(0, 3).map((d, i) => {
            const Icon = STEP_ICONS[i] ?? STEP_ICONS[STEP_ICONS.length - 1];
            return (
              <div key={d.step} className="relative flex flex-col items-center text-center">
                <div
                  className="relative grid h-48 w-48 place-items-center rounded-full shadow-xl ring-1 ring-black/5"
                  style={{ background: "var(--v-surface)", color: "var(--brand-deep)" }}
                >
                  <span
                    aria-hidden
                    className="absolute -top-3 left-1/2 z-[2] -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white"
                    style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-deep))" }}
                  >
                    Step {d.step}
                  </span>
                  {i < 2 ? (
                    <ScrollReplayIcon Icon={Icon} className="h-32 w-32" />
                  ) : (
                    <Icon className="h-32 w-32" />
                  )}
                </div>
                <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>{d.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Dosage guide (moved here from the home page) ---- */}
      <div className="mt-20 text-center">
        <p className="eyebrow" style={{ color: "var(--brand)" }}>Dosage guide</p>
        <h3 className="headline-xl mt-4 text-3xl md:text-4xl">One pod goes a long way.</h3>
        <p className="mx-auto mt-4 max-w-lg text-base" style={{ color: "var(--v-ink-soft)" }}>
          Match the number of pods to your load size — no measuring, no guesswork.
        </p>
        <div className="mt-9 grid gap-6 sm:grid-cols-3">
          {p.dosage.map((d, i) => (
            <div
              key={d.load}
              className="rounded-3xl border p-8 text-center"
              style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface, #fff)" }}
            >
              <div className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--v-ink-soft)" }}>
                {d.load}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                {Array.from({ length: i + 1 }).map((_, n) => (
                  <PodMark key={n} />
                ))}
              </div>
              <div className="mt-5 text-2xl font-black" style={{ color: "var(--brand)" }}>{d.pods}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PodMark() {
  return (
    <svg viewBox="0 0 100 100" className="h-9 w-9" aria-hidden style={{ color: "var(--brand)" }}>
      <rect x="20" y="30" width="60" height="42" rx="20" fill="none" stroke="currentColor" strokeWidth="5" />
      <path
        d="M50 40c-6 8-11 13-11 19a11 11 0 0022 0c0-6-5-11-11-19z"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
