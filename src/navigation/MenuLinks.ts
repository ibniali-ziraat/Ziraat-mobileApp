import { ROUTES } from "../constants/routes";

export const MenuLinks = {
  farmer: [
    {
      title: "Farmer Settings",
      routes: [
        { label: "Profile", screen: ROUTES.ACCOUNT.PROFILE },
        { label: "Notifications", screen: ROUTES.NOTIFICATIONS },
        { label: "Support", screen: ROUTES.MORE.SUPPORT },
        { label: "Payment Methods", screen: ROUTES.MORE.PAYMENTS },
        { label: "Saved Addresses", screen: ROUTES.ACCOUNT.ADD_ADDRESS },
        { label: "About Us", screen: ROUTES.MORE.ABOUT_US },
        { label: "My Orders", screen: ROUTES.ORDERS.LIST },
        { label: "Discussion", screen: ROUTES.MORE.DISCUSSION },
      ],
    },
  ],
};
