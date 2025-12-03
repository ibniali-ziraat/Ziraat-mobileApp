import BackHeader from "@/src/components/shared/BackHeader";
import ProfileHeader from "./components/ProfileHeader";
import SectionCard from "./components/SectionCard";

import { colors } from "@/src/constants/colors";

import { useAuth } from "@/src/contexts/AuthContext";
import {
  useAddressDeleteMutation,
  useAddressQuery,
  useEducationDeleteMutation,
  useEducationQuery,
  useProfessionDeleteMutation,
  useProfessionQuery,
  useProfileQuery,
} from "@/src/hooks/userQueryHooks";

import { showSuccessToast } from "@/src/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { userDeleteConfig } from "../auth/vendor/config/userDeleteConfig";
import { userRoutes } from "../auth/vendor/config/userRoutes";

export default function UserProfileScreen() {
  const { userId, userProfileId } = useAuth();
  const queryClient = useQueryClient();

  // Queries
  const { data: profileData } = useProfileQuery(userId);
  const { data: addressData } = useAddressQuery(userProfileId);
  const { data: educationData } = useEducationQuery(userProfileId);
  const { data: professionData } = useProfessionQuery(userProfileId);

  // Delete Mutations
  const { mutateAsync: deleteAddressApi } = useAddressDeleteMutation();
  const { mutateAsync: deleteEducationApi } = useEducationDeleteMutation();
  const { mutateAsync: deleteProfessionApi } = useProfessionDeleteMutation();

  // Route Navigation
  const goToSection = (section) => router.push(userRoutes[section]);

  // API Delete Map
  const deleteActions = {
    address: deleteAddressApi,
    education: deleteEducationApi,
    profession: deleteProfessionApi,
  };

  // Single Delete Handler (same pattern as Vendor)
  const handleDelete = async (section) => {
    try {
      const config = userDeleteConfig[section];
      const api = deleteActions[section];

      await api(userProfileId);

      showSuccessToast(config.success);

      queryClient.invalidateQueries([config.queryKey, userProfileId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <BackHeader>Profile</BackHeader>

      <ProfileHeader
        profileData={profileData}
        onEdit={() => goToSection("profile")}
      />

      <SectionCard
        title="Address"
        onEdit={!addressData ? () => goToSection("address") : undefined}
        onDelete={addressData ? () => handleDelete("address") : undefined}
        style={
          !addressData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {addressData ? (
          <Text>
            {addressData.village}, {addressData.tehsil}, {addressData.district},{" "}
            {addressData.state} - {addressData.pincode}
          </Text>
        ) : (
          <TouchableOpacity onPress={() => goToSection("address")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              + Add Address
            </Text>
          </TouchableOpacity>
        )}
      </SectionCard>

      <SectionCard
        title="Education"
        onEdit={!educationData ? () => goToSection("education") : undefined}
        onDelete={educationData ? () => handleDelete("education") : undefined}
        style={
          !educationData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {educationData ? (
          <>
            <Text>{educationData.highestQualification}</Text>
            <Text>{educationData.instituteName}</Text>
            <Text>{educationData.passingYear}</Text>
            <Text>{educationData.specialization}</Text>
          </>
        ) : (
          <TouchableOpacity onPress={() => goToSection("education")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              + Add Education
            </Text>
          </TouchableOpacity>
        )}
      </SectionCard>

      {/* PROFESSION SECTION */}
      <SectionCard
        title="Profession"
        onEdit={!professionData ? () => goToSection("profession") : undefined}
        onDelete={professionData ? () => handleDelete("profession") : undefined}
        style={
          !professionData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {professionData ? (
          <>
            <Text>{professionData.organizationName}</Text>
            <Text>{professionData.designation}</Text>
            <Text>{professionData.experienceYears}</Text>
          </>
        ) : (
          <TouchableOpacity onPress={() => goToSection("profession")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              + Add Profession
            </Text>
          </TouchableOpacity>
        )}
      </SectionCard>
    </ScrollView>
  );
}
