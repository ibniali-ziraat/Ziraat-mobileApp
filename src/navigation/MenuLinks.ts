import {
  Bell,
  Info,
  LayoutDashboard,
  LifeBuoy,
  MapPin,
  MessagesSquare,
  Settings,
  ShoppingBag,
  type LucideIcon
} from "lucide-react-native";
import { ROUTES } from "../constants/routes";

export type MenuRoute = {
  label: string;
  screen: string;
  icon: LucideIcon;
};

export type MenuGroup = {
  title: string;
  routes: MenuRoute[];
};

export const MenuLinks: { farmer: MenuGroup[] } = {
  farmer: [
    {
      title: "Account",
      routes: [
        { label: "My Orders", screen: ROUTES.ORDERS.LIST, icon: ShoppingBag },
        { label: "Manage Addresses", screen: "/add-addresses", icon: MapPin },
      ],
    },
    {
      title: "Farm",
      routes: [
        {
          label: "Dashboard",
          screen: ROUTES.DASHBOARD.MAIN,
          icon: LayoutDashboard
          ,
        },
        { label: "Notifications", screen: "notifications", icon: Bell },
        {
          label: "Discussion",
          screen: ROUTES.Discussion.discussionForum,
          icon: MessagesSquare,
        },
      ],
    },
    {
      title: "Help",
      routes: [
        // { label: "Chat With Us", screen: ROUTES.CHAT_BOT, icon: Bot },
        { label: "Support", screen: "settings/farmer/support", icon: LifeBuoy },
        { label: "About Us", screen: "about-us", icon: Info },
      ],
    },
    {
      title: "Preferences",
      routes: [{ label: "Settings", screen: ROUTES.SETTINGS, icon: Settings }],
    },
  ],
};
