import axiosInstance from "@/src/api/client/axiosInstance";
import { safeGet } from "@/src/services/helpers/safeGet";

const CORE = "/api/core";

//
// ====================================================
// 🌳 A. ORCHARD BASIC
// ====================================================
//

export const createOrchard = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchardProfile`,
    data,
  );
  return res;
};

export const updateOrchard = async (data: any) => {
  const id = data.orchardId || data.id;
  const { data: res } = await axiosInstance.put(
    `${CORE}/orchardProfile/${id}`,
    data,
  );
  return res;
};

export const deleteOrchardSection = async (id: any) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchardProfile/${id}`,
  );
  return res;
};

export const deleteEntireOrchard = async (orchardId: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchardProfile/${orchardId}`,
  );
  return res;
};

export const getOrchardById = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(`${CORE}/orchardProfile/${orchardId}`));

export const getOrchardsByUser = async () =>
  safeGet(axiosInstance.get(`${CORE}/orchardProfile`));

//
// ====================================================
// 🌱 B. VARIETY & PLANTING
// ====================================================
//
export const createOrchardVariety = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchard/${data.orchardProfileId}/varieties`,
    data,
  );
  return res;
};

export const updateOrchardVariety = async (data: any) => {
  console.log(data.orchardProfileId, "data 0000");

  const { data: res } = await axiosInstance.put(
    `${CORE}/orchard/${data.orchardProfileId}/varieties/${Number(data.id)}`,
    data,
  );
  return res;
};

export const deleteOrchardVariety = async ({
  id,
  varietyId,
}: {
  id: string | number;
  varietyId: number;
}) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard/${id}/varieties/${varietyId}`,
  );
  return res;
};

export const deleteAllVarieties = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard-variety/${id}`,
  );
  return res;
};

export const getOrchardVarieties = async (orchardProfileId: string | number) =>
  safeGet(axiosInstance.get(`${CORE}/orchard/${orchardProfileId}/varieties`));

//
// ====================================================
// 🌍 C. SOIL & WATER
// ====================================================
//
export const createSoilWater = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchard/${data.orchardProfileId}/soil-water`,
    data,
  );
  return res;
};

export const updateSoilWater = async (data: any) => {
  console.log(data, "data of orchard.sercie");

  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data.orchardProfileId}/soil-water`,
    data,
  );
  return res;
};

export const deleteSoilWater = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard/${id}/soil-water`,
  );
  return res;
};

export const getSoilWaterByOrchard = async (
  orchardProfileId: string | number,
) =>
  safeGet(axiosInstance.get(`${CORE}/orchard/${orchardProfileId}/soil-water`));

export const createSoilTestReport = async (data: any) => {
  console.log(data, "data for");

  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data.orchardProfileId}/soil-water`,
    data,
  );
  return res;
};

export const deleteSoilTestReport = async (data: any) => {
  console.log(data, "data in deletesoiltestreport");

  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data.orchardProfileId}/soil-water`,
    data,
  );
  return res;
};

export const getSoilTestReport = async (orchardProfileId: string | number) =>
  safeGet(axiosInstance.get(`${CORE}/orchard/${orchardProfileId}/soil-water`));

//
// ====================================================
// 🌾 D. CROP & NUTRITION
// ====================================================
//
export const createCropNutrition = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchard/${data.orchardProfileId}/crop-nutrition`,
    data,
  );
  return res;
};

export const updateCropNutrition = async (data: any) => {
  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data.orchardProfileId}/crop-nutrition`,
    data,
  );
  return res;
};

export const deleteCropNutrition = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard/${id}/crop-nutrition`,
  );
  return res;
};

export const getCropNutritionByOrchard = async (orchardId: string | number) => {
  return safeGet(
    axiosInstance.get(`${CORE}/orchard/${orchardId}/crop-nutrition`),
  );
};
//
// ====================================================
// 🐛 E. PLANT PROTECTION
// ====================================================
//
export const createPlantProtection = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchard/${data.orchardProfileId}/plant-health`,
    data,
  );
  return res;
};

export const updatePlantProtection = async (data: any) => {
  console.log(data, "iddata");

  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data?.orchardProfileId}/plant-health`,
    data,
  );
  return res;
};

export const deletePlantProtection = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard/${id}/plant-health`,
  );
  return res;
};

export const getPlantProtectionByOrchard = async (
  orchardProfileId: string | number,
) =>
  safeGet(
    axiosInstance.get(`${CORE}/orchard/${orchardProfileId}/plant-health`),
  );

//
// ====================================================
// 🚜 F. INFRASTRUCTURE
// ====================================================
//
export const createInfrastructure = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchard/${data.orchardProfileId}/infrastructure`,
    data,
  );
  return res;
};

export const updateInfrastructure = async (data: any) => {
  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data.orchardProfileId}/infrastructure`,

    data,
  );
  return res;
};

export const deleteInfrastructure = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard/${id}/infrastructure`,
  );
  return res;
};

export const getInfrastructureByOrchard = async (
  orchardProfileId: string | number,
) =>
  safeGet(
    axiosInstance.get(`${CORE}/orchard/${orchardProfileId}/infrastructure`),
  );

//
// ====================================================
// 📦 G. PRODUCTION & MARKETING
// ====================================================
//
export const createProductionMarketing = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchard/${data.orchardProfileId}/production`,
    data,
  );
  return res;
};

export const updateProductionMarketing = async (data: any) => {
  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data.orchardProfileId}/production`,

    data,
  );
  return res;
};

export const deleteProductionMarketing = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard/${id}/production`,
  );
  return res;
};

export const getProductionMarketingByOrchard = async (
  orchardProfileId: string | number,
) =>
  safeGet(axiosInstance.get(`${CORE}/orchard/${orchardProfileId}/production`));

//
// ====================================================
// 💰 H. INPUT COST
// ====================================================
//
export const createInputCost = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchard/${data.orchardProfileId}/input-cost`,
    data,
  );
  return res;
};

export const updateInputCost = async (data: any) => {
  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data.orchardProfileId}/input-cost`,
    data,
  );
  return res;
};

export const deleteInputCost = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard/${id}/input-cost`,
  );
  return res;
};

export const getInputCostByOrchard = async (
  orchardProfileId: string | number,
) =>
  safeGet(axiosInstance.get(`${CORE}/orchard/${orchardProfileId}/input-cost`));

//
// ====================================================
// 🧩 I. EXTRA
// ====================================================
//
export const createOrchardExtra = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/orchard/${data.orchardProfileId}/optional-fields`,
    data,
  );
  return res;
};

export const updateOrchardExtra = async (data: any) => {
  const { data: res } = await axiosInstance.patch(
    `${CORE}/orchard/${data.orchardProfileId}/optional-fields`,

    data,
  );
  return res;
};

export const deleteOrchardExtra = async (id: string | number) => {
  const { data: res } = await axiosInstance.delete(
    `${CORE}/orchard/${id}/optional-fields`,
  );
  return res;
};

export const getOrchardExtraByOrchard = async (
  orchardProfileId: string | number,
) =>
  safeGet(
    axiosInstance.get(`${CORE}/orchard/${orchardProfileId}/optional-fields`),
  );

//
// ====================================================
// 🔎 PROFILE LOOKUP
// ====================================================
//
export const getProfileOrchardId = async (orchardId: string | number) =>
  safeGet(axiosInstance.get(`${CORE}/orchardProfile/user/${orchardId}`));
