import {
  Activity,
  Building2,
  Droplets,
  Gauge,
  Layers,
  Paperclip,
  Sprout,
  User2,
  Wallet,
  type LucideIcon,
} from "lucide-react-native";
import type { OrchardRouteKey } from "../routes/orchardRoutes";

export type OrchardSectionKey =
  | "basicInfo"
  | "variety"
  | "soilWater"
  | "cropNutrition"
  | "plantProtection"
  | "infrastructure"
  | "productionMarketing"
  | "inputCost"
  | "futureReadiness";

export type OrchardSectionConfig = {
  key: OrchardSectionKey;
  label: string;
  icon: LucideIcon;
  routeKey: OrchardRouteKey;
};

export const ORCHARD_SECTIONS: OrchardSectionConfig[] = [
  {
    key: "basicInfo",
    label: "Basic Info",
    icon: User2,
    routeKey: "basicInformation",
  },
  {
    key: "variety",
    label: "Variety & Planting",
    icon: Sprout,
    routeKey: "varietyAndPlanting",
  },
  {
    key: "soilWater",
    label: "Soil & Water",
    icon: Droplets,
    routeKey: "soilAndWater",
  },
  {
    key: "cropNutrition",
    label: "Crop Nutrition",
    icon: Layers,
    routeKey: "nutrition",
  },
  {
    key: "plantProtection",
    label: "Plant Protection",
    icon: Activity,
    routeKey: "plantProtection",
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    icon: Building2,
    routeKey: "farmInfrastructure",
  },
  {
    key: "productionMarketing",
    label: "Production & Marketing",
    icon: Gauge,
    routeKey: "productionAndMarketing",
  },
  {
    key: "inputCost",
    label: "Input Cost",
    icon: Wallet,
    routeKey: "inputCost",
  },
  {
    key: "futureReadiness",
    label: "Future Readiness",
    icon: Paperclip,
    routeKey: "futureReadiness",
  },
];
