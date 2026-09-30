import axiosInstance from "../../../utils/axiosInstance";

export const GetAboutUsData = async () => {
  const response = await axiosInstance.get("/aboutus");
  return response.data;
};
