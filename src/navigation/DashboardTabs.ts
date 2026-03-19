import * as Lucide from "lucide-react-native";

import AdvisoryProfile from "../app/(dashboards)/(sections)/advisory-profile";
import AlertProfile from "../app/(dashboards)/(sections)/alert-profile";
import FinancialProfile from "../app/(dashboards)/(sections)/financial-profile";
import NutrientProfile from "../app/(dashboards)/(sections)/nutrient-profile";
import OrchardProfile from "../app/(dashboards)/(sections)/orchard-profile";
import PestDiseaseProfile from "../app/(dashboards)/(sections)/pestdisease-profile";
import ResourcesProfile from "../app/(dashboards)/(sections)/resources-profile";
import WeatherProfile from "../app/(dashboards)/(sections)/weather-profile";

export const DashboardTabs = {
  orchardProfile: {
    name: "orchardProfile",
    component: OrchardProfile,
    icon: Lucide.TreeDeciduous,
    label: "Orchard Profile",
    link: "dashboards/orchard-profile",
    role: "farmer",
  },
  weatherProfile: {
    name: "weatherProfile",
    component: WeatherProfile,
    icon: Lucide.CloudSun,
    label: "Weather & Climate",
    link: "dashboards/weather-profile",
    role: "farmer",
  },
  nutrientProfile: {
    name: "nutrientProfile",
    component: NutrientProfile,
    icon: Lucide.Droplet,
    label: "Nutrient Management",
    link: "dashboards/nutrient-profile",
    role: "farmer",
  },
  pestDiseaseProfile: {
    name: "pestDiseaseProfile",
    component: PestDiseaseProfile,
    icon: Lucide.Bug,
    label: "Pest & Disease",
    link: "dashboards/pestdisease-profile",
    role: "farmer",
  },
  resourcesProfile: {
    name: "resourcesProfile",
    component: ResourcesProfile,
    icon: Lucide.Package,
    label: "Resources Usage",
    link: "dashboards/resources-profile",
    role: "farmer",
  },
  financialProfile: {
    name: "financialProfile",
    component: FinancialProfile,
    icon: Lucide.CreditCard,
    label: "Financial",
    link: "dashboards/financial-profile",
    role: "farmer",
  },
  advisoryProfile: {
    name: "advisoryProfile",
    component: AdvisoryProfile,
    icon: Lucide.MessageSquare,
    label: "Advisory",
    link: "dashboards/advisory-profile",
    role: "farmer",
  },
  alertProfile: {
    name: "alertProfile",
    component: AlertProfile,
    icon: Lucide.Bell,
    label: "Alerts",
    link: "dashboards/alert-profile",
    role: "farmer",
  },
};
