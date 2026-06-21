import { useEffect, useRef, useState } from "react";
import QRCodeLib from "qrcode";
import { track } from "@/lib/analytics";

type Props = {
  value: string;
  sku: string;
  size?: number;
  fg?: string;
  bg?: string;
};

export function QRCode({ value, sku, size = 180, fg = "#000000", bg = "#FFFFFF" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pngUrl, setPngUrl] = useState<string>("");
  const [svgString, setSvgString] = useState<string>("");

  // Encode SKU + scan marker so the buy page can attribute QR scans.
  const trackedValue = value.includes("?") ? `${value}&src=qr&sku=${sku}` : `${value}?src=qr&sku=${sku}`;

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCodeLib.toCanvas(
      canvasRef.current,
      trackedValue,
      { width: size, margin: 1, color: { dark: fg, light: bg }, errorCorrectionLevel: "H" },
      () => {
        if (canvasRef.current) setPngUrl(canvasRef.current.toDataURL("image/png"));
      },
    );
    QRCodeLib.toString(trackedValue, { type: "svg", margin: 1, color: { dark: fg, light: bg }, errorCorrectionLevel: "H" })
      .then(setSvgString)
      .catch(() => setSvgString(""));
  }, [trackedValue, size, fg, bg]);

  const downloadPng = () => {
    if (!pngUrl) return;
    track("qr_download", { sku, format: "png" });
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = `${sku}-qr.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!svgString) return;
    track("qr_download", { sku, format: "svg" });
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sku}-qr.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-2xl p-3" style={{ background: bg, boxShadow: "0 10px 30px -12px rgba(0,0,0,0.25)" }}>
        <canvas ref={canvasRef} aria-label={`QR code for ${sku}`} />
      </div>
      <div className="text-center">
        <p className="font-mono text-xs tracking-widest" style={{ color: "var(--v-ink-soft)" }}>SKU · {sku}</p>
        <div className="mt-1 flex justify-center gap-3 text-xs font-semibold">
          <button onClick={downloadPng} className="underline-offset-4 hover:underline" style={{ color: "var(--brand-deep)" }}>
            PNG
          </button>
          <span style={{ color: "var(--v-ink-soft)" }}>·</span>
          <button onClick={downloadSvg} className="underline-offset-4 hover:underline" style={{ color: "var(--brand-deep)" }}>
            SVG
          </button>
        </div>
      </div>
    </div>
  );
}
