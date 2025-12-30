// src/hooks/reactQueryHooks.js

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteAddressSection,
  deleteEducationSection,
  deleteProfessionSection,
  deleteProfileSection,
  getAddressSection,
  getAuthProviders,
  getEducationSection,
  getProfessionSection,
  getProfileSection,
  googleLogin,
  login,
  saveAddressSection,
  saveEducationSection,
  saveProfessionSection,
  saveProfileSection,
  sendUserOtp,
  updateAddressSection,
  updateEducationSection,
  updateProfessionSection,
  updateProfileSection,
  userExists,
  verifyUserOtp,
} from "../services/userProfileService";

// ----------------------------------------------------
// 🔐 LOGIN
// ----------------------------------------------------
export const useLoginMutation = () => useMutation({
   mutationFn: login });

   export const useGetAuthProviders = () => useMutation({
   mutationFn: getAuthProviders });

    export const UseGoogleLogin = () => useMutation({
   mutationFn: googleLogin });

export const useSendOtpMutation = () =>
  useMutation({ mutationFn: sendUserOtp });

export const useOtpVerifyMutation = () =>
  useMutation({ mutationFn: verifyUserOtp });

// ----------------------------------------------------
// 👤 PROFILE
// ----------------------------------------------------
export const useProfileQuery = (userId) =>
  useQuery({
    queryKey: ["profileSection", userId],
    queryFn: () => getProfileSection(userId),
    enabled: !!userId,
  });

export const useProfileMutation = () =>
  useMutation({ mutationFn: saveProfileSection });

export const useProfileUpdateMutation = () =>
  useMutation({ mutationFn: updateProfileSection });

export const useProfileDeleteMutation = () =>
  useMutation({ mutationFn: deleteProfileSection });

// ----------------------------------------------------
// 🏠 ADDRESS
// ----------------------------------------------------
export const useAddressQuery = (profileId) =>
  useQuery({
    queryKey: ["addressSection", profileId],
    queryFn: () => getAddressSection(profileId),
    enabled: !!profileId,
  });

export const useAddressMutation = () =>
  useMutation({ mutationFn: saveAddressSection });

export const useAddressUpdateMutation = () =>
  useMutation({ mutationFn: updateAddressSection });

export const useAddressDeleteMutation = () =>
  useMutation({ mutationFn: deleteAddressSection });

// ----------------------------------------------------
// 🎓 EDUCATION
// ----------------------------------------------------
export const useEducationQuery = (profileId) =>
  useQuery({
    queryKey: ["educationSection", profileId],
    queryFn: () => getEducationSection(profileId),
    enabled: !!profileId,
  });

export const useEducationMutation = () =>
  useMutation({ mutationFn: saveEducationSection });

export const useEducationUpdateMutation = () =>
  useMutation({ mutationFn: updateEducationSection });

export const useEducationDeleteMutation = () =>
  useMutation({ mutationFn: deleteEducationSection });

// ----------------------------------------------------
// 💼 PROFESSION
// ----------------------------------------------------
export const useProfessionQuery = (profileId) =>
  useQuery({
    queryKey: ["professionSection", profileId],
    queryFn: () => getProfessionSection(profileId),
    enabled: !!profileId,
  });

export const useProfessionMutation = () =>
  useMutation({ mutationFn: saveProfessionSection });

export const useProfessionUpdateMutation = () =>
  useMutation({ mutationFn: updateProfessionSection });

export const useProfessionDeleteMutation = () =>
  useMutation({ mutationFn: deleteProfessionSection });




export const useCheckUserExists = () =>
  useMutation({ mutationFn: userExists });
