import AddressSection from "@/src/modules/auth/user/sections/AddressSection";
import EducationSection from "@/src/modules/auth/user/sections/EducationSection";
import ProfessionSection from "@/src/modules/auth/user/sections/ProfessionSection";
import ProfileSection from "@/src/modules/auth/user/sections/ProfileSection";
import { useMemo } from "react";

export function useUserSectionConfig({
  userId,
  userProfileId,
  profileData,
  addressData,
  educationData,
  professionData,
  saveProfile,
  updateProfile,
  saveAddress,
  updateAddress,
  saveEducation,
  updateEducation,
  saveProfession,
  updateProfession,
}) {
  return useMemo(
    () => ({
      0: {
        data: profileData,
        save: saveProfile,
        update: updateProfile,
        payload: (v, existing) => ({
          ...v,
          ...(existing ? { id: existing.id } : { userId }),
        }),
        Component: ProfileSection,
      },

      1: {
        data: addressData,
        save: saveAddress,
        update: updateAddress,
        payload: (v) => ({
          ...v,
          profileId: userProfileId,
        }),
        Component: AddressSection,
      },

      2: {
        data: educationData,
        save: saveEducation,
        update: updateEducation,
        payload: (v) => ({
          ...v,
          profileId: userProfileId,
        }),
        Component: EducationSection,
      },

      3: {
        data: professionData,
        save: saveProfession,
        update: updateProfession,
        payload: (v) => ({
          ...v,
          profileId: userProfileId,
        }),
        Component: ProfessionSection,
      },
    }),
    [
      userId,
      userProfileId,
      profileData,
      addressData,
      educationData,
      professionData,
    ]
  );
}
