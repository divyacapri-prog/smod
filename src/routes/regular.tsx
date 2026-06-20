import { createFileRoute } from "@tanstack/react-router";
import { VariantLanding } from "@/components/site/VariantLanding";
import { getVariant } from "@/lib/variants";

const variant = getVariant("regular")!;

export const Route = createFileRoute("/regular")({
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
