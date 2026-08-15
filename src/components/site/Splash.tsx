import { useEffect, useState } from "react";
import logo from "@/assets/smod-logo.png";
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        background: "linear-gradient(180deg,#ffffff 0%,#eaf0ff 100%)",
      }}
    >
      <style>{`
        @keyframes smod-drum { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes smod-pop { 0% { opacity: 0; transform: translateY(14px) scale(.85); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      {/* close */}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close"
        style={{ position: "absolute", top: 16, right: 16 }}
        className="grid h-10 w-10 place-items-center rounded-full bg-black/10 text-[#1D2029] transition-colors hover:bg-black/20"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="flex w-full max-w-lg flex-col items-center px-6 py-10 text-center">
        <img src={logo} alt="SMOD" className="h-8 w-auto md:h-9" />
        <h2 className="mt-6 text-2xl font-black text-[#1D2029] md:text-3xl">Meet the SMOD family</h2>
        <p className="mt-2 text-sm text-[#5B6472] md:text-base">One smart pod for every load.</p>

        {/* five packs — the showcase */}
        <div className="mt-7 flex flex-wrap items-end justify-center gap-3">
          {PACKS.map((p, i) => (
            <img
              key={i}
              src={p}
              alt=""
              className="h-20 w-auto rounded-xl shadow-lg sm:h-24 md:h-28"
              style={{ opacity: 0, animation: `smod-pop .5s ease ${0.1 + i * 0.12}s both` }}
            />
          ))}
        </div>

        {/* washing machine with tumbling pods */}
        <div className="relative mt-8" style={{ width: 150 }}>
          <div className="relative rounded-2xl p-3 shadow-xl" style={{ background: "linear-gradient(160deg,#eef2fb,#d6dff2)", aspectRatio: "1 / 1.08" }}>
            <div className="mb-2 flex items-center justify-end gap-1.5 pr-1">
              <span className="h-2 w-2 rounded-full" style={{ background: "#2A3A86" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "#756CA1" }} />
              <span className="h-2 w-6 rounded-full" style={{ background: "#b9c4dd" }} />
            </div>
            <div className="relative mx-auto grid place-items-center rounded-full" style={{ width: "80%", aspectRatio: "1", background: "#c3cee6", boxShadow: "inset 0 0 0 7px #eef2f9, inset 0 0 0 10px #aab8d6" }}>
              <div className="relative overflow-hidden rounded-full" style={{ width: "76%", aspectRatio: "1", background: "radial-gradient(circle at 40% 34%, #eaf0ff, #9db1d8)" }}>
                <img src={pods} alt="" className="absolute left-1/2 top-1/2 h-[82%] w-auto" style={{ animation: "smod-drum 3.6s linear infinite" }} />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-9 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-transform hover:scale-[1.03]"
          style={{ background: "#2A3A86" }}
        >
          Enter site →
        </button>
      </div>
    </div>
  );
}
