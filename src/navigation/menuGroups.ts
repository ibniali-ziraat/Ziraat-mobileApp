export const menuGroups = [
  {
    title: "Farmer Dashboard",
    routes: [
      { label: "Orchard Profile", screen: "dashboards/orchard-profile" },
      {
        label: "Weather & Climate",
        screen: "dashboards/weather-profile",
      },
      {
        label: "Nutrient Management",
        screen: "dashboards/nutrient-profile",
      },
      {
        label: "Pest & Disease",
        screen: "dashboards/pestdisease-profile",
      },
      {
        label: "Resources Usage",
        screen: "dashboards/resources-profile",
      },
      { label: "Financial", screen: "dashboards/financial-profile" },
      { label: "Advisory", screen: "dashboards/advisory-profile" },
      { label: "Alerts", screen: "dashboards/alert-profile" },
    ],
  },

  {
    title: "Vendor Dashboard",
    routes: [
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
