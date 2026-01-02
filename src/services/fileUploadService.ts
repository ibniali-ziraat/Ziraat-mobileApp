import axiosInstance from "../api/client/axiosInstance";

export const uploadFile = async (data) => {
  const formData = new FormData();

  formData.append("file", {
    uri: data.file.uri,
    name: data.file.name,
    type: data.file.type,
  });

  formData.append("ownerType", data.ownerType); // vendor | user
  formData.append("ownerId", String(data.ownerId));
  formData.append("purpose", data.purpose); // license | profile | product | ...

  const response = await axiosInstance.post("/api/core/file-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data; // { url }
};
