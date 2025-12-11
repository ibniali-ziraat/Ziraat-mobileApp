export const MenuLinks = {
  farmer: [
    {
      title: "Farmer Settings",
      routes: [
        { label: "Profile", screen: "settings/farmer/profile" },
        { label: "Notifications", screen: "settings/farmer/notifications" },
        { label: "Support", screen: "settings/farmer/support" },
        { label: "Payment Methods", screen: "settings/farmer/payments" },
        { label: "Saved Addresses", screen: "settings/farmer/addresses" },
      ],
    },
  ],

  supplier: [
    // {
    //   title: "Vendor Actions",
    //   routes: [{ label: "Become a Supplier", screen: "auth/vendor" }],
    // },
    {
      title: "Vendor Settings",
      routes: [
        { label: "Profile Settings", screen: "settings/vendor/profile" },
        { label: "Notifications", screen: "settings/vendor/notifications" },
        { label: "Support", screen: "settings/vendor/support" },
        { label: "Payment Methods", screen: "settings/vendor/payments" },
        { label: "Store Settings", screen: "settings/vendor/store" },
      ],
    },
  ],
};
