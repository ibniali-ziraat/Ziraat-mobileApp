import {
  Apple,
  Droplets,
  Scissors,
  SprayCan,
  type LucideIcon,
} from "lucide-react-native";
import type { AdvisoryKind } from "../services/farmeradvisories.service";

type Option = { label: string; value: string };

const toOptions = (values: string[]): Option[] =>
  values.map((value) => ({ label: value, value }));

/* ============================== KINDS ============================== */

export const SUPPORTED_KINDS: AdvisoryKind[] = [
  "spray",
  "fertigation",
  "pruning",
  "harvest",
];

export const isSupportedKind = (kind?: string): kind is AdvisoryKind =>
  !!kind && SUPPORTED_KINDS.includes(kind as AdvisoryKind);

export const KIND_META: Record<
  AdvisoryKind,
  { label: string; icon: LucideIcon; formTitle: string }
> = {
  spray: { label: "Spray", icon: SprayCan, formTitle: "Spray details" },
  fertigation: {
    label: "Fertigation",
    icon: Droplets,
    formTitle: "Fertigation details",
  },
  pruning: { label: "Pruning", icon: Scissors, formTitle: "Pruning details" },
  harvest: { label: "Harvest", icon: Apple, formTitle: "Harvest details" },
};

/* ============================== UNITS ============================== */

// first unit of each list is the form default
export const UNITS = {
  // the api only accepts these two for coverage
  coverage: [
    { label: "Hectare (ha)", value: "ha" },
    { label: "Trees", value: "trees" },
  ],
  volume: toOptions(["L", "ml"]),
  dose: toOptions(["ml/100L", "g/100L", "ml/L", "g/L"]),
  productQuantity: toOptions(["ml", "L", "g", "kg"]),
  fertilizerQuantity: toOptions(["kg", "g", "L", "ml"]),
  harvestQuantity: toOptions(["box", "kg", "quintal", "ton"]),
  pricePer: toOptions(["box", "kg", "quintal"]),
};

export const PRUNING_TYPES: Option[] = [
  { label: "Sanitary", value: "sanitary" },
  { label: "Rejuvenation", value: "rejuvenation" },
  { label: "Training", value: "training" },
  { label: "Thinning", value: "thinning" },
];

export const SOLD_OPTIONS: Option[] = [
  { label: "Sold", value: "yes" },
  { label: "Not sold", value: "no" },
];

export const CURRENCY = "INR";
