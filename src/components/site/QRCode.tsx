import { useEffect, useRef, useState } from "react";
import QRCodeLib from "qrcode";

type Props = {
  value: string;
  sku: string;
  size?: number;
  fg?: string;
  bg?: string;
};

export function QRCode({ value, sku, size = 180, fg = "#000000", bg = "#FFFFFF" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCodeLib.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin: 1,
        color: { dark: fg, light: bg },
        errorCorrectionLevel: "H",
      },
      () => {
        if (canvasRef.current) setDataUrl(canvasRef.current.toDataURL("image/png"));
      },
    );
  }, [value, size, fg, bg]);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${sku}-qr.png`;
    a.click();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-2xl p-3"
        style={{ background: bg, boxShadow: "0 10px 30px -12px rgba(0,0,0,0.25)" }}
      >
        <canvas ref={canvasRef} aria-label={`QR code for ${sku}`} />
      </div>
      <div className="text-center">
        <p className="font-mono text-xs tracking-widest" style={{ color: "var(--v-ink-soft)" }}>
          SKU · {sku}
        </p>
        <button
          onClick={download}
          className="mt-1 text-xs font-semibold underline-offset-4 hover:underline"
          style={{ color: "var(--brand-deep)" }}
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}
