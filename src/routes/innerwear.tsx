import { createFileRoute } from "@tanstack/react-router";
import { VariantLanding } from "@/components/site/VariantLanding";
import { getVariant } from "@/lib/variants";

const variant = getVariant("innerwear")!;

export const Route = createFileRoute("/innerwear")({
  head: () => ({
    meta: [
      { title: `${variant.name} Pods — SMOD` },
      { name: "description", content: variant.description },
      { property: "og:title", content: `${variant.name} Pods — SMOD` },
      { property: "og:description", content: variant.description },
      { property: "og:url", content: "/innerwear" },
    ],
    links: [{ rel: "canonical", href: "/innerwear" }],
  }),
  component: () => <VariantLanding variant={variant} />,
});
