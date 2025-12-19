import axiosInstance from "@/src/api/client/axiosInstance";
import { safeGet } from "@/src/services/helpers/safeGet";

//
// ====================================================
// 🌳 A. ORCHARD BASIC PROFILE
// ====================================================
//
export const createOrchard = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard/create",
    data
  );
  return res;
};

export const updateOrchard = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard/${data.id}`,
    data
  );
  return res;
};

export const deleteOrchard = async (orchardId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard/${orchardId}`
  );
  return res;
};

export const getOrchardById = async (orchardId) =>
  safeGet(axiosInstance.get(`/api/core/orchard/${orchardId}`));

export const getOrchardsByUser = async (userId) =>
  safeGet(axiosInstance.get(`/api/core/orchard/GetByUserId?userId=${userId}`));

//
// ====================================================
// 🌱 B. VARIETY & PLANTING
// ====================================================
//
export const createOrchardVariety = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard-variety/create",
    data
  );
  return res;
};

export const updateOrchardVariety = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard-variety/${data.id}`,
    data
  );
  return res;
};

export const deleteOrchardVariety = async (varietyId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard-variety/${varietyId}`
  );
  return res;
};

export const getOrchardVarieties = async (orchardId) =>
  safeGet(
    axiosInstance.get(`/api/core/orchard-variety/by-orchard/${orchardId}`)
  );

//
// ====================================================
// 🌍 C. SOIL & WATER PROFILE
// ====================================================
//
export const createSoilWater = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard-soil/create",
    data
  );
  return res;
};

export const updateSoilWater = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard-soil/${data.id}`,
    data
  );
  return res;
};

export const deleteSoilWater = async (soilId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard-soil/${soilId}`
  );
  return res;
};

export const getSoilWaterByOrchard = async (orchardId) =>
  safeGet(axiosInstance.get(`/api/core/orchard-soil/by-orchard/${orchardId}`));

//
// ====================================================
// 🌾 D. CROP & NUTRITION MANAGEMENT
// ====================================================
//
export const createCropNutrition = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard-nutrition/create",
    data
  );
  return res;
};

export const updateCropNutrition = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard-nutrition/${data.id}`,
    data
  );
  return res;
};

export const deleteCropNutrition = async (nutritionId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard-nutrition/${nutritionId}`
  );
  return res;
};

export const getCropNutritionByOrchard = async (orchardId) =>
  safeGet(
    axiosInstance.get(`/api/core/orchard-nutrition/by-orchard/${orchardId}`)
  );

//
// ====================================================
// 🐛 E. PLANT PROTECTION & HEALTH
// ====================================================
//
export const createPlantProtection = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard-protection/create",
    data
  );
  return res;
};

export const updatePlantProtection = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard-protection/${data.id}`,
    data
  );
  return res;
};

export const deletePlantProtection = async (protectionId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard-protection/${protectionId}`
  );
  return res;
};

export const getPlantProtectionByOrchard = async (orchardId) =>
  safeGet(
    axiosInstance.get(`/api/core/orchard-protection/by-orchard/${orchardId}`)
  );

//
// ====================================================
// 🚜 F. FARM INFRASTRUCTURE & RESOURCES
// ====================================================
//
export const createInfrastructure = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard-infra/create",
    data
  );
  return res;
};

export const updateInfrastructure = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard-infra/${data.id}`,
    data
  );
  return res;
};

export const deleteInfrastructure = async (infraId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard-infra/${infraId}`
  );
  return res;
};

export const getInfrastructureByOrchard = async (orchardId) =>
  safeGet(axiosInstance.get(`/api/core/orchard-infra/by-orchard/${orchardId}`));

//
// ====================================================
// 📦 G. PRODUCTION & MARKETING
// ====================================================
//
export const createProductionMarketing = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard-marketing/create",
    data
  );
  return res;
};

export const updateProductionMarketing = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard-marketing/${data.id}`,
    data
  );
  return res;
};

export const deleteProductionMarketing = async (marketingId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard-marketing/${marketingId}`
  );
  return res;
};

export const getProductionMarketingByOrchard = async (orchardId) =>
  safeGet(
    axiosInstance.get(`/api/core/orchard-marketing/by-orchard/${orchardId}`)
  );

//
// ====================================================
// 💰 H. INPUT COST DETAILS
// ====================================================
//
export const createInputCost = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard-inputcost/create",
    data
  );
  return res;
};

export const updateInputCost = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard-inputcost/${data.id}`,
    data
  );
  return res;
};

export const deleteInputCost = async (inputCostId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard-inputcost/${inputCostId}`
  );
  return res;
};

export const getInputCostByOrchard = async (orchardId) =>
  safeGet(
    axiosInstance.get(`/api/core/orchard-inputcost/by-orchard/${orchardId}`)
  );

//
// ====================================================
// 🧩 I. OPTIONAL / FUTURE PROOF
// ====================================================
//
export const createOrchardExtra = async (data) => {
  const { data: res } = await axiosInstance.post(
    "/api/core/orchard-extra/create",
    data
  );
  return res;
};

export const updateOrchardExtra = async (data) => {
  const { data: res } = await axiosInstance.put(
    `/api/core/orchard-extra/${data.id}`,
    data
  );
  return res;
};

export const deleteOrchardExtra = async (extraId) => {
  const { data: res } = await axiosInstance.delete(
    `/api/core/orchard-extra/${extraId}`
  );
  return res;
};

export const getOrchardExtraByOrchard = async (orchardId) =>
  safeGet(axiosInstance.get(`/api/core/orchard-extra/by-orchard/${orchardId}`));
