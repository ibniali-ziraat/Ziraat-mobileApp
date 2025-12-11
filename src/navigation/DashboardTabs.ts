import * as Lucide from "lucide-react-native";

import AdvisoryProfile from "../app/dashboards/(farmer)/advisory-profile";
import AlertProfile from "../app/dashboards/(farmer)/alert-profile";
import FinancialProfile from "../app/dashboards/(farmer)/financial-profile";
import NutrientProfile from "../app/dashboards/(farmer)/nutrient-profile";
import OrchardProfile from "../app/dashboards/(farmer)/orchard-profile";
import PestDiseaseProfile from "../app/dashboards/(farmer)/pestdisease-profile";
import ResourcesProfile from "../app/dashboards/(farmer)/resources-profile";
import WeatherProfile from "../app/dashboards/(farmer)/weather-profile";
import Delivery from "../app/dashboards/(vendor)/vendor-delivery";
import Profile from "../app/dashboards/(vendor)/vendor-profile";
import SalesScreen from "../app/SalesScreen";
import CreditScreen from "../modules/vendor/screens/CreditScreen";
import FinancialScreen from "../modules/vendor/screens/FinancialScreen";
import NotificationScreen from "../modules/vendor/screens/NotificationScreen";
import OffersScreen from "../modules/vendor/screens/OffersScreen";
import PlatformScreen from "../modules/vendor/screens/PlatformScreen";
import ProductsScreen from "../modules/vendor/screens/ProductsScreen";
import ReportsScreen from "../modules/vendor/screens/ReportsScreen";
import UserScreen from "../modules/vendor/screens/UserScreen";

// ------------------------------
// FINAL REGISTRY WITH ICONS, LABELS & NAME
export const DashboardTabs = {
  // Farmer
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

  // Vendor
  vendorProfile: {
    name: "vendorProfile",
    component: Profile,
    icon: Lucide.User,
    label: "Profile",
    link: "dashboards/vendor-profile",
    role: "supplier",
  },
  vendorSales: {
    name: "vendorSales",
    component: SalesScreen,
    icon: Lucide.ShoppingCart,
    label: "Sales",
    link: "dashboards/vendor-sales",
    role: "supplier",
  },
  vendorNotification: {
    name: "vendorNotification",
    component: NotificationScreen,
    icon: Lucide.Bell,
    label: "Notifications",
    link: "dashboards/vendor-notification",
    role: "supplier",
  },
  vendorUserDetails: {
    name: "vendorUserDetails",
    component: UserScreen,
    icon: Lucide.Users,
    label: "Customers",
    link: "dashboards/vendor-user-details",
    role: "supplier",
  },
  vendorDelivery: {
    name: "vendorDelivery",
    component: Delivery,
    icon: Lucide.Truck,
    label: "Delivery",
    link: "dashboards/vendor-delivery",
    role: "supplier",
  },
  vendorCredits: {
    name: "vendorCredits",
    component: CreditScreen,
    icon: Lucide.DollarSign,
    label: "Credits",
    link: "dashboards/vendor-credits",
    role: "supplier",
  },
  vendorReports: {
    name: "vendorReports",
    component: ReportsScreen,
    icon: Lucide.BarChart2,
    label: "Reports",
    link: "dashboards/vendor-reports",
    role: "supplier",
  },
  vendorFinancial: {
    name: "vendorFinancial",
    component: FinancialScreen,
    icon: Lucide.CreditCard,
    label: "Financial",
    link: "dashboards/vendor-financial",
    role: "supplier",
  },
  
  vendorOffers: {
    name: "vendorOffers",
    component: OffersScreen,
    icon: Lucide.Tag,
    label: "Offers",
    link: "dashboards/vendor-offers",
    role: "supplier",
  },
  vendorPlatform: {
    name: "vendorPlatform",
    component: PlatformScreen,
    icon: Lucide.Server,
    label: "Platform",
    link: "dashboards/vendor-platform",
    role: "supplier",
  },
  vendorProducts: {
    name: "vendorProducts",
    component: ProductsScreen,
    icon: Lucide.Box,
    label: "Products",
    link: "dashboards/vendor-products",
    role: "supplier",
  },
  
  
  
};
