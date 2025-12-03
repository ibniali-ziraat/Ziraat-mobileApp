export const menuGroups = [
  {
    title: "Farmer Dashboard",
    routes: [
      { label: "Orchard Profile", screen: "dashboards/(farmer)/OrchardScreen" },
      {
        label: "Weather & Climate",
        screen: "dashboards/(farmer)/WeatherScreen",
      },
      {
        label: "Nutrient Management",
        screen: "dashboards/(farmer)/NutrientScreen",
      },
      {
        label: "Pest & Disease",
        screen: "dashboards/(farmer)/PestDiseaseScreen",
      },
      {
        label: "Resources Usage",
        screen: "dashboards/(farmer)/ResourcesScreen",
      },
      { label: "Financial", screen: "dashboards/(farmer)/FinancialScreen" },
      { label: "Advisory", screen: "dashboards/(farmer)/AdvisoryScreen" },
      { label: "Alerts", screen: "dashboards/(farmer)/AlertScreen" },
    ],
  },

  {
    title: "Vendor Dashboard",
    routes: [
      {
        label: "Become a Supplier",
        screen: "auth/vendor",
      },
      {
        label: "Vendor Profile",
        screen: "auth/vendor/vendor-profile-screen",
      },
      { label: "Profile", screen: "dashboards/(vendor)/ProfileScreen" },
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
];
