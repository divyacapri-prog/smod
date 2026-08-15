import { useEffect, useState } from "react";
import logoWhite from "@/assets/smod-logo-white.png";
import pods from "@/assets/smod-pack-front.png";
import regular from "@/assets/smod-regular-pack.jpeg";
import socks from "@/assets/smod-socks-pack.jpg";
import sports from "@/assets/smod-sports-pack.jpg";
import innerwear from "@/assets/smod-innerwear-pack.jpg";
import baby from "@/assets/smod-baby-pack.jpg";

const PACKS = [regular, socks, sports, innerwear, baby];

export function Splash() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined" || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto">
      <style>{`
        @keyframes smod-drum { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes smod-pop { 0% { opacity: 0; transform: translateY(16px) scale(.82); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes smod-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
      `}</style>

      {/* full-bleed brand background (covers the whole page) */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(1100px 760px at 50% 26%, #2A3A86, #14172a 68%, #0c0e1a)" }} />

      {/* close */}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 md:right-6 md:top-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="relative flex w-full max-w-md flex-col items-center px-6 py-14 text-center">
        <img src={logoWhite} alt="SMOD" className="mb-8 h-9 w-auto md:h-11" style={{ animation: "smod-pop .6s ease both" }} />

        {/* washing machine with tumbling pods */}
        <div className="relative" style={{ width: "min(66vw, 230px)", animation: "smod-bob 3.2s ease-in-out infinite" }}>
          <div className="relative rounded-[26px] p-4 shadow-2xl" style={{ background: "linear-gradient(160deg,#ffffff,#e6ebf4)", aspectRatio: "1 / 1.08" }}>
            <div className="mb-3 flex items-center justify-end gap-2 pr-1">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#2A3A86" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#756CA1" }} />
              <span className="h-2.5 w-8 rounded-full" style={{ background: "#c9d2e6" }} />
            </div>
            <div className="relative mx-auto grid place-items-center rounded-full" style={{ width: "80%", aspectRatio: "1", background: "#cfd8ea", boxShadow: "inset 0 0 0 10px #eef2f9, inset 0 0 0 15px #b9c4dd" }}>
              <div className="relative overflow-hidden rounded-full" style={{ width: "76%", aspectRatio: "1", background: "radial-gradient(circle at 40% 34%, #e3ebfc, #9db1d8)" }}>
                <img src={pods} alt="" className="absolute left-1/2 top-1/2 h-[80%] w-auto" style={{ animation: "smod-drum 3.6s linear infinite" }} />
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-black text-white md:text-3xl">Meet the SMOD family</h2>
        <p className="mt-2 text-sm text-white/80 md:text-base">One smart pod for every load.</p>

        {/* five packs */}
        <div className="mt-6 flex flex-wrap items-end justify-center gap-2.5">
          {PACKS.map((p, i) => (
            <img
              key={i}
              src={p}
              alt=""
              className="h-14 w-auto rounded-lg shadow-lg md:h-16"
              style={{ opacity: 0, animation: `smod-pop .5s ease ${0.35 + i * 0.28}s both` }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-9 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#2A3A86] shadow-xl transition-transform hover:scale-[1.03]"
        >
          Enter site →
        </button>
      </div>
    </div>
  );
}
