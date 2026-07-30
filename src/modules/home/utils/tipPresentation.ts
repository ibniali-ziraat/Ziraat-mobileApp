import {
  Droplets,
  Leaf,
  ShieldCheck,
  Sun,
  type LucideIcon,
} from "lucide-react-native";
import type { FarmerDashboardTip } from "../types/farmerDashboard";

export type TipPresentation = {
  icon: LucideIcon;
  description: string;
  warning: string | null;
};

/** Copy for the tip codes the advisory API is known to send. */
const presentations: Record<string, Omit<TipPresentation, "warning">> = {
  "protective-gear": {
    icon: ShieldCheck,
    description: "Use gloves, masks, and eyewear while spraying pesticides.",
  },
  "early-irrigation": {
    icon: Droplets,
    description: "Reduces evaporation and ensures deeper soil penetration.",
  },
  "organic-fertilizers": {
    icon: Leaf,
    description: "Improves soil health naturally and enhances crop quality.",
  },
  "weather-before-spraying": {
    icon: Sun,
    description: "Avoid windy or rainy conditions to prevent chemical drift.",
  },
};

const warnings: { match: string; text: string }[] = [
  { match: "spray", text: "Avoid spraying during rain or strong winds." },
  { match: "irrigate", text: "Best done early morning or late evening." },
];

const getWarning = (title: string): string | null =>
  warnings.find((warning) => title.toLowerCase().includes(warning.match))
    ?.text ?? null;

/**
 * Anything the API sends wins; the map above only fills in for known codes it
 * ships without copy.
 */
export const getTipPresentation = (
  tip: FarmerDashboardTip,
): TipPresentation => {
  const known = presentations[tip.code];

  return {
    icon: known?.icon ?? Leaf,
    description: tip.description ?? tip.detail ?? known?.description ?? "",
    warning: tip.warning ?? getWarning(tip.title ?? ""),
  };
};
