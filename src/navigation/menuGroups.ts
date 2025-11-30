export const menuGroups = [
  {
    title: "Farmer Dashboard",
    routes: [
      { label: "Orchard Profile", screen: "(farmer)/OrchardScreen" },
      { label: "Weather & Climate", screen: "(farmer)/WeatherScreen" },
      {
        label: "Nutrient Management",
        screen: "(farmer)/NutrientScreen",
      },
      {
        label: "Pest & Disease",
        screen: "(farmer)/PestDiseaseScreen",
      },
      { label: "Resources Usage", screen: "(farmer)/ResourcesScreen" },
      { label: "Financial", screen: "(farmer)/FinancialScreen" },
      { label: "Advisory", screen: "(farmer)/AdvisoryScreen" },
      { label: "Alerts", screen: "(farmer)/AlertScreen" },
    ],
  },

  {
    title: "Vendor Dashboard",
    routes: [
      { label: "Profile", screen: "(vendor)/ProfileScreen" },
      { label: "Reports", screen: "(vendor)/ReportsScreen" },
      { label: "Credits", screen: "(vendor)/CreditScreen" },
      {
        label: "Financial Reports",
        screen: "(vendor)/FinancialScreen",
      },
      {
        label: "Notifications",
        screen: "(vendor)/NotificationScreen",
      },
      { label: "Offers", screen: "(vendor)/OffersScreen" },
      { label: "Platform", screen: "(vendor)/PlatformScreen" },
      { label: "Products", screen: "(vendor)/ProductsScreen" },
      { label: "Sales", screen: "(vendor)/SalesScreen" },
      { label: "Customers", screen: "(vendor)/UserScreen" },
    ],
  },
];
