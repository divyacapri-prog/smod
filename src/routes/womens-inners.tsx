import { createFileRoute } from "@tanstack/react-router";
import { VariantLanding } from "@/components/site/VariantLanding";
import { getVariant } from "@/lib/variants";

const variant = getVariant("womens-inners")!;

export const Route = createFileRoute("/womens-inners")({
  head: () => ({
    meta: [
      { title: `${variant.name} Pods — SMOD` },
      { name: "description", content: variant.description },
      { property: "og:title", content: `${variant.name} Pods — SMOD` },
      { property: "og:description", content: variant.description },
    ],
  }),
  component: () => <VariantLanding variant={variant} />,
});
