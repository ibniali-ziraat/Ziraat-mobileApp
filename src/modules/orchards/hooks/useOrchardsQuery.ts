import { ID } from "@/src/types/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  // D. CROP & NUTRITION
  createCropNutrition,
  // F. INFRASTRUCTURE
  createInfrastructure,
  // H. INPUT COST
  createInputCost,
  // A. ORCHARD BASIC
  createOrchard,
  // I. EXTRA
  createOrchardExtra,
  // B. VARIETY
  createOrchardVariety,
  // E. PLANT PROTECTION
  createPlantProtection,
  // G. PRODUCTION & MARKETING
  createProductionMarketing,
  // C. SOIL & WATER
  createSoilWater,
  deleteAllVarieties,
  deleteCropNutrition,
  deleteEntireOrchard,
  deleteInfrastructure,
  deleteInputCost,
  deleteOrchardExtra,
  deleteOrchardSection,
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
  // PROFILE
  getProfileOrchardId,
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
export const useOrchardsByUserQuery = () =>
  useQuery({
    queryKey: ["orchards"],
    queryFn: getOrchardsByUser,
  });

export const useOrchardByIdQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["orchard", orchardId],
    queryFn: () => getOrchardById(orchardId),
    enabled: !!orchardId,
  });

export const useCreateOrchardMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createOrchard,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orchards"] }),
  });
};

export const useUpdateOrchardMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateOrchard,
    onSuccess: (_, data: any) =>
      qc.invalidateQueries({
        queryKey: ["orchard", data.orchardId || data.id],
      }),
  });
};

export const useDeleteOrchardSectionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOrchardSection,
    onSuccess: (_, data: any) =>
      qc.invalidateQueries({ queryKey: ["orchard", data.id] }),
  });
};

export const useDeleteOrchardEntireMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteEntireOrchard,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orchards"] }),
  });
};

//
// ====================================================
// 🌱 B. VARIETY & PLANTING
// ====================================================
//
export const useOrchardVarietiesQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["orchardVarieties", orchardId],
    queryFn: () => getOrchardVarieties(orchardId),
    enabled: !!orchardId,
  });

export const useCreateVarietyMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createOrchardVariety,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orchardVarieties"] }),
  });
};

export const useUpdateVarietyMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateOrchardVariety,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orchardVarieties"] }),
  });
};

export const useDeleteVarietyMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOrchardVariety,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orchardVarieties"] }),
  });
};

export const useDeleteAllVarietiesMutation = () => {
  return useMutation({
    mutationFn: deleteAllVarieties,
  });
};

//
// ====================================================
// 🌍 C. SOIL & WATER
// ====================================================
//
export const useSoilWaterQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["soilWater", orchardId],
    queryFn: () => getSoilWaterByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateSoilWaterMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSoilWater,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["soilWater"] }),
  });
};

export const useUpdateSoilWaterMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateSoilWater,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["soilWater"] }),
  });
};

export const useDeleteSoilWaterMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSoilWater,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["soilWater"] }),
  });
};

//
// ====================================================
// 🌾 D. CROP & NUTRITION
// ====================================================
//
export const useCropNutritionQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["cropNutrition", orchardId],
    queryFn: () => getCropNutritionByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateCropNutritionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCropNutrition,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cropNutrition"] }),
  });
};

export const useUpdateCropNutritionMutation = () => {
  return useMutation({ mutationFn: updateCropNutrition });
};

export const useDeleteCropNutritionMutation = (orchardId: ID) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCropNutrition,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["cropNutrition", orchardId] }),
  });
};

//
// ====================================================
// 🐛 E. PLANT PROTECTION
// ====================================================
//
export const usePlantProtectionQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["plantProtection", orchardId],
    queryFn: () => getPlantProtectionByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreatePlantProtectionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPlantProtection,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["plantProtection"] }),
  });
};

export const useUpdatePlantProtectionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updatePlantProtection,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["plantProtection"] }),
  });
};

export const useDeletePlantProtectionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePlantProtection,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["plantProtection"] }),
  });
};

//
// ====================================================
// 🚜 F. INFRASTRUCTURE
// ====================================================
//
export const useInfrastructureQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["infrastructure", orchardId],
    queryFn: () => getInfrastructureByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateInfrastructureMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createInfrastructure,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["infrastructure"] }),
  });
};

export const useUpdateInfrastructureMutation = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updateInfrastructure });
};

export const useDeleteInfrastructureMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteInfrastructure,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["infrastructure"] }),
  });
};

//
// ====================================================
// 📦 G. PRODUCTION & MARKETING
// ====================================================
//
export const useProductionMarketingQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["productionMarketing", orchardId],
    queryFn: () => getProductionMarketingByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateProductionMarketingMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProductionMarketing,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["productionMarketing"] }),
  });
};

export const useUpdateProductionMarketingMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProductionMarketing,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["productionMarketing"] }),
  });
};

export const useDeleteProductionMarketingMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProductionMarketing,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["productionMarketing"] }),
  });
};

//
// ====================================================
// 💰 H. INPUT COST
// ====================================================
//
export const useInputCostQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["inputCost", orchardId],
    queryFn: () => getInputCostByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateInputCostMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createInputCost,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inputCost"] }),
  });
};

export const useUpdateInputCostMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateInputCost,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inputCost"] }),
  });
};

export const useDeleteInputCostMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteInputCost,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inputCost"] }),
  });
};

//
// ====================================================
// 🧩 I. EXTRA
// ====================================================
//
export const useOrchardExtraQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["orchardExtra", orchardId],
    queryFn: () => getOrchardExtraByOrchard(orchardId),
    enabled: !!orchardId,
  });

export const useCreateOrchardExtraMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createOrchardExtra,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orchardExtra"] }),
  });
};

export const useUpdateOrchardExtraMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateOrchardExtra,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orchardExtra"] }),
  });
};

export const useDeleteOrchardExtraMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOrchardExtra,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orchardExtra"] }),
  });
};

//
// ====================================================
// 🔎 PROFILE LOOKUP
// ====================================================
//
export const useOrchardProfileIdQuery = (orchardId: ID) =>
  useQuery({
    queryKey: ["orchardProfile", orchardId],
    queryFn: () => getProfileOrchardId(orchardId),
    enabled: !!orchardId,
  });
