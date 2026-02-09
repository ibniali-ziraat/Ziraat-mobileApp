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
