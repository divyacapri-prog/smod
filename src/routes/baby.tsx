import { createFileRoute } from "@tanstack/react-router";
import { VariantLanding } from "@/components/site/VariantLanding";
import { getVariant } from "@/lib/variants";

const variant = getVariant("baby")!;

export const Route = createFileRoute("/baby")({
  head: () => ({
    meta: [
      { title: `${variant.name} Pods — SMOD` },
      { name: "description", content: variant.description },
      { property: "og:title", content: `${variant.name} Pods — SMOD` },
      { property: "og:description", content: variant.description },
      { property: "og:url", content: "/baby" },
    ],
    links: [{ rel: "canonical", href: "/baby" }],
  }),
  component: () => <VariantLanding variant={variant} />,
});
