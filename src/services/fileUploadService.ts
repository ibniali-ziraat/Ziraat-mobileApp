import axiosInstance from "../api/client/axiosInstance";

export const uploadFile = async ({
  file,
  UserType,
  UserId,
  FileCategory,
}: {
  file: { uri: string; name: string; mimeType: string };
  UserType: string;
  UserId: string;
  FileCategory: string;
}) => {
  const formData = new FormData();

  formData.append("File", {
    uri: file.uri,
    name: file.name,
    type: file.mimeType,
  } as any);

  formData.append("UserType", UserType);
  formData.append("FileCategory", FileCategory);
  formData.append("UserId", UserId.toString());

  return axiosInstance.post("/api/FileUpload/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUploadedFile = async ({ blobName }) =>
  (
    await axiosInstance.post("/api/FileUpload/delete", {
      blobName,
    })
  ).data;

interface UpdateProfilePayload {
  id: string | number;
  fullName?: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: string;
  profilePic?: string;
  [key: string]: any;
}

export const updateProfileSection = async (payload: UpdateProfilePayload) => {
  return await axiosInstance.put(
    `/api/core/userProfile/${payload.id}`, // URL ID
    payload, // Body ID
  );
};
