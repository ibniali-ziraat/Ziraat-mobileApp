import axiosInstance from "@/src/api/client/axiosInstance";

export const GetMenuLinks = async () => {
  const response = await axiosInstance.get("/api/pages");
  return response.data;
};
