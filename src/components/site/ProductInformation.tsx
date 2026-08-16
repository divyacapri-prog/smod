import type { Variant } from "@/lib/variants";
import { HandDropPodIcon, LoadClothesIcon, SpinWashIcon, ScrollReplayIcon } from "./StepIcons";

const STEP_ICONS = [HandDropPodIcon, LoadClothesIcon, SpinWashIcon];

/**
 * Directions for use and the dosage guide.
 *
 * The gallery moved to ProductGallery (shown in the page hero) and the spec
 * cards moved to ProductDetails (the accordion in the buy column), so this is
 * now the two things that genuinely want full width and their own space.
 *
 * Step icons and their scroll-replay behaviour are unchanged from StepIcons.tsx.
 */
export function ProductInformation({ variant }: { variant: Variant }) {
  const p = variant.packaging;

  return (
    <section id="product-information" className="section-pad mx-auto max-w-7xl px-5">
      {/* ---- Directions ---- */}
      <div className="text-center">
        <p className="eyebrow" style={{ color: "var(--brand)" }}>Directions for use</p>
        <h2 className="headline-xl mt-4 text-balance text-4xl md:text-5xl" style={{ color: "var(--v-ink)" }}>
          Three steps. Zero mess.
        </h2>
      </div>

      <div className="relative mt-12 grid gap-12 sm:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-10">
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
                className="smod-step-disc relative grid h-48 w-48 place-items-center rounded-full shadow-xl ring-1 ring-black/5"
                style={{ background: "var(--v-surface)", color: "var(--brand-deep)" }}
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 z-[2] -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white"
                  style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-deep))" }}
                >
                  Step {d.step}
                </span>
                {i < 2 ? <ScrollReplayIcon Icon={Icon} className="h-32 w-32" /> : <Icon className="h-32 w-32" />}
              </div>
              <p className="mt-6 max-w-[26ch] text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
                {d.body}
              </p>
            </div>
          );
        })}
      </div>

      {/* ---- Dosage ---- */}
      <div className="mt-24 text-center">
        <p className="eyebrow" style={{ color: "var(--brand)" }}>Dosage guide</p>
        <h2 className="headline-xl mt-4 text-balance text-4xl md:text-5xl" style={{ color: "var(--v-ink)" }}>
          One pod goes a long way.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--v-ink-soft)" }}>
          Match the number of pods to your load size — no measuring, no guesswork.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3 md:mt-12 md:gap-6">
          {p.dosage.map((d, i) => (
            <div
              key={d.load}
              className="rounded-3xl border p-8 text-center"
              style={{
                borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
                background: "var(--v-surface, #fff)",
              }}
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
