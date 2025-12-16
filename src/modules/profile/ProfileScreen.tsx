import { Text, TouchableOpacity, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
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

import ProfileDetails from "@/src/components/shared/ProfileDetails";
import ProfileProgressBar from "@/src/components/shared/ProfileProgressBar";
import ProfileTopHeader from "@/src/components/shared/ProfileTopHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import LogoutButton from "@/src/components/ui/LogoutButton";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileProgress } from "@/src/hooks/useProfileProgress";
import { useEffect, useState } from "react";
import { userDeleteConfig } from "../auth/vendor/config/userDeleteConfig";
import { userRoutes } from "../auth/vendor/config/userRoutes";

// Icons
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Briefcase, GraduationCap, MapPin } from "lucide-react-native";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";

export default function UserProfileScreen() {
  const [deleteSection, setDeleteSection] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { userId, setUserProfileId, userProfileId, logoutUser } = useAuth();
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

  return (
    <View className="w-full h-full" style={{ backgroundColor: colors.error }}>
      <ScreenLayout>
        <BackHeader title="Profile" />

        <ProfileTopHeader
          profilePic={profileData?.profilePic}
          fullName={profileData?.fullName}
          onEdit={() => goToSection("profile")}
        />

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

        <ProfileDetails
          email={profileData?.email}
          phone={profileData?.phone}
          age={profileData?.age}
          gender={profileData?.gender}
          createdOn={profileData?.createdOn}
        />

        <ZiraatCard
          width="100%"
          height="7%"
          marginBottom={1}
          paddingHorizontal={1}
        >
          <SectionCard
            title="Address"
            icon={<MapPin size={22} color={colors.primary} />}
            onEdit={addressData ? () => goToSection("address") : undefined}
            onDelete={
              addressData ? () => setDeleteSection("address") : undefined
            }
          >
            {addressData ? (
              <Text>
                {addressData.village}, {addressData.tehsil},{" "}
                {addressData.district}, {addressData.state} -{" "}
                {addressData.pincode}
              </Text>
            ) : (
              <TouchableOpacity onPress={() => goToSection("address")}>
                <Text style={{ color: colors.primary, fontWeight: "500" }}>
                  + Add Address
                </Text>
              </TouchableOpacity>
            )}
          </SectionCard>
        </ZiraatCard>
        <ZiraatCard
          width="100%"
          height="7%"
          marginBottom={1}
          paddingHorizontal={1}
        >
          <SectionCard
            title="Education"
            icon={<GraduationCap size={22} color={colors.primary} />}
            onEdit={educationData ? () => goToSection("education") : undefined}
            onDelete={
              educationData ? () => setDeleteSection("education") : undefined
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
                <Text style={{ color: colors.primary, fontWeight: "500" }}>
                  + Add Education
                </Text>
              </TouchableOpacity>
            )}
          </SectionCard>
        </ZiraatCard>

        {/* EDUCATION SECTION */}

        <ZiraatCard
          width="100%"
          height="7%"
          marginBottom={1}
          paddingHorizontal={1}
        >
          {/* PROFESSION SECTION */}
          <SectionCard
            title="Profession"
            icon={<Briefcase size={22} color={colors.primary} />}
            onEdit={
              professionData ? () => goToSection("profession") : undefined
            }
            onDelete={
              professionData ? () => setDeleteSection("profession") : undefined
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
                <Text style={{ color: colors.primary, fontWeight: "500" }}>
                  + Add Profession
                </Text>
              </TouchableOpacity>
            )}
          </SectionCard>
        </ZiraatCard>

        {/* LOGOUT BUTTON */}
        <LogoutButton onPress={logoutUser} />

        <ConfirmDeleteModal
          visible={!!deleteSection}
          title="Confirm deletion"
          description="Are you sure you want to delete this information?"
          onCancel={() => setDeleteSection(null)}
          onConfirm={confirmDelete}
          loading={deleting}
        />
      </ScreenLayout>
    </View>
  );
}
