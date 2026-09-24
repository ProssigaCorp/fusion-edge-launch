import genesisHero from "@/assets/genesis-hero.jpg";
import journeyAsset from "@/assets/cherans-journey.jpg.asset.json";
import enthiranAsset from "@/assets/enthiran-hero.webp.asset.json";
import studioAsset from "@/assets/studio-history.jpg.asset.json";
import distributionOneAsset from "@/assets/distribution-one.jpg.asset.json";
import distributionTwoAsset from "@/assets/distribution-two.jpg.asset.json";

export type Project = {
  title: string;
  kicker: string;
  subline: string;
  body: string;
  image: string;
  alt: string;
  year: string;
  position?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export const heroProjects: Project[] = [
  {
    title: "Genesis",
    kicker: "In production",
    subline: "The Visual Bible Project",
    body: "A full-length feature film in production for Nations Reach International Missions, expanding the chapter-based Genesis visual series into a cinematic experience.",
    image: genesisHero,
    alt: "A cinematic primordial coastline at first light",
    year: "2026—",
    position: "center",
    primary: { label: "Explore Genesis", href: "#genesis" },
    secondary: { label: "Watch chapters", href: "https://nrim.org/watch/" },
  },
  {
    title: "Cheran’s Journey",
    kicker: "Now streaming",
    subline: "SonyLIV · 9 episodes",
    body: "A compelling drama from five-time National Award-winning director Cheran, produced in collaboration with Fusion Edge Media.",
    image: journeyAsset.url,
    alt: "Official artwork for Cheran’s Journey",
    year: "2024",
    position: "center 30%",
    primary: { label: "Watch now", href: "https://www.sonyliv.com/shows/cherans-journey-marathi-1700001370" },
    secondary: { label: "View project", href: "#featured" },
  },
  {
    title: "Enthiran / Robot",
    kicker: "Selected work",
    subline: "Cross-continental production",
    body: "A landmark collaboration connecting Indian feature filmmaking with Hollywood effects expertise and more than 180 international crew members.",
    image: enthiranAsset.url,
    alt: "Behind-the-scenes production image from Enthiran",
    year: "2010",
    position: "center",
    primary: { label: "View project", href: "#selected-work" },
    secondary: { label: "Watch BTS", href: "https://www.youtube.com/watch?v=cuzsQqCcm8c" },
  },
];

export const selectedWork = [
  { title: "Enthiran / Robot", year: "2010", label: "International production", image: enthiranAsset.url, alt: "Enthiran production still" },
  { title: "Peraanmai", year: "2009", label: "Selected work", image: studioAsset.url, alt: "Fusion Edge production behind the scenes" },
  { title: "Blood & Curry", year: "2011", label: "International feature", image: distributionOneAsset.url, alt: "Blood & Curry film artwork" },
  { title: "The Norwegian", year: "2012", label: "International feature", image: distributionTwoAsset.url, alt: "The Norwegian film artwork" },
];

export const studioImage = studioAsset.url;
