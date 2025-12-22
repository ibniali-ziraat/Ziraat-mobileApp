/* -------- QUERIES -------- */

import axiosInstance from "../api/client/axiosInstance";

export const getProducts = async () => {
  const { data } = await axiosInstance.get("/api/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/products/${id}`);
  return data;
};

/* -------- MUTATIONS -------- */

export const createProduct = async (payload: any) => {
  const { data } = await axiosInstance.post("/api/products", payload);
  return data;
};

export const updateProduct = async ({
  id,
  payload,
}: {
  id: string;
  payload: any;
}) => {
  const { data } = await axiosInstance.put(`/api/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/products/${id}`);
  return data;
};
