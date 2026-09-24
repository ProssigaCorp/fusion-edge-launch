import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fusion Edge Media | Connecting Continents in Filmmaking" },
      { name: "description", content: "Fusion Edge Media is an international film production and media company connecting filmmakers, stories and audiences across borders." },
      { property: "og:title", content: "Fusion Edge Media | Connecting Continents in Filmmaking" },
      { property: "og:description", content: "International film production connecting filmmakers, stories and audiences across borders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://fusionedgemedia.com/" }],
  }),
  component: LandingPage,
});
