import { useEffect, useState } from "react";
import { HeroWaterFX } from "./HeroWaterFX";
import logoWhite from "@/assets/smod-logo-white.png";
import pods from "@/assets/smod-pack-front.png";

const SEEN_KEY = "smod:entered";

/**
 * Landing gate — full-screen intro shown before the site.
 *
 * Single centred column: pods, then copy, then the enter button. Laying it out
 * as one column (rather than a two-up grid) is what makes it work on a phone —
 * the previous version centred an overflowing grid, which pushed the copy off
 * the top of the viewport and read as a blank screen on small heights.
 *
 * Shown once per browser session. Renders nothing on the server and on the
 * first client paint, so SSR markup and hydration always agree.
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

  // iOS Safari ignores `overflow: hidden` on body for scroll locking, which let
  // the page behind the gate scroll into view. Pinning the body with
  // `position: fixed` is the reliable fix; the offset is restored on close.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
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
          <img src={pods} alt="SMOD laundry pods" className="smod-gate-pods" />
          <HeroWaterFX layer="front" />
        </div>

        <img src={logoWhite} alt="SMOD" className="smod-gate-logo" />

        <p className="smod-gate-eyebrow">Detergent, redesigned</p>

        <h1 className="smod-gate-title">
          Smarter wash&hellip;
          <br />
          starts here.
        </h1>

        <p className="smod-gate-sub">
          Pre-measured 4-in-1 pods that dissolve right in the drum — detergent, softener,
          fragrance and anti-microbial, sealed into one. No measure, no mess.
        </p>

        <button type="button" onClick={enter} autoFocus className="smod-gate-btn">
          Enter site →
        </button>
      </div>
    </div>
  );
}
