// Lightweight analytics tracker. Logs to console and pushes to window.dataLayer
// so GTM / GA4 / Segment can consume the events without extra wiring.

export type AnalyticsEvent =
  | "qr_scan"
  | "qr_download"
  | "add_to_cart"
  | "checkout_started"
  | "purchase_completed"
  | "retailer_click";

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}) {
  const payload = { event, ts: Date.now(), ...props };
  if (typeof window !== "undefined") {
    // @ts-expect-error - dataLayer is an arbitrary global
    window.dataLayer = window.dataLayer || [];
    // @ts-expect-error
    window.dataLayer.push(payload);
  }
  if (typeof console !== "undefined") {
    console.info("[analytics]", payload);
  }
}
