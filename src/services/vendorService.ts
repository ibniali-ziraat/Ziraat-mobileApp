// ----------------------------------------------------
// 🧑‍🌾 VENDOR PROFILE - Business Info

import axiosInstance from "../api/client/axiosInstance";

// ----------------------------------------------------
export const saveVendorProfile = async (data) =>
  (await axiosInstance.post("/api/core/BusinessInformation", data)).data;

export const updateVendorProfile = async (data) =>
  (await axiosInstance.put(`/api/core/vendor/profile/${data.vendorId}`, data))
    .data;

export const deleteVendorProfile = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/vendor/profile/${vendorId}`)).data;

export const getVendorProfile = async (vendorId) =>
  (await axiosInstance.get(`/api/core/vendor/profile/${vendorId}`)).data;

// ----------------------------------------------------
// 📜 LICENSE SECTION
// ----------------------------------------------------
export const saveVendorLicense = async (data) =>
  (await axiosInstance.post("/api/core/LicensingCompliance", data)).data;

export const updateVendorLicense = async (data) =>
  (await axiosInstance.put(`/api/core/vendor/license/${data.vendorId}`, data))
    .data;

export const deleteVendorLicense = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/vendor/license/${vendorId}`)).data;

export const getVendorLicense = async (vendorId) =>
  (await axiosInstance.get(`/api/core/vendor/license/${vendorId}`)).data;

// ----------------------------------------------------
// 🛒 PRODUCT PORTFOLIO
// ----------------------------------------------------
export const saveVendorProducts = async (data) =>
  (
    await axiosInstance.post(
      "/api/core/ProductPortfolio/save-productportfolio",
      data
    )
  ).data;

export const updateVendorProducts = async (data) =>
  (await axiosInstance.put(`/api/core/vendor/products/${data.vendorId}`, data))
    .data;

export const deleteVendorProducts = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/vendor/products/${vendorId}`)).data;

export const getVendorProducts = async (vendorId) =>
  (await axiosInstance.get(`/api/core/vendor/products/${vendorId}`)).data;

//////////////////////////////////////////////////////
export const getVendorInputs = async () =>
  (await axiosInstance.get("/api/core/inputs")).data;

export const getVendorBrands = async (vendorId) =>
  (await axiosInstance.get(`/api/core/vendor/brands/${vendorId}`)).data;

// ----------------------------------------------------
// ⚙️ OPERATIONS SECTION
// ----------------------------------------------------
export const saveVendorOperations = async (data) =>
  (
    await axiosInstance.post(
      "/api/core/OperationalDetails/save-operationalDetails",
      data
    )
  ).data;

export const updateVendorOperations = async (data) =>
  (
    await axiosInstance.put(
      `/api/core/vendor/operations/${data.vendorId}`,
      data
    )
  ).data;

export const deleteVendorOperations = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/vendor/operations/${vendorId}`)).data;

export const getVendorOperations = async (vendorId) =>
  (await axiosInstance.get(`/api/core/vendor/operations/${vendorId}`)).data;

// ----------------------------------------------------
// 💰 FINANCIAL SECTION
// ----------------------------------------------------
export const saveVendorFinancial = async (data) =>
  (await axiosInstance.post("/api/core/FinancialPayment", data)).data;

export const updateVendorFinancial = async (data) =>
  (await axiosInstance.put(`/api/core/vendor/financial/${data.vendorId}`, data))
    .data;

export const deleteVendorFinancial = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/vendor/financial/${vendorId}`)).data;

export const getVendorFinancial = async (vendorId) =>
  (await axiosInstance.get(`/api/core/vendor/financial/${vendorId}`)).data;

// ----------------------------------------------------
// 🧑‍🌾 SUPPORT & SERVICES
// ----------------------------------------------------
export const saveVendorSupport = async (data) =>
  (await axiosInstance.post("/api/core/SupportServices", data)).data;

export const updateVendorSupport = async (data) =>
  (await axiosInstance.put(`/api/core/vendor/support/${data.vendorId}`, data))
    .data;

export const deleteVendorSupport = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/vendor/support/${vendorId}`)).data;

export const getVendorSupport = async (vendorId) =>
  (await axiosInstance.get(`/api/core/vendor/support/${vendorId}`)).data;

// ----------------------------------------------------
// 🔍 VERIFICATION - READ ONLY
// ----------------------------------------------------
export const getVendorVerification = async (vendorId) =>
  (await axiosInstance.get(`/api/core/vendor/verification/${vendorId}`)).data;
