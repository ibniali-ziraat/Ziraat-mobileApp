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
      { label: "Profile", screen: "dashboards/(vendor)/vendor-profile" },
      { label: "User", screen: "dashboards/(vendor)/vendor-user-details" },
      { label: "Reports", screen: "dashboards/(vendor)/vendor-reports" },
      { label: "Credits", screen: "dashboards/(vendor)/vendor-credits" },
      {
        label: "Financial",
        screen: "dashboards/(vendor)/vendor-financial",
      },
      {
        label: "Notifications",
        screen: "dashboards/(vendor)/vendor-notification",
      },
      { label: "Offers", screen: "dashboards/(vendor)/vendor-offers" },
      { label: "Platform", screen: "dashboards/(vendor)/vendor-platform" },
      { label: "Products", screen: "dashboards/(vendor)/vendor-products" },
      { label: "Sales", screen: "dashboards/(vendor)/vendor-sales" },
      { label: "Delivery", screen: "dashboards/(vendor)/vendor-delivery" },
    ],
  },
];
