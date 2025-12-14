import { ScrollView, Text, TouchableOpacity } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import ProfileHeader from "./components/ProfileHeader";
import SectionCard from "./components/SectionCard";

import { colors } from "@/src/constants/colors";

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

import { useProfileProgress } from "@/src/hooks/useProfileProgress";
import { useEffect, useState } from "react";
import { userDeleteConfig } from "../auth/vendor/config/userDeleteConfig";
import { userRoutes } from "../auth/vendor/config/userRoutes";
import { ActivityIndicator } from "react-native-paper";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import LogoutButton from "@/src/components/ui/LogoutButton";
import ProfileProgressBar from "@/src/components/shared/ProfileProgressBar";
import ProfileTopHeader from "@/src/components/shared/ProfileTopHeader";
import ProfileDetails from "@/src/components/shared/ProfileDetails";
import { useAuth } from "@/src/contexts/AuthContext";
import { ROUTES } from "@/src/constants/routes";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";

export default function UserProfileScreen() {
  const { userId, setUserProfileId, userProfileId, logoutUser } = useAuth();
  const [deleteSection, setDeleteSection] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const queryClient = useQueryClient();

  const { data: profileData } = useProfileQuery(userId);
  console.log(profileData, "profileData......");

  const { data: addressData } = useAddressQuery(userProfileId);
  const { data: educationData } = useEducationQuery(userProfileId);
  const { data: professionData } = useProfessionQuery(userProfileId);

  const { mutateAsync: deleteAddressApi } = useAddressDeleteMutation();
  const { mutateAsync: deleteEducationApi } = useEducationDeleteMutation();
  const { mutateAsync: deleteProfessionApi } = useProfessionDeleteMutation();
  const { progress, missingSections } = useProfileProgress({
    profile: profileData,
    address: addressData,
    education: educationData,
    profession: professionData,
  });

  useEffect(() => {
    if (profileData?.id) {
      setUserProfileId(profileData?.id);
    }
  }, [profileData]);

  console.log();

  const goToSection = (section) => router.push(userRoutes[section]);

  const deleteActions = {
    address: deleteAddressApi,
    education: deleteEducationApi,
    profession: deleteProfessionApi,
  };

  const handleDelete = async (section: string) => {
    try {
      const config = userDeleteConfig[section];
      const api = deleteActions[section];

      await api(userProfileId!);

      showSuccessToast(config.success);
      queryClient.invalidateQueries([config.queryKey, userProfileId]);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteSection) return;

    try {
      setDeleting(true);
      await handleDelete(deleteSection);
      setDeleteSection(null);
    } finally {
      setDeleting(false);
    }
  };

  if (!profileData || deleting) {
    return <Loader />;
  }

  return (
    <ScreenLayout>
      <BackHeader
        title="Profile"
        onPress={() => router.replace(ROUTES.USER.HOME)}
      />
      <ProfileTopHeader
        profilePic={profileData?.profilePic}
        fullName={profileData?.fullName}
        onEdit={() => goToSection("profile")}
      />

      {/* Progress bar */}
      {progress < 100 && (
        <ProfileProgressBar
          progress={progress}
          missingSections={missingSections}
          completedSections={[
            "Profile",
            "Address",
            "Education",
            "Profession",
          ].filter((s) => !missingSections.includes(s.toLowerCase()))}
        />
      )}

      {/* Details section */}
      <ProfileDetails
        email={profileData?.email}
        phone={profileData?.phone}
        age={profileData?.age}
        gender={profileData?.gender}
        createdOn={profileData?.createdOn}
      />

      <SectionCard
        title="Address"
        onEdit={addressData ? () => goToSection("address") : undefined}
        onDelete={addressData ? () => setDeleteSection("address") : undefined}
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

      {/* EDUCATION SECTION */}
      <SectionCard
        title="Education"
        onEdit={educationData ? () => goToSection("education") : undefined}
        onDelete={
          educationData ? () => setDeleteSection("education") : undefined
        }
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
        onEdit={professionData ? () => goToSection("profession") : undefined}
        onDelete={
          professionData ? () => setDeleteSection("profession") : undefined
        }
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

      {/* LOGOUT BUTTON */}
      <LogoutButton onPress={async () => await logoutUser()} />
      <ConfirmDeleteModal
        visible={!!deleteSection}
        title="Confirm deletion"
        description="Are you sure you want to delete this information?"
        onCancel={() => setDeleteSection(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </ScreenLayout>
  );
}
