import axiosInstance from "../api/client/axiosInstance";

export const uploadFile = async ({ file, UserType, UserId, FileCategory }) => {
  console.log(file, "file...");

  const formData = new FormData();

  formData.append("File", {
    uri: file.uri,
    name: file.name,
    type: file.mimeType || "application/octet-stream",
  });
  formData.append("UserType", UserType);
  formData.append("UserId", UserId);
  formData.append("FileCategory", FileCategory);

  return axiosInstance.post("/api/FileUpload/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: (data) => {
      return data; // IMPORTANT: prevent Axios from transforming FormData
    },
  });
};

export const deleteUploadedFile = async ({ blobName }) =>
  (
    await axiosInstance.post("/api/FileUpload/delete", {
      blobName,
    })
  ).data;
