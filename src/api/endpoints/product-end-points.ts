export const PRODUCT_API_ENDPOINTS = {
  PRODUCTS: {
    LIST: "/api/products",
    BY_ID: (id: string | number) => `/api/products/${id}`,
  },
} as const;
