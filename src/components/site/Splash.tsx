import { useEffect, useState } from "react";
import { HeroPods } from "./HeroPods";
import { HeroWaterFX } from "./HeroWaterFX";
import logoWhite from "@/assets/smod-logo-white.png";

const SEEN_KEY = "smod:entered";

/**
 * Landing gate — full-screen intro shown before the site.
 *
 * Carries the "Smarter wash. Starts here." line; clicking Enter reveals the
 * main page underneath. Shown once per browser session (sessionStorage), so
 * returning to the home page mid-visit doesn't re-gate the user.
 *
 * Renders nothing on the server and on the first client paint — mounting is
 * deferred to an effect so SSR markup and hydration always agree.
 */
export function Splash() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private mode or storage disabled — just show it.
    }
    setOpen(!seen);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const enter = () => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore
    }
    setLeaving(true);
    window.setTimeout(() => setOpen(false), 520);
  };

  if (!ready || !open) return null;

  return (
    <div
      className={`smod-gate${leaving ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to SMOD"
    >
      <div className="smod-gate-inner">
        <div className="smod-gate-art">
          <HeroWaterFX layer="back" />
          <HeroPods />
          <HeroWaterFX layer="front" />
        </div>

        <div className="smod-gate-copy">
          <img src={logoWhite} alt="SMOD" className="h-11 w-auto md:h-14" />
          <p
            className="mt-7 text-[15px] font-black uppercase tracking-[0.16em] md:text-[19px]"
            style={{ color: "var(--accent, #C9BEF2)" }}
          >
            Detergent, redesigned
          </p>
          <h1 className="headline-2xl mt-4 text-balance text-4xl leading-[1.02] text-white md:text-6xl lg:text-7xl">
            Smarter wash.
            <br />
            Starts here.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            Pre-measured 4-in-1 pods that dissolve right in the drum — detergent, softener,
            freshness and anti-microbial, sealed into one. No measure, no mess.
          </p>

          <button
            type="button"
            onClick={enter}
            autoFocus
            className="mt-10 rounded-full bg-white px-11 py-4 text-sm font-bold uppercase tracking-wider shadow-2xl transition-transform hover:scale-[1.04]"
            style={{ color: "var(--brand, #2A3A86)" }}
          >
            Enter site →
          </button>

          <button
            type="button"
            onClick={enter}
            className="mt-5 block text-xs font-bold uppercase tracking-[0.25em] text-white/60 underline-offset-4 transition-colors hover:text-white"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
