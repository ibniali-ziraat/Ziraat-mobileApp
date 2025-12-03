export const vendorDeleteConfig = {
  license: {
    apiKey: "vendorLicense",
    success: "License deleted",
  },
  products: {
    apiKey: "vendorProducts",
    success: "Products deleted",
  },
  operations: {
    apiKey: "vendorOperations",
    success: "Operations deleted",
  },
  financial: {
    apiKey: "vendorFinancial",
    success: "Financial details deleted",
  },
  support: {
    apiKey: "vendorSupport",
    success: "Support info deleted",
  },
} as const;
