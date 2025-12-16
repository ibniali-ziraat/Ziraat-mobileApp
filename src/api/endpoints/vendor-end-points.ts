export const VENDOR_API_ENDPOINTS = {
  BUSINESS_PROFILE: {
    CREATE: "/api/core/BusinessInformation",
    UPDATE: (id: string | number) => `/api/core/BusinessInformation/${id}`,
    DELETE: (vendorId: string | number) =>
      `/api/core/vendor/profile/${vendorId}`,
    BY_USER_ID: (userId: string | number) =>
      `/api/core/BusinessInformation/GetBusinessInformationByUserId?userId=${userId}`,
  },

  LICENSE: {
    CREATE: "/api/core/LicensingCompliance",
    UPDATE: (supplierProfileId: string | number) =>
      `/api/core/LicensingCompliance/${supplierProfileId}`,
    DELETE: (vendorId: string | number) =>
      `/api/core/LicensingCompliance/${vendorId}`,
    GET: (vendorId: string | number) =>
      `/api/core/LicensingCompliance/${vendorId}`,
  },

  PRODUCT_PORTFOLIO: {
    CREATE: "/api/core/ProductPortfolio/save-productportfolio",
    UPDATE: (supplierProfileId: string | number) =>
      `/api/core/ProductPortfolio/${supplierProfileId}`,
    DELETE: (vendorId: string | number) =>
      `/api/core/ProductPortfolio/${vendorId}`,
    BY_SUPPLIER: (vendorId: string | number) =>
      `/api/core/ProductPortfolio/by-supplier/${vendorId}`,
  },

  INPUTS: "/api/core/inputs",
  BRANDS: (vendorId: string | number) => `/api/core/vendor/brands/${vendorId}`,

  OPERATIONS: {
    CREATE: "/api/core/OperationalDetails/save-operationalDetails",
    UPDATE: (supplierProfileId: string | number) =>
      `/api/core/OperationalDetails/${supplierProfileId}`,
    DELETE: (vendorId: string | number) =>
      `/api/core/OperationalDetails/${vendorId}`,
    GET: (vendorId: string | number) =>
      `/api/core/OperationalDetails/${vendorId}`,
  },

  FINANCIAL: {
    CREATE: "/api/core/FinancialPayment/save",
    UPDATE: (supplierProfileId: string | number) =>
      `/api/core/FinancialPayment/${supplierProfileId}`,
    DELETE: (vendorId: string | number) =>
      `/api/core/FinancialPayment/${vendorId}`,
    GET: (vendorId: string | number) =>
      `/api/core/FinancialPayment/${vendorId}`,
  },

  SUPPORT: {
    CREATE: "/api/core/SupportServices/save-detailed",
    UPDATE: (supplierProfileId: string | number) =>
      `/api/core/SupportServices/${supplierProfileId}`,
    DELETE: (vendorId: string | number) =>
      `/api/core/SupportServices/${vendorId}`,
    GET: (vendorId: string | number) => `/api/core/SupportServices/${vendorId}`,
  },

  VERIFICATION: (vendorId: string | number) =>
    `/api/core/vendor/verification/${vendorId}`,
} as const;
