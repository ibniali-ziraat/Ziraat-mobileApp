import { useMutation, useQuery } from "@tanstack/react-query";

import {
  // D. Crop & Nutrition
  createCropNutrition,
  // F. Infrastructure
  createInfrastructure,
  // H. Input Cost
  createInputCost,
  // A. Orchard
  createOrchard,
  // I. Extras
  createOrchardExtra,
  // B. Variety
  createOrchardVariety,
  // E. Plant Protection
  createPlantProtection,
  // G. Production & Marketing
  createProductionMarketing,
  // C. Soil & Water
  createSoilWater,
  deleteCropNutrition,
  deleteInfrastructure,
  deleteInputCost,
  deleteOrchard,
  deleteOrchardExtra,
  deleteOrchardVariety,
  deletePlantProtection,
  deleteProductionMarketing,
  deleteSoilWater,
  getCropNutritionByOrchard,
  getInfrastructureByOrchard,
  getInputCostByOrchard,
  getOrchardById,
  getOrchardExtraByOrchard,
  getOrchardsByUser,
  getOrchardVarieties,
  getPlantProtectionByOrchard,
  getProductionMarketingByOrchard,
  getSoilWaterByOrchard,
  updateCropNutrition,
  updateInfrastructure,
  updateInputCost,
  updateOrchard,
  updateOrchardExtra,
  updateOrchardVariety,
  updatePlantProtection,
  updateProductionMarketing,
  updateSoilWater,
} from "../services/orchard.service";

//
// ====================================================
// 🌳 A. ORCHARD BASIC
// ====================================================
//
export const useOrchardsByUserQuery = (userId) =>
  useQuery({
    queryKey: ["orchards", userId],
    queryFn: () => getOrchardsByUser(userId),
    enabled: !!userId,
  });

export const useOrchardByIdQuery = (orchardId) =>
  useQuery({
    queryKey: ["orchard", orchardId],
    queryFn: () => getOrchardById(orchardId),
    enabled: !!orchardId,
  });

export const useCreateOrchardBasinInfoMutation = () =>
  useMutation({ mutationFn: createOrchard });

export const useUpdateOrchardBasicInfoMutation = () =>
  useMutation({ mutationFn: updateOrchard });

export const useDeleteOrchardBasicInfoMutation = () =>
  useMutation({ mutationFn: deleteOrchard });

//
// ====================================================
// 🌱 B. VARIETY & PLANTING
// ====================================================
//
export const useOrchardVarietiesQuery = (orchardId) =>
  useQuery({
    queryKey: ["orchardVarieties", orchardId],
    queryFn: () => getOrchardVarieties(orchardId),
    enabled: !!orchardId,
  });

export const useCreateVarietyMutation = () =>
  useMutation({ mutationFn: createOrchardVariety });

export const useUpdateVarietyMutation = () =>
  useMutation({ mutationFn: updateOrchardVariety });

export const useDeleteVarietyMutation = () =>
  useMutation({ mutationFn: deleteOrchardVariety });

//
// ====================================================
// 🌍 C. SOIL & WATER
// ====================================================
//
export const useSoilWaterQuery = (orchardId) =>
  useQuery({
    queryKey: ["soilWater", orchardId],
    queryFn: () => getSoilWaterByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateSoilWaterMutation = () =>
  useMutation({ mutationFn: createSoilWater });

export const useUpdateSoilWaterMutation = () =>
  useMutation({ mutationFn: updateSoilWater });

export const useDeleteSoilWaterMutation = () =>
  useMutation({ mutationFn: deleteSoilWater });

//
// ====================================================
// 🌾 D. CROP & NUTRITION
// ====================================================
//
export const useCropNutritionQuery = (orchardId) =>
  useQuery({
    queryKey: ["cropNutrition", orchardId],
    queryFn: () => getCropNutritionByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateCropNutritionMutation = () =>
  useMutation({ mutationFn: createCropNutrition });

export const useUpdateCropNutritionMutation = () =>
  useMutation({ mutationFn: updateCropNutrition });

export const useDeleteCropNutritionMutation = () =>
  useMutation({ mutationFn: deleteCropNutrition });

//
// ====================================================
// 🐛 E. PLANT PROTECTION
// ====================================================
//
export const usePlantProtectionQuery = (orchardId) =>
  useQuery({
    queryKey: ["plantProtection", orchardId],
    queryFn: () => getPlantProtectionByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreatePlantProtectionMutation = () =>
  useMutation({ mutationFn: createPlantProtection });

export const useUpdatePlantProtectionMutation = () =>
  useMutation({ mutationFn: updatePlantProtection });

export const useDeletePlantProtectionMutation = () =>
  useMutation({ mutationFn: deletePlantProtection });

//
// ====================================================
// 🚜 F. INFRASTRUCTURE
// ====================================================
//
export const useInfrastructureQuery = (orchardId) =>
  useQuery({
    queryKey: ["infrastructure", orchardId],
    queryFn: () => getInfrastructureByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateInfrastructureMutation = () =>
  useMutation({ mutationFn: createInfrastructure });

export const useUpdateInfrastructureMutation = () =>
  useMutation({ mutationFn: updateInfrastructure });

export const useDeleteInfrastructureMutation = () =>
  useMutation({ mutationFn: deleteInfrastructure });

//
// ====================================================
// 📦 G. PRODUCTION & MARKETING
// ====================================================
//
export const useProductionMarketingQuery = (orchardId) =>
  useQuery({
    queryKey: ["productionMarketing", orchardId],
    queryFn: () => getProductionMarketingByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateProductionMarketingMutation = () =>
  useMutation({ mutationFn: createProductionMarketing });

export const useUpdateProductionMarketingMutation = () =>
  useMutation({ mutationFn: updateProductionMarketing });

export const useDeleteProductionMarketingMutation = () =>
  useMutation({ mutationFn: deleteProductionMarketing });

//
// ====================================================
// 💰 H. INPUT COST
// ====================================================
//
export const useInputCostQuery = (orchardId) =>
  useQuery({
    queryKey: ["inputCost", orchardId],
    queryFn: () => getInputCostByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateInputCostMutation = () =>
  useMutation({ mutationFn: createInputCost });

export const useUpdateInputCostMutation = () =>
  useMutation({ mutationFn: updateInputCost });

export const useDeleteInputCostMutation = () =>
  useMutation({ mutationFn: deleteInputCost });

//
// ====================================================
// 🧩 I. OPTIONAL / FUTURE
// ====================================================
//
export const useOrchardExtraQuery = (orchardId) =>
  useQuery({
    queryKey: ["orchardExtra", orchardId],
    queryFn: () => getOrchardExtraByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateOrchardExtraMutation = () =>
  useMutation({ mutationFn: createOrchardExtra });

export const useUpdateOrchardExtraMutation = () =>
  useMutation({ mutationFn: updateOrchardExtra });

export const useDeleteOrchardExtraMutation = () =>
  useMutation({ mutationFn: deleteOrchardExtra });
