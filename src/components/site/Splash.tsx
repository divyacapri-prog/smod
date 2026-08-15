import { useEffect, useState } from "react";
import logoWhite from "@/assets/smod-logo-white.png";
import pods from "@/assets/smod-pack-front.png";
import regular from "@/assets/smod-regular-pack.jpeg";
import socks from "@/assets/smod-socks-pack.jpg";
import sports from "@/assets/smod-sports-pack.jpg";
import innerwear from "@/assets/smod-innerwear-pack.jpg";
import baby from "@/assets/smod-baby-pack.jpg";

const PACKS = [regular, socks, sports, innerwear, baby];

export function Splash({ onDone, duration = 6500 }: { onDone: () => void; duration?: number }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), duration);
    const t2 = setTimeout(onDone, duration + 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, onDone]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ transition: "opacity 650ms ease", opacity: leaving ? 0 : 1 }}
    >
      <style>{`
        @keyframes smod-drum { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes smod-pop { 0% { opacity: 0; transform: translateY(16px) scale(.82); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes smod-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes smod-bar { from { width: 0%; } to { width: 100%; } }
        @keyframes smod-bubble { 0% { transform: translateY(0); opacity: 0; } 25% { opacity: .9; } 100% { transform: translateY(-64px); opacity: 0; } }
      `}</style>

      {/* background */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(1100px 760px at 50% 28%, #2A3A86, #14172a 68%, #0c0e1a)" }}
      />

      <div className="relative flex w-full max-w-md flex-col items-center">
        <img
          src={logoWhite}
          alt="SMOD"
          className="mb-8 h-9 w-auto md:h-11"
          style={{ animation: "smod-pop .6s ease both" }}
        />

        {/* washing machine */}
        <div
          className="relative"
          style={{ width: "min(72vw, 250px)", animation: "smod-bob 3.2s ease-in-out infinite" }}
        >
          <div
            className="relative rounded-[26px] p-4 shadow-2xl"
            style={{ background: "linear-gradient(160deg,#ffffff,#e6ebf4)", aspectRatio: "1 / 1.08" }}
          >
            {/* control panel */}
            <div className="mb-3 flex items-center justify-end gap-2 pr-1">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#2A3A86" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#756CA1" }} />
              <span className="h-2.5 w-8 rounded-full" style={{ background: "#c9d2e6" }} />
            </div>
            {/* door */}
            <div
              className="relative mx-auto grid place-items-center rounded-full"
              style={{ width: "80%", aspectRatio: "1", background: "#cfd8ea", boxShadow: "inset 0 0 0 10px #eef2f9, inset 0 0 0 15px #b9c4dd" }}
            >
              <div
                className="relative overflow-hidden rounded-full"
                style={{ width: "76%", aspectRatio: "1", background: "radial-gradient(circle at 40% 34%, #e3ebfc, #9db1d8)" }}
              >
                <img
                  src={pods}
                  alt=""
                  className="absolute left-1/2 top-1/2 h-[80%] w-auto"
                  style={{ animation: "smod-drum 3.6s linear infinite" }}
                />
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="absolute bottom-3 rounded-full bg-white/70"
                    style={{ left: `${16 + i * 21}%`, width: 8, height: 8, animation: `smod-bubble ${2.2 + i * 0.4}s ease-in ${i * 0.5}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* five variant packs */}
        <div className="mt-8 flex flex-wrap items-end justify-center gap-2.5 md:gap-3">
          {PACKS.map((p, i) => (
            <img
              key={i}
              src={p}
              alt=""
              className="h-14 w-auto rounded-lg shadow-lg md:h-16"
              style={{ opacity: 0, animation: `smod-pop .5s ease ${0.5 + i * 0.3}s both` }}
            />
          ))}
        </div>

        {/* progress */}
        <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#756CA1,#ffffff)", animation: `smod-bar ${duration}ms linear forwards` }}
          />
        </div>
        <p className="mt-4 text-sm font-medium tracking-wide text-white/80">Loading a smarter wash…</p>
      </div>
    </div>
  );
}
