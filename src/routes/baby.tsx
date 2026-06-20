import { createFileRoute } from "@tanstack/react-router";
import { VariantLanding } from "@/components/site/VariantLanding";
import { getVariant } from "@/lib/variants";

const variant = getVariant("baby")!;

export const Route = createFileRoute("/baby")({
  head: () => ({
    meta: [
      { title: `${variant.name} Pods — Podwash` },
      { name: "description", content: variant.description },
      { property: "og:title", content: `${variant.name} Pods — Podwash` },
      { property: "og:description", content: variant.description },
    ],
  }),
  component: () => <VariantLanding variant={variant} />,
});
