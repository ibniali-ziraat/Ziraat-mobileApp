import { ROUTES } from "../constants/routes";

export const MenuLinks = {
  farmer: [
    {
      title: "Farmer Settings",
      routes: [
        // { label: "Profile", screen: "profile-view" },
        { label: "Notifications", screen: "notifications" },
        // { label: "Support", screen: "settings/farmer/support" },
        // { label: "Payment Methods", screen: "settings/farmer/payments" },
        // { label: "Saved Addresses", screen: "settings/farmer/addresses" },
        { label: "About Us", screen: "about-us" },
        { label: "My Orders", screen: ROUTES.ORDERS.LIST },
        { label: "Chat With Us", screen: "discussion" },
        { label: "Discussion", screen: ROUTES.Discussion.discussionForum },
        { label: "Wallet", screen: ROUTES.PAYMENTMETHOD.Wallet },
        // { label: "Change Password", screen: "user/change-password" },
        // { label: "Delete Account", screen: "user/delete-account"},
      ],
    },
  ],
};
