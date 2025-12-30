import axiosInstance from "../../../../api/client/axiosInstance";
import { safeGet } from "../../../../services/helpers/safeGet";

// ----------------------------------------------------
//  VENDOR PROFILE (Business Info)
// ----------------------------------------------------
export const saveVendorProfile = async (data) =>
  (await axiosInstance.post("/api/core/BusinessInformation", data)).data;

export const updateVendorProfile = async (data) =>
  (await axiosInstance.put(`/api/core/BusinessInformation/${data.id}`, data))
    .data;

export const deleteVendorProfile = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/vendor/profile/${vendorId}`)).data;

// ⬅️ SAFE GET
export const getVendorProfile = async (vendorId) =>
  safeGet(
    axiosInstance.get(
      `/api/core/BusinessInformation/GetBusinessInformationByUserId?userId=${vendorId}`
    )
  );

// ----------------------------------------------------
//  LICENSE SECTION
// ----------------------------------------------------
export const saveVendorLicense = async (data) =>
  (await axiosInstance.post("/api/core/LicensingCompliance", data)).data;

export const updateVendorLicense = async (data) =>
  (
    await axiosInstance.put(
      `/api/core/LicensingCompliance/${data.supplierProfileId}`,
      data
    )
  ).data;

export const deleteVendorLicense = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/LicensingCompliance/${vendorId}`))
    .data;

// ⬅️ SAFE GET
export const getVendorLicense = async (vendorId) =>
  safeGet(axiosInstance.get(`/api/core/LicensingCompliance/${vendorId}`));

// ----------------------------------------------------
//  PRODUCT PORTFOLIO
// ----------------------------------------------------
export const saveVendorProducts = async (data) =>
  (
    await axiosInstance.post(
      "/api/core/ProductPortfolio/save-productportfolio",
      data
    )
  ).data;

export const updateVendorProducts = async (data) =>
  (
    await axiosInstance.put(
      `/api/core/ProductPortfolio/${data.supplierProfileId}`,
      data
    )
  ).data;

export const deleteVendorProducts = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/ProductPortfolio/${vendorId}`)).data;

// ⬅️ SAFE GET
export const getVendorProducts = async (vendorId) =>
  safeGet(
    axiosInstance.get(`/api/core/ProductPortfolio/by-supplier/${vendorId}`)
  );

// ----------------------------------------------------
//  INPUTS & BRANDS
// ----------------------------------------------------
export const getVendorInputs = async () =>
  safeGet(axiosInstance.get("/api/core/inputs"));

export const getVendorBrands = async (vendorId) =>
  safeGet(axiosInstance.get(`/api/core/vendor/brands/${vendorId}`));

// ----------------------------------------------------
//  OPERATIONS SECTION
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
      `/api/core/OperationalDetails/${data.supplierProfileId}`,
      data
    )
  ).data;

export const deleteVendorOperations = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/OperationalDetails/${vendorId}`)).data;

// ⬅️ SAFE GET
export const getVendorOperations = async (vendorId) =>
  safeGet(axiosInstance.get(`/api/core/OperationalDetails/${vendorId}`));

// ----------------------------------------------------
//  FINANCIAL SECTION
// ----------------------------------------------------
export const saveVendorFinancial = async (data) =>
  (await axiosInstance.post("/api/core/FinancialPayment/save", data)).data;

export const updateVendorFinancial = async (data) =>
  (
    await axiosInstance.put(
      `/api/core/FinancialPayment/${data.supplierProfileId}`,
      data
    )
  ).data;

export const deleteVendorFinancial = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/FinancialPayment/${vendorId}`)).data;

// ⬅️ SAFE GET
export const getVendorFinancial = async (vendorId) =>
  safeGet(axiosInstance.get(`/api/core/FinancialPayment/${vendorId}`));

// ----------------------------------------------------
//  SUPPORT SERVICES
// ----------------------------------------------------
export const saveVendorSupport = async (data) =>
  (await axiosInstance.post("/api/core/SupportServices/save-detailed", data))
    .data;

export const updateVendorSupport = async (data) =>
  (
    await axiosInstance.put(
      `/api/core/SupportServices/${data.supplierProfileId}`,
      data
    )
  ).data;

export const deleteVendorSupport = async (vendorId) =>
  (await axiosInstance.delete(`/api/core/SupportServices/${vendorId}`)).data;

// ⬅️ SAFE GET
export const getVendorSupport = async (vendorId) =>
  safeGet(axiosInstance.get(`/api/core/SupportServices/${vendorId}`));

// ----------------------------------------------------
//  VERIFICATION (READ-ONLY)
// ----------------------------------------------------
export const getVendorVerification = async (vendorId) =>
  safeGet(axiosInstance.get(`/api/core/vendor/verification/${vendorId}`));
