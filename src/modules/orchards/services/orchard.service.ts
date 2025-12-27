import axiosInstance from "@/src/api/client/axiosInstance";
import { safeGet } from "@/src/services/helpers/safeGet";
import { ORCHARD_ENDPOINTS as EP } from "../api/orchard.endpoints";

/* ====================================================
   🌳 A. ORCHARD BASIC PROFILE
==================================================== */
export const createOrchard = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.orchard.create, data);
  return res;
};

export const updateOrchard = async (data: any) => {
  const { data: res } = await axiosInstance.put(EP.orchard.byId(data.id), data);
  return res;
};

export const deleteOrchard = async (orchardId: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.orchard.byId(orchardId));
  return res;
};

export const getOrchardById = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(EP.orchard.byId(orchardId)));

export const getOrchardsByUser = async (userId: string | number) =>
  safeGet(axiosInstance.get(EP.orchard.byUser(userId)));

/* ====================================================
   🌱 B. VARIETY & PLANTING
==================================================== */
export const createOrchardVariety = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.variety.create, data);
  return res;
};

export const updateOrchardVariety = async (data: any) => {
  const { data: res } = await axiosInstance.put(EP.variety.byId(data.id), data);
  return res;
};

export const deleteOrchardVariety = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.variety.byId(id));
  return res;
};

export const getOrchardVarieties = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(EP.variety.byOrchard(orchardId)));

/* ====================================================
   🌍 C. SOIL & WATER
==================================================== */
export const createSoilWater = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.soil.create, data);
  return res;
};

export const updateSoilWater = async (data: any) => {
  const { data: res } = await axiosInstance.put(EP.soil.byId(data.id), data);
  return res;
};

export const deleteSoilWater = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.soil.byId(id));
  return res;
};

export const getSoilWaterByOrchard = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(EP.soil.byOrchard(orchardId)));

/* ====================================================
   🌾 D. NUTRITION
==================================================== */
export const createCropNutrition = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.nutrition.create, data);
  return res;
};

export const updateCropNutrition = async (data: any) => {
  const { data: res } = await axiosInstance.put(
    EP.nutrition.byId(data.id),
    data
  );
  return res;
};

export const deleteCropNutrition = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.nutrition.byId(id));
  return res;
};

export const getCropNutritionByOrchard = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(EP.nutrition.byOrchard(orchardId)));

/* ====================================================
   🐛 E. PROTECTION
==================================================== */
export const createPlantProtection = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.protection.create, data);
  return res;
};

export const updatePlantProtection = async (data: any) => {
  const { data: res } = await axiosInstance.put(
    EP.protection.byId(data.id),
    data
  );
  return res;
};

export const deletePlantProtection = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.protection.byId(id));
  return res;
};

export const getPlantProtectionByOrchard = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(EP.protection.byOrchard(orchardId)));

/* ====================================================
   🚜 F. INFRA
==================================================== */
export const createInfrastructure = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.infra.create, data);
  return res;
};

export const updateInfrastructure = async (data: any) => {
  const { data: res } = await axiosInstance.put(EP.infra.byId(data.id), data);
  return res;
};

export const deleteInfrastructure = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.infra.byId(id));
  return res;
};

export const getInfrastructureByOrchard = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(EP.infra.byOrchard(orchardId)));

/* ====================================================
   📦 G. MARKETING
==================================================== */
export const createProductionMarketing = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.marketing.create, data);
  return res;
};

export const updateProductionMarketing = async (data: any) => {
  const { data: res } = await axiosInstance.put(
    EP.marketing.byId(data.id),
    data
  );
  return res;
};

export const deleteProductionMarketing = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.marketing.byId(id));
  return res;
};

export const getProductionMarketingByOrchard = async (
  orchardId: string | number
) => safeGet(axiosInstance.get(EP.marketing.byOrchard(orchardId)));

/* ====================================================
   💰 H. INPUT COST
==================================================== */
export const createInputCost = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.inputCost.create, data);
  return res;
};

export const updateInputCost = async (data: any) => {
  const { data: res } = await axiosInstance.put(
    EP.inputCost.byId(data.id),
    data
  );
  return res;
};

export const deleteInputCost = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.inputCost.byId(id));
  return res;
};

export const getInputCostByOrchard = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(EP.inputCost.byOrchard(orchardId)));

/* ====================================================
   🧩 I. EXTRA
==================================================== */
export const createOrchardExtra = async (data: any) => {
  const { data: res } = await axiosInstance.post(EP.extra.create, data);
  return res;
};

export const updateOrchardExtra = async (data: any) => {
  const { data: res } = await axiosInstance.put(EP.extra.byId(data.id), data);
  return res;
};

export const deleteOrchardExtra = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(EP.extra.byId(id));
  return res;
};

export const getOrchardExtraByOrchard = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(EP.extra.byOrchard(orchardId)));
