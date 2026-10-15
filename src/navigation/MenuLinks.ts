import {
  Bell,
  MapPin,
  MessagesSquare,
  Settings,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react-native";
import { menuArt } from "../constants/iconArt";
import { ROUTES } from "../constants/routes";

export type MenuRoute = {
  label: string;
  screen: string;
  icon: LucideIcon;
  /** Full-colour icon from `menuArt`; drawn in place of `icon`. */
  art?: string;
  /** Pastel fill behind the icon. */
  tint?: string;
  /** One-line description under the label. */
  hint?: string;
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
        {
          label: "My Orders",
          screen: ROUTES.ORDERS.LIST,
          icon: ShoppingBag,
          art: menuArt.orders,
          tint: "#FFF1EA",
          hint: "Track and manage your purchases",
        },
        {
          label: "Manage Addresses",
          screen: "/add-addresses",
          icon: MapPin,
          art: menuArt.addresses,
          tint: "#EAF5E4",
          hint: "Delivery locations",
        },
      ],
    },
    {
      title: "Farm",
      routes: [
        // {
        //   label: "Dashboard",
        //   screen: ROUTES.DASHBOARD.MAIN,
        //   icon: LayoutDashboard
        //   ,
        // },
        {
          label: "Notifications",
          screen: "notifications",
          icon: Bell,
          art: menuArt.notifications,
          tint: "#FFF8E1",
          hint: "Alerts and updates",
        },
        {
          label: "Discussion",
          screen: ROUTES.Discussion.discussionForum,
          icon: MessagesSquare,
          art: menuArt.discussion,
          tint: "#E6F3FC",
          hint: "Ask and learn from farmers",
        },
      ],
    },
    // {
    //   title: "Help",
    //   routes: [
    //     { label: "Chat With Us", screen: ROUTES.CHAT_BOT, icon: Bot },
    //     { label: "Support", screen: "settings/farmer/support", icon: LifeBuoy },
    //     { label: "About Us", screen: "about-us", icon: Info },
    //   ],
    // },
    {
      title: "Preferences",
      routes: [
        {
          label: "Settings",
          screen: ROUTES.SETTINGS,
          icon: Settings,
          art: menuArt.settings,
          tint: "#F1ECFA",
          hint: "Language, account and app",
        },
      ],
    },
  ],
};
