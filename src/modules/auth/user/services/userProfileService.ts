// src/services/userProfileService.js

import axiosInstance from "@/src/api/client/axiosInstance";
import { safeGet } from "@/src/services/helpers/safeGet";

// ----------------------------------------------------
// 🔐 LOGIN
// ----------------------------------------------------
export const login = async (credentials) => {
  const { data } = await axiosInstance.post(
    "/api/core/account/login",
    credentials,
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};

// ----------------------------------------------------
// 👤 PROFILE SECTION
// ----------------------------------------------------
export const saveProfileSection = async (data) => {
  const response = await axiosInstance.post("/api/core/userProfile", data);
  return response.data;
};

export const updateProfileSection = async (data) => {
  const response = await axiosInstance.put(
    `/api/core/userProfile/${data.id}`,
    data
  );
  return response.data;
};

export const deleteProfileSection = async (profileId) => {
  const response = await axiosInstance.delete(`/api/core/address/${profileId}`);
  return response.data;
};

// ⬅️ Wrapped in safeGet
export const getProfileSection = async (userId) =>
  safeGet(
    axiosInstance.get(
      `/api/core/userProfile/GetProfileByUserId?userId=${userId}`
    )
  );

// ----------------------------------------------------
// 🔢 OTP VERIFY
// ----------------------------------------------------
export const verifyUserOtp = async (data) => {
  const response = await axiosInstance.post(
    "/api/core/otpverification/verify",
    data
  );
  return response.data;
};

export const sendUserOtp = async (phoneNumber: string) => {
  const response = await axiosInstance.post("/api/core/otpverification/send", {
    phoneNumber,
  });
  return response.data;
};

// ----------------------------------------------------
// 🏠 ADDRESS SECTION
// ----------------------------------------------------
export const saveAddressSection = async (data) => {
  const response = await axiosInstance.post("/api/core/address/create", data);
  return response.data;
};

export const updateAddressSection = async (data) => {
  const response = await axiosInstance.put(
    `/api/core/address/${data.profileId}`,
    data
  );
  return response.data;
};

export const deleteAddressSection = async (addressId) => {
  const response = await axiosInstance.delete(`/api/core/address/${addressId}`);
  return response.data;
};

// ⬅️ Wrapped in safeGet
export const getAddressSection = async (profileId) =>
  safeGet(axiosInstance.get(`/api/core/address/by-profile/${profileId}`));

// ----------------------------------------------------
// 🎓 EDUCATION SECTION
// ----------------------------------------------------
export const saveEducationSection = async (data) => {
  const response = await axiosInstance.post("/api/core/education/Create", data);
  return response.data;
};

export const updateEducationSection = async (data) => {
  const response = await axiosInstance.put(
    `/api/core/education/${data.profileId}`,
    data
  );
  return response.data;
};

export const deleteEducationSection = async (educationId) => {
  const response = await axiosInstance.delete(
    `/api/core/education/${educationId}`
  );
  return response.data;
};

// ⬅️ Wrapped in safeGet
export const getEducationSection = async (profileId) =>
  safeGet(axiosInstance.get(`/api/core/education/by-profile/${profileId}`));

// ----------------------------------------------------
// 💼 PROFESSION SECTION
// ----------------------------------------------------
export const saveProfessionSection = async (data) => {
  const response = await axiosInstance.post(
    "/api/core/professional-profile/Create",
    data
  );
  return response.data;
};

export const updateProfessionSection = async (data) => {
  const response = await axiosInstance.put(
    `/api/core/professional-profile/${data.profileId}`,
    data
  );
  return response.data;
};

export const deleteProfessionSection = async (professionId) => {
  const response = await axiosInstance.delete(
    `/api/core/professional-profile/${professionId}`
  );
  return response.data;
};

// ⬅️ Wrapped in safeGet
export const getProfessionSection = async (profileId) =>
  safeGet(
    axiosInstance.get(
      `/api/core/professional-profile/GetByProfileId?profileId=${profileId}`
    )
  );

export const userExists = async (user) => {
  const { data } = await axiosInstance.post(
    `/api/core/userProfile/CheckExistingEmailandPhoneNumber/`,
    user
  );
  return data;
};
