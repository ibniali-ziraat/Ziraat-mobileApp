export const orchardDeleteConfig = {
  address: {
    success: "Orchard address deleted successfully",
    queryKey: "orchardAddress",
  },
  geoLocation: {
    success: "Geo location deleted successfully",
    queryKey: "orchardGeoLocation",
  },
  varietyAndPlanting: {
    success: "Variety & planting details deleted successfully",
    queryKey: "orchardVarietyAndPlanting",
  },
  soilAndWater: {
    success: "Soil & water details deleted successfully",
    queryKey: "orchardSoilAndWater",
  },
  cropAndNutrition: {
    success: "Crop & nutrition details deleted successfully",
    queryKey: "orchardCropAndNutrition",
  },
  plantProtection: {
    success: "Plant protection details deleted successfully",
    queryKey: "orchardPlantProtection",
  },
  farmInfrastructure: {
    success: "Farm infrastructure deleted successfully",
    queryKey: "orchardFarmInfrastructure",
  },
  productionAndMarketing: {
    success: "Production & marketing deleted successfully",
    queryKey: "orchardProductionAndMarketing",
  },
  inputCost: {
    success: "Input cost details deleted successfully",
    queryKey: "orchardInputCost",
  },
  futureReadiness: {
    success: "Future readiness & linkages deleted successfully",
    queryKey: "orchardFutureReadiness",
  },
} as const;

export type OrchardDeleteKey = keyof typeof orchardDeleteConfig;
