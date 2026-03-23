import * as Lucide from "lucide-react-native";

import AdvisoryProfile from "../app/(dashboards)/(sections)/advisory-profile";
import AlertProfile from "../app/(dashboards)/(sections)/alert-profile";
import FinancialProfile from "../app/(dashboards)/(sections)/financial-profile";
import NutrientProfile from "../app/(dashboards)/(sections)/nutrient-profile";
import OrchardProfile from "../app/(dashboards)/(sections)/orchard-profile";
import PestDiseaseProfile from "../app/(dashboards)/(sections)/pest-disease-profile";
import ResourcesProfile from "../app/(dashboards)/(sections)/resources-profile";
import WeatherProfile from "../app/(dashboards)/(sections)/weather-profile";
import { ROUTES } from "../constants/routes";

export const DashboardTabs = {
  orchardProfile: {
    name: "orchardProfile",
    component: OrchardProfile,
    icon: Lucide.TreeDeciduous,
    label: "Orchard Profile",
    link: ROUTES.DASHBOARD.ORCHARD_PROFILE,
    role: "farmer",
  },
  weatherProfile: {
    name: "weatherProfile",
    component: WeatherProfile,
    icon: Lucide.CloudSun,
    label: "Weather & Climate",
    link: ROUTES.DASHBOARD.WEATHER_PROFILE,
    role: "farmer",
  },
  nutrientProfile: {
    name: "nutrientProfile",
    component: NutrientProfile,
    icon: Lucide.Droplet,
    label: "Nutrient Management",
    link: ROUTES.DASHBOARD.NUTRIENT_PROFILE,
    role: "farmer",
  },
  pestDiseaseProfile: {
    name: "pestDiseaseProfile",
    component: PestDiseaseProfile,
    icon: Lucide.Bug,
    label: "Pest & Disease",
    link: ROUTES.DASHBOARD.PEST_DISEASE_PROFILE,
    role: "farmer",
  },
  resourcesProfile: {
    name: "resourcesProfile",
    component: ResourcesProfile,
    icon: Lucide.Package,
    label: "Resources Usage",
    link: ROUTES.DASHBOARD.RESOURCES_PROFILE,
    role: "farmer",
  },
  financialProfile: {
    name: "financialProfile",
    component: FinancialProfile,
    icon: Lucide.CreditCard,
    label: "Financial",
    link: ROUTES.DASHBOARD.FINANCIAL_PROFILE,
    role: "farmer",
  },
  advisoryProfile: {
    name: "advisoryProfile",
    component: AdvisoryProfile,
    icon: Lucide.MessageSquare,
    label: "Advisory",
    link: ROUTES.DASHBOARD.ADVISORY_PROFILE,
    role: "farmer",
  },
  alertProfile: {
    name: "alertProfile",
    component: AlertProfile,
    icon: Lucide.Bell,
    label: "Alerts",
    link: ROUTES.DASHBOARD.ALERT_PROFILE,
    role: "farmer",
  },
};
