export const roleMenuGroups = {
  farmer: [
    {
      title: "Farmer Dashboard",
      routes: [
        { label: "Orchard Profile", screen: "dashboards/orchard-profile" },
        { label: "Weather & Climate", screen: "dashboards/weather-profile" },
        { label: "Nutrient Management", screen: "dashboards/nutrient-profile" },
        { label: "Pest & Disease", screen: "dashboards/pestdisease-profile" },
        { label: "Resources Usage", screen: "dashboards/resources-profile" },
        { label: "Financial", screen: "dashboards/financial-profile" },
        { label: "Advisory", screen: "dashboards/advisory-profile" },
        { label: "Alerts", screen: "dashboards/alert-profile" },
      ],
    },
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
    {
      title: "Vendor Dashboard",
      routes: [
        { label: "Become a Supplier", screen: "auth/vendor" },
        { label: "Reports", screen: "dashboards/(vendor)/ReportsScreen" },
        { label: "Credits", screen: "dashboards/(vendor)/CreditScreen" },
        {
          label: "Financial Reports",
          screen: "dashboards/(vendor)/FinancialScreen",
        },
        {
          label: "Notifications",
          screen: "dashboards/(vendor)/NotificationScreen",
        },
        { label: "Offers", screen: "dashboards/(vendor)/OffersScreen" },
        { label: "Platform", screen: "dashboards/(vendor)/PlatformScreen" },
        { label: "Products", screen: "dashboards/(vendor)/ProductsScreen" },
        { label: "Sales", screen: "dashboards/(vendor)/SalesScreen" },
        { label: "Customers", screen: "dashboards/(vendor)/UserScreen" },
      ],
    },
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
