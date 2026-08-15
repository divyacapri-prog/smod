import { useState } from "react";
import pods from "@/assets/smod-pack-front.png";
import regular from "@/assets/smod-regular-pack.jpeg";
import socks from "@/assets/smod-socks-pack.jpg";
import sports from "@/assets/smod-sports-pack.jpg";
import innerwear from "@/assets/smod-innerwear-pack.jpg";
import baby from "@/assets/smod-baby-pack.jpg";

const PACKS = [regular, socks, sports, innerwear, baby];

export function Splash() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative w-full text-white" style={{ background: "linear-gradient(100deg,#1D2029,#2A3A86 55%,#4b4a86)" }}>
      <style>{`@keyframes smod-drum { to { transform: translate(-50%, -50%) rotate(360deg); } }`}</style>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-3 px-4 py-3 pr-12 sm:px-6 md:justify-start">
        {/* mini washing machine with tumbling pod */}
        <div className="relative h-12 w-12 shrink-0 rounded-xl bg-white/95 p-1.5 shadow-lg">
          <div className="relative grid h-full w-full place-items-center rounded-full" style={{ background: "#cfd8ea", boxShadow: "inset 0 0 0 3px #eef2f9" }}>
            <div className="relative h-[70%] w-[70%] overflow-hidden rounded-full" style={{ background: "radial-gradient(circle at 40% 35%,#e3ebfc,#9db1d8)" }}>
              <img src={pods} alt="" className="absolute left-1/2 top-1/2 h-[88%] w-auto" style={{ animation: "smod-drum 3.4s linear infinite" }} />
            </div>
          </div>
        </div>

        {/* tagline */}
        <p className="text-center text-sm font-semibold sm:text-base md:text-left">
          Meet the SMOD family — <span className="text-white/80">one smart pod for every load.</span>
        </p>

        {/* five packs */}
        <div className="flex items-center gap-2 md:ml-auto">
          {PACKS.map((p, i) => (
            <img key={i} src={p} alt="" className="h-9 w-auto rounded-md shadow-md md:h-10" />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 md:top-1/2 md:-translate-y-1/2"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
