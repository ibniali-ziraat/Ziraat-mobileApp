import axiosInstance from "../../../api/client/axiosInstance";

export const getProducts = async (params?: {
  query?: string;
  brand?: string;
  category?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  const { data } = await axiosInstance.get("/vendor/search", {
    params: {
      // page: 2,
      ...params,
    },
  });

  return data;
};

export const getProductById = async (
  id: string,
  vendorId?: string,
  vendorProductId?: string,
) => {
  const { data } = await axiosInstance.get(
    `/api/catalog/ProductsApi/detail/${id}`,
    {
      params: {
        ...(vendorId && { vendorId }),
        ...(vendorProductId && { vendorProductId }),
      },
    },
  );

  return data;
};

export const buyProduct = async (payload: any) => {
  const { data } = await axiosInstance.post("/api/orders/buy", payload);
  return data;
};

export const getTrendingProducts = async () => {
  const { data } = await axiosInstance.get("/api/products/discover/trending");
  return data;
};

export const getBestDeals = async () => {
  const { data } = await axiosInstance.get("/api/products/discover/best-deals");
  return data;
};

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

export const compareProducts = async (payload: { productIds: string[] }) => {
  const { data } = await axiosInstance.post(
    "/discover/compare-products",
    payload,
  );

  return data;
};
