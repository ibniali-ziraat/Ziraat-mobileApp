export const orchardRoutes = {
  basicInformation: "orchards/basic-info",
  crop: "orchards/crop-info",
  farm: "orchards/farm-info",
  varietyAndPlanting: "orchards/variety-info",
  soilAndWater: "orchards/soil-water-info",
  nutrition: "orchards/crop-info",
  plantProtection: "orchards/plant-protection-info",
  farmInfrastructure: "orchards/farm-info",
  productionAndMarketing: "orchards/production-info",
  inputCost: "orchards/inputcost-info",
  futureReadiness: "orchards/future-info",
} as const;

export type OrchardRouteKey = keyof typeof orchardRoutes;
