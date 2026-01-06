import axiosInstance from "../api/client/axiosInstance";

export const uploadFile = async ({ file, UserType, UserId, FileCategory }) => {
  const formData = new FormData();

  formData.append("file", file.file);
  formData.append("UserType", UserType);
  formData.append("UserId", UserId);
  formData.append("FileCategory", FileCategory);

  return axiosInstance.post("/api/FileUpload/upload", formData);
};
