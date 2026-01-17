import axiosInstance from "@/src/api/client/axiosInstance";
import { safeGet } from "@/src/services/helpers/safeGet";

const CORE = "/api/core";

export const createOrchard = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchardProfile`,
    data
  );
  return res;
};

export const updateOrchard = async (data: any) => {
  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchardProfile/${data.orchardId || data.id}`,
    data
  );
  return res;
};

export const deleteOrchardSection = async (data: any) => {
  console.log(data, "or data...");

  const { data: res } = await axiosInstance.put(
    `${CORE}/orchardProfile/${data.id}`,
    data
  );
  return res;
};

export const deleteEntireOrchard = async (orchardId: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchardProfile/${orchardId}`
  );
  return res;
};

export const getOrchardById = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(`${CORE}/orchardProfile/${orchardId}`));

export const getOrchardsByUser = async () =>
  safeGet(axiosInstance.get(`${CORE}/orchardProfile`));

// /* ====================================================
//    🌱 B. VARIETY & PLANTING
// ==================================================== */
// export const createOrchardVariety = async (data: any) => {
//   const { data: res } = await axiosInstance.post(
//     `${CORE}/orchardProfile`,
//     data
//   );
//   return res;
// };

// export const updateOrchardVariety = async (id: string | number, data: any) => {
//   const { data: res } = await axiosInstance.patch(
//     `${CORE}/orchardProfile/${id}`,
//     data
//   );
//   return res;
// };

// export const deleteOrchardVariety = async (id: string | number) => {
//   const { data: res } = await axiosInstance.delete(
//     `${CORE}/orchardProfile/${id}`
//   );
//   return res;
// };

// export const getOrchardVarieties = async (orchardId: string | number) =>
//   safeGet(axiosInstance.get(`${CORE}/orchardProfile/${orchardId}`));

// /* ====================================================
//    🌍 C. SOIL & WATER
// ==================================================== */
// export const createSoilWater = async (data: any) => {
//   const { data: res } = await axiosInstance.post(
//     `${CORE}/orchardProfile`,
//     data
//   );
//   return res;
// };

// export const updateSoilWater = async (id: string | number, data: any) => {
//   const { data: res } = await axiosInstance.patch(
//     `${CORE}/orchard-soil/${id}`,
//     data
//   );
//   return res;
// };

// export const deleteSoilWater = async (id: string | number) => {
//   const { data: res } = await axiosInstance.delete(
//     `${CORE}/orchard-soil/${id}`
//   );
//   return res;
// };

// export const getSoilWaterByOrchard = async (orchardId: string | number) =>
//   safeGet(axiosInstance.get(`${CORE}/orchard-soil/by-orchard/${orchardId}`));

// /* ====================================================
//    🌾 D. NUTRITION
// ==================================================== */
// export const createCropNutrition = async (data: any) => {
//   const { data: res } = await axiosInstance.post(
//     `${CORE}/orchardProfile`,
//     data
//   );
//   return res;
// };

// export const updateCropNutrition = async (id: string | number, data: any) => {
//   const { data: res } = await axiosInstance.patch(
//     `${CORE}/orchard-nutrition/${id}`,
//     data
//   );
//   return res;
// };

// export const deleteCropNutrition = async (id: string | number) => {
//   const { data: res } = await axiosInstance.delete(
//     `${CORE}/orchard-nutrition/${id}`
//   );
//   return res;
// };

// export const getCropNutritionByOrchard = async (orchardId: string | number) =>
//   safeGet(
//     axiosInstance.get(`${CORE}/orchard-nutrition/by-orchard/${orchardId}`)
//   );

// /* ====================================================
//    🐛 E. PROTECTION
// ==================================================== */
// export const createPlantProtection = async (data: any) => {
//   const { data: res } = await axiosInstance.post(
//     `${CORE}/orchardProfile`,
//     data
//   );
//   return res;
// };

// export const updatePlantProtection = async (id: string | number, data: any) => {
//   const { data: res } = await axiosInstance.patch(
//     `${CORE}/orchard-protection/${id}`,
//     data
//   );
//   return res;
// };

// export const deletePlantProtection = async (id: string | number) => {
//   const { data: res } = await axiosInstance.delete(
//     `${CORE}/orchard-protection/${id}`
//   );
//   return res;
// };

// export const getPlantProtectionByOrchard = async (orchardId: string | number) =>
//   safeGet(
//     axiosInstance.get(`${CORE}/orchard-protection/by-orchard/${orchardId}`)
//   );

// /* ====================================================
//    🚜 F. INFRASTRUCTURE
// ==================================================== */
// export const createInfrastructure = async (data: any) => {
//   const { data: res } = await axiosInstance.post(
//     `${CORE}/orchardProfile`,
//     data
//   );
//   return res;
// };

// export const updateInfrastructure = async (id: string | number, data: any) => {
//   const { data: res } = await axiosInstance.patch(
//     `${CORE}/orchard-infra/${id}`,
//     data
//   );
//   return res;
// };

// export const deleteInfrastructure = async (id: string | number) => {
//   const { data: res } = await axiosInstance.delete(
//     `${CORE}/orchard-infra/${id}`
//   );
//   return res;
// };

// export const getInfrastructureByOrchard = async (orchardId: string | number) =>
//   safeGet(axiosInstance.get(`${CORE}/orchard-infra/by-orchard/${orchardId}`));

// /* ====================================================
//    📦 G. MARKETING
// ==================================================== */
// export const createProductionMarketing = async (data: any) => {
//   const { data: res } = await axiosInstance.post(
//     `${CORE}/orchardProfile`,
//     data
//   );
//   return res;
// };

// export const updateProductionMarketing = async (
//   id: string | number,
//   data: any
// ) => {
//   const { data: res } = await axiosInstance.patch(
//     `${CORE}/orchard-marketing/${id}`,
//     data
//   );
//   return res;
// };

// export const deleteProductionMarketing = async (id: string | number) => {
//   const { data: res } = await axiosInstance.delete(
//     `${CORE}/orchard-marketing/${id}`
//   );
//   return res;
// };

// export const getProductionMarketingByOrchard = async (
//   orchardId: string | number
// ) =>
//   safeGet(
//     axiosInstance.get(`${CORE}/orchard-marketing/by-orchard/${orchardId}`)
//   );

// /* ====================================================
//    💰 H. INPUT COST
// ==================================================== */
// export const createInputCost = async (data: any) => {
//   const { data: res } = await axiosInstance.post(
//     `${CORE}/orchardProfile`,
//     data
//   );
//   return res;
// };

// export const updateInputCost = async (id: string | number, data: any) => {
//   const { data: res } = await axiosInstance.patch(
//     `${CORE}/orchard-inputcost/${id}`,
//     data
//   );
//   return res;
// };

// export const deleteInputCost = async (id: string | number) => {
//   const { data: res } = await axiosInstance.delete(
//     `${CORE}/orchard-inputcost/${id}`
//   );
//   return res;
// };

// export const getInputCostByOrchard = async (orchardId: string | number) =>
//   safeGet(
//     axiosInstance.get(`${CORE}/orchard-inputcost/by-orchard/${orchardId}`)
//   );

// /* ====================================================
//    🧩 I. EXTRA
// ==================================================== */
// export const createOrchardExtra = async (data: any) => {
//   const { data: res } = await axiosInstance.post(
//     `${CORE}/orchardProfile`,
//     data
//   );
//   return res;
// };

// export const updateOrchardExtra = async (id: string | number, data: any) => {
//   const { data: res } = await axiosInstance.patch(
//     `${CORE}/orchard-extra/${id}`,
//     data
//   );
//   return res;
// };

// export const deleteOrchardExtra = async (id: string | number) => {
//   const { data: res } = await axiosInstance.delete(
//     `${CORE}/orchard-extra/${id}`
//   );
//   return res;
// };

// export const getOrchardExtraByOrchard = async (orchardId: string | number) =>
//   safeGet(axiosInstance.get(`${CORE}/orchard-extra/by-orchard/${orchardId}`));

// /* ====================================================
//    🔎 PROFILE LOOKUP
// ==================================================== */
// export const getProfileOrchardId = async (orchardId: string | number) =>
//   safeGet(axiosInstance.get(`${CORE}/orchardProfile/user/${orchardId}`));
