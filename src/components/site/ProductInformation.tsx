import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variant } from "@/lib/variants";
import { HandDropPodIcon, LoadClothesIcon, SpinWashIcon, ScrollReplayIcon } from "./StepIcons";

const STEP_ICONS = [HandDropPodIcon, LoadClothesIcon, SpinWashIcon];

function PackCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);
  const go = (n: number) => setI(((n % images.length) + images.length) % images.length);
  return (
    <div
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border p-4 md:p-5"
      style={{
        borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
        background: "var(--v-surface)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={i}
          src={images[i]}
          alt={`${alt} ${i === 0 ? "front" : "back"}`}
          className="h-full w-full cursor-pointer object-contain"
          onClick={() => go(i + 1)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          loading="lazy"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Show image ${idx + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: idx === i ? 22 : 8,
                background: idx === i ? "var(--brand)" : "color-mix(in oklab, var(--v-ink) 25%, transparent)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductInformation({ variant }: { variant: Variant }) {
  const p = variant.packaging;
  return (
    <section id="product-information" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--brand)" }}>
          Product Information
        </p>
        <h2 className="mt-3 text-balance text-4xl font-black tracking-tight md:text-5xl" style={{ color: "var(--v-ink)" }}>
          {p.productName}
        </h2>
        <p className="mt-3 text-base" style={{ color: "var(--v-ink-soft)" }}>{p.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Pack images — carousel that auto-advances */}
        <div className="md:col-span-5">
          {p.imageFrontUrl || p.imageBackUrl ? (
            <PackCarousel
              images={[p.imageFrontUrl, p.imageBackUrl].filter(Boolean) as string[]}
              alt={`${p.productName} packaging`}
            />
          ) : p.imageUrl ? (
            <PackCarousel images={[p.imageUrl]} alt={`${p.productName} packaging`} />
          ) : (
            <div
              className="grid aspect-square place-items-center overflow-hidden rounded-3xl border"
              style={{
                borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
                background: "var(--v-bg-soft)",
                color: "var(--v-ink-soft)",
              }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest">Packaging artwork coming soon</span>
            </div>
          )}
        </div>


        {/* Quick facts */}
        <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
          <FactCard label="Wash count" value={variant.packs.map((x) => `${x.size} pods`).join(" · ")} />
          <FactCard label="Net weight" value={p.weight} />
          <FactCard label="Fragrance" value={p.fragrance} />
          <FactCard label="Suitable for" value={p.machines.join(" · ")} />

          <div className="rounded-3xl border p-5 md:col-span-2" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink-soft)" }}>Marketing highlights</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <span key={h} className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: "var(--brand)" }}>
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key benefits grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {p.benefits.map((b) => (
          <div key={b.title} className="rounded-3xl border p-6" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
            <div className="grid h-11 w-11 place-items-center rounded-xl text-xl" style={{ background: "color-mix(in oklab, var(--brand) 12%, transparent)" }}>
              <span>{b.icon}</span>
            </div>
            <h3 className="mt-3 text-base font-bold" style={{ color: "var(--v-ink)" }}>{b.title}</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--v-ink-soft)" }}>{b.body}</p>
          </div>
        ))}
      </div>

      {/* Directions + dosage */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border p-6" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>Directions for use</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {p.directions.map((d, i) => {
              const Icon = STEP_ICONS[i] ?? STEP_ICONS[STEP_ICONS.length - 1];
              return (
                <div key={d.step} className="flex flex-col items-center text-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full ring-1" style={{ background: "color-mix(in oklab, var(--brand) 14%, var(--v-surface))", color: "var(--brand)", borderColor: "var(--brand)", boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--brand) 35%, transparent)" }}>
                    {i < 2 ? <ScrollReplayIcon Icon={Icon} className="h-16 w-16" /> : <Icon className="h-16 w-16" />}
                  </div>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--brand)" }}>Step {d.step}</p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>{d.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border p-6" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>Dosage guide</p>
          <div className="mt-4 divide-y" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 8%, transparent)" }}>
            {p.dosage.map((d) => (
              <div key={d.load} className="flex items-center justify-between py-3">
                <span className="text-sm" style={{ color: "var(--v-ink-soft)" }}>{d.load}</span>
                <span className="text-sm font-bold" style={{ color: "var(--v-ink)" }}>{d.pods}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caution + certifications */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border p-6" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>Caution & safety</p>
          <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--v-ink)" }}>
            {p.caution.map((c) => (
              <li key={c} className="flex gap-2">
                <span style={{ color: "var(--brand)" }}>•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border p-6" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>Certifications</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.certifications.map((c) => (
              <span key={c} className="rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: "color-mix(in oklab, var(--brand) 30%, transparent)", color: "var(--v-ink)", background: "color-mix(in oklab, var(--brand) 8%, transparent)" }}>
                ✓ {c}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>Claim</p>
          <p className="mt-2 text-sm font-semibold" style={{ color: "var(--v-ink)" }}>{p.claim}</p>
        </div>
      </div>
    </section>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border p-5" style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)", background: "var(--v-surface)" }}>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink-soft)" }}>{label}</p>
      <p className="mt-2 text-base font-bold" style={{ color: "var(--v-ink)" }}>{value}</p>
    </div>
  );
}
