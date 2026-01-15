import { useMutation, useQuery } from "@tanstack/react-query";

import { ID } from "@/src/types/global";
import {
  createOrchard,
  deleteOrchard,
  getOrchardById,
  getOrchardsByUser,
  updateOrchard,
} from "../services/orchard.service";

//
// ====================================================
// 🌳 A. ORCHARD BASIC
// ====================================================
//
export const useOrchardsByUserQuery = () =>
  useQuery({
    queryKey: ["orchards"],
    queryFn: () => getOrchardsByUser(),
  });

export const useOrchardByIdQuery = (orchardId: ID) =>
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

// //
// // ====================================================
// // 🌱 B. VARIETY & PLANTING
// // ====================================================
// //
// export const useOrchardVarietiesQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["orchardVarieties", orchardId],
//     queryFn: () => getOrchardVarieties(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreateVarietyMutation = () =>
//   useMutation({ mutationFn: createOrchardVariety });

// export const useUpdateVarietyMutation = () =>
//   useMutation({ mutationFn: updateOrchardVariety });

// export const useDeleteVarietyMutation = () =>
//   useMutation({ mutationFn: deleteOrchardVariety });

// //
// // ====================================================
// // 🌍 C. SOIL & WATER
// // ====================================================
// //
// export const useSoilWaterQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["soilWater", orchardId],
//     queryFn: () => getSoilWaterByOrchard(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreateSoilWaterMutation = () =>
//   useMutation({ mutationFn: createSoilWater });

// export const useUpdateSoilWaterMutation = () =>
//   useMutation({ mutationFn: updateSoilWater });

// export const useDeleteSoilWaterMutation = () =>
//   useMutation({ mutationFn: deleteSoilWater });

// //
// // ====================================================
// // 🌾 D. CROP & NUTRITION
// // ====================================================
// //
// export const useCropNutritionQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["cropNutrition", orchardId],
//     queryFn: () => getCropNutritionByOrchard(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreateCropNutritionMutation = () =>
//   useMutation({ mutationFn: createCropNutrition });

// export const useUpdateCropNutritionMutation = () =>
//   useMutation({ mutationFn: updateCropNutrition });

// export const useDeleteCropNutritionMutation = () =>
//   useMutation({ mutationFn: deleteCropNutrition });

// //
// // ====================================================
// // 🐛 E. PLANT PROTECTION
// // ====================================================
// //
// export const usePlantProtectionQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["plantProtection", orchardId],
//     queryFn: () => getPlantProtectionByOrchard(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreatePlantProtectionMutation = () =>
//   useMutation({ mutationFn: createPlantProtection });

// export const useUpdatePlantProtectionMutation = () =>
//   useMutation({ mutationFn: updatePlantProtection });

// export const useDeletePlantProtectionMutation = () =>
//   useMutation({ mutationFn: deletePlantProtection });

// //
// // ====================================================
// // 🚜 F. INFRASTRUCTURE
// // ====================================================
// //
// export const useInfrastructureQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["infrastructure", orchardId],
//     queryFn: () => getInfrastructureByOrchard(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreateInfrastructureMutation = () =>
//   useMutation({ mutationFn: createInfrastructure });

// export const useUpdateInfrastructureMutation = () =>
//   useMutation({ mutationFn: updateInfrastructure });

// export const useDeleteInfrastructureMutation = () =>
//   useMutation({ mutationFn: deleteInfrastructure });

// //
// // ====================================================
// // 📦 G. PRODUCTION & MARKETING
// // ====================================================
// //
// export const useProductionMarketingQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["productionMarketing", orchardId],
//     queryFn: () => getProductionMarketingByOrchard(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreateProductionMarketingMutation = () =>
//   useMutation({ mutationFn: createProductionMarketing });

// export const useUpdateProductionMarketingMutation = () =>
//   useMutation({ mutationFn: updateProductionMarketing });

// export const useDeleteProductionMarketingMutation = () =>
//   useMutation({ mutationFn: deleteProductionMarketing });

// //
// // ====================================================
// // 💰 H. INPUT COST
// // ====================================================
// //
// export const useInputCostQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["inputCost", orchardId],
//     queryFn: () => getInputCostByOrchard(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreateInputCostMutation = () =>
//   useMutation({ mutationFn: createInputCost });

// export const useUpdateInputCostMutation = () =>
//   useMutation({ mutationFn: updateInputCost });

// export const useDeleteInputCostMutation = () =>
//   useMutation({ mutationFn: deleteInputCost });

// //
// // ====================================================
// // 🧩 I. OPTIONAL / FUTURE
// // ====================================================
// //
// export const useOrchardExtraQuery = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["orchardExtra", orchardId],
//     queryFn: () => getOrchardExtraByOrchard(orchardId),
//     enabled: !!orchardId,
//   });

// export const useCreateOrchardExtraMutation = () =>
//   useMutation({ mutationFn: createOrchardExtra });

// export const useUpdateOrchardExtraMutation = () =>
//   useMutation({ mutationFn: updateOrchardExtra });

// export const useDeleteOrchardExtraMutation = () =>
//   useMutation({ mutationFn: deleteOrchardExtra });

// export const useOrchardProfileId = (orchardId: ID) =>
//   useQuery({
//     queryKey: ["orchardProfile", orchardId],
//     queryFn: () => getProfileOrchardId(orchardId),
//     enabled: !!orchardId,
//   });
