import axiosInstance from "../../../api/client/axiosInstance";

export const getProducts = async () => {
  const { data } = await axiosInstance.get("/search");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await axiosInstance.get(
    `/api/catalog/ProductsApi/detail/${id}`,
  );

  return data;
};

export const getProductBySearch = async (params: {
  query?: string;
  brand?: string;
  category?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  const { data } = await axiosInstance.get("/search", {
    params: { page: 1, ...params },
  });
  return data;
};

export const buyProduct = async (payload: any) => {
  const { data } = await axiosInstance.post("/api/orders/buy", payload);
  return data;
};

// Trending Products (30m cache)
export const getTrendingProducts = async () => {
  const { data } = await axiosInstance.get("/api/products/discover/trending");
  return data;
};

// Best Deals (5m cache)
export const getBestDeals = async () => {
  const { data } = await axiosInstance.get("/api/products/discover/best-deals");
  return data;
};

// Search with Vendors (POST)
export const searchWithVendors = async (payload: {
  query?: string;
  brand?: string;
  category?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  const { data } = await axiosInstance.post(
    "/discover/search-with-vendors",
    payload,
  );
  return data;
};

// Compare Products (assuming POST)
export const compareProducts = async (payload: { productIds: string[] }) => {
  const { data } = await axiosInstance.post(
    "/discover/compare-products",
    payload,
  );
  return data;
};
