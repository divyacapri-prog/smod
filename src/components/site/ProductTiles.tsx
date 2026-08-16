import { Link } from "@tanstack/react-router";
import type { Variant } from "@/lib/variants";

function avgRating(v: Variant) {
  if (!v.testimonials.length) return 0;
  const raw = v.testimonials.reduce((a, t) => a + t.rating, 0) / v.testimonials.length;
  return Math.round(raw * 2) / 2;
}

function Stars({ value }: { value: number }) {
  if (!value) return null;
  const full = Math.floor(value);
  return (
    <span className="text-[12.5px] tracking-[1.5px]" style={{ color: "#E4A23B" }} aria-label={`${value} out of 5`}>
      {"★".repeat(full)}
      {value % 1 ? "½" : ""}
    </span>
  );
}

/**
 * Product tile. Uses the stand-up pouch render rather than the flat pack
 * artwork, which reads as a banner at tile size.
 */
export function ProductTile({ variant, showRank = false }: { variant: Variant; showRank?: boolean }) {
  const image = variant.pouch40 ?? variant.packaging.imageFrontUrl ?? variant.packaging.imageUrl;
  const rating = avgRating(variant);

  return (
    <Link
      to={`/${variant.slug}` as string}
      className="group block overflow-hidden rounded-[20px] border bg-white transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
      style={{ borderColor: "rgba(29,32,41,.1)" }}
    >
      <div
        className="relative aspect-square overflow-hidden"
        style={{ background: "linear-gradient(170deg,#FAF9F7,#EFEDE8)" }}
      >
        {showRank && variant.rank ? (
          <span
            className="absolute left-3 top-3 z-[2] rounded-full px-2.5 py-1 text-[9.5px] font-black uppercase tracking-[0.11em] text-white"
            style={{ background: variant.palette.brand }}
          >
            {variant.rank === 1 ? "#1 Best seller" : `#${variant.rank}`}
          </span>
        ) : null}
        {image ? (
          <img
            src={image}
            alt={`SMOD ${variant.name} pouch`}
            className="absolute left-[4%] top-[3%] h-[94%] w-[92%] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="p-4 pb-5">
        {showRank ? <Stars value={rating} /> : null}
        <h3 className="text-[16.5px] font-black tracking-tight" style={{ color: "#1D2029" }}>
          {variant.name}
        </h3>
        <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: "#5B6472" }}>
          {variant.tagline}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {variant.packs.map((p) => (
            <span
              key={p.sku}
              className="rounded-full border px-2.5 py-1 text-[11px] font-extrabold"
              style={{ borderColor: "rgba(29,32,41,.14)", color: "#1D2029" }}
            >
              {p.size} · ₹{p.price.toLocaleString("en-IN")}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function ProductTileGrid({
  variants,
  showRank = false,
  columns = 5,
}: {
  variants: Variant[];
  showRank?: boolean;
  columns?: 3 | 5;
}) {
  const cols =
    columns === 3
      ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <div className={`${cols} mt-9`}>
      {variants.map((v) => (
        <ProductTile key={v.slug} variant={v} showRank={showRank} />
      ))}
    </div>
  );
}
