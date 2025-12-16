import { Text, TouchableOpacity } from "react-native";

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
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { ROUTES } from "@/src/constants/routes";
import { Briefcase, GraduationCap, MapPin } from "lucide-react-native";
import { View } from "react-native";

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
    // <View  style={{ backgroundColor: colors.error, width:"100%", height:"100%", marginHorizontal: 15 }}>
    <ScreenLayout>
      <BackHeader title="Profile" onPress={() => router.push(ROUTES.USER.HOME)} />

      <ProfileTopHeader
        profilePic={profileData?.profilePic}
        fullName={profileData?.fullName}
      // onEdit={() => goToSection("profile")}
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
        onEdit={() => goToSection("profile")}
      />




      <ZiraatCard
        width="100%"
        marginBottom={1}
        paddingHorizontal={2}
      >
        <SectionCard
          title="Address"
          icon={<MapPin size={21} color={colors.primary} />}
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
        marginBottom={1}
        paddingHorizontal={2}
      >
        <SectionCard
          title="Education"
          icon={<GraduationCap size={21} color={colors.primary} />}
          onEdit={educationData ? () => goToSection("education") : undefined}
          onDelete={
            educationData ? () => setDeleteSection("education") : undefined
          }
        >
          {educationData ? (
            <>


              <View className="h-16 justify-between items-start py-2 border-b border-gray-200 ml-3">
                <Text className="text-[13px] text-gray-500 font-medium">
                  Highest Qualification
                </Text>
                <Text className="text-[14px] text-gray-900 font-semibold max-w-[55%] text-right">
                  {educationData.highestQualification || "-"}
                </Text>
              </View>

              <View className="h-16 justify-between items-start py-2 border-b border-gray-200 mt-3 ml-3">
                <Text className="text-[13px] text-gray-500 font-medium">
                  Institute
                </Text>
                <Text className="text-[14px] text-gray-900 font-semibold max-w-[55%] text-right">
                  {educationData.instituteName || "-"}
                </Text>
              </View>

              <View className="h-16 justify-between items-start py-2 border-b border-gray-200 mt-3 ml-3">
                <Text className="text-[13px] text-gray-500 font-medium">
                  Year of Passing
                </Text>
                <Text className="text-[14px] text-gray-900 font-semibold max-w-[55%] text-right">
                  {educationData.passingYear || "-"}
                </Text>
              </View>

              <View className="h-16 justify-between items-start py-2 mt-3 ml-3">
                <Text className="text-[13px] text-gray-500 font-medium">
                  Specialization
                </Text>
                <Text className="text-[14px] text-gray-900 font-semibold max-w-[55%] text-right">
                  {educationData.specialization || "-"}
                </Text>
              </View>

              {/* <Text>Education: {educationData.highestQualification}</Text>
                <Text>Institute: {educationData.instituteName}</Text>
                <Text>Year of Passing: {educationData.passingYear}</Text>
                <Text>Education: {educationData.specialization}</Text> */}
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
        marginBottom={1}
        paddingHorizontal={2}
      >
        {/* PROFESSION SECTION */}
        <SectionCard
        
          title="Profession"
          icon={<Briefcase size={21} color={colors.primary} />}
          onEdit={
            professionData ? () => goToSection("profession") : undefined
          }
          onDelete={
            professionData ? () => setDeleteSection("profession") : undefined
          }
        >
          {professionData ? (
            <>

              <View className="h-16 flex justify-between items-start py-2 border-b border-gray-200 ml-3">
                <Text className="text-[13px] text-gray-500 font-medium">
                  Organisation
                </Text>
                <Text className="text-[14px] text-gray-900 font-semibold max-w-[55%] text-right">
                  {professionData.organizationName || "-"}
                </Text>
              </View>

              <View className=" h-16 flex justify-between items-start py-2 border-b border-gray-200 mt-3 ml-3">
                <Text className="text-[13px] text-gray-500 font-medium">
                  Designation
                </Text>
                <Text className="text-[14px] text-gray-900 font-semibold max-w-[55%] text-right">
                  {professionData.designation || "-"}
                </Text>
              </View>

              <View className="h-16 flex justify-between items-start py-2 mt-3 ml-3">
                <Text className="text-[13px] text-gray-500 font-medium">
                  Experience
                </Text>
                <Text className="text-[14px] text-gray-900 font-semibold text-right">
                  {professionData.experienceYears
                    ? `${professionData.experienceYears} yrs`
                    : "-"}
                </Text>
              </View>


              {/* <Text>Organisation: {professionData.organizationName}</Text>
              <Text>Designation: {professionData.designation}</Text>
              <Text>Exp: {professionData.experienceYears}</Text> */}


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
      <LogoutButton
        onPress={async () => {
          await logoutUser();
          router.replace("/auth/user");
        }}
      />
      <ConfirmDeleteModal
        visible={!!deleteSection}
        title="Confirm deletion"
        description="Are you sure you want to delete this information?"
        onCancel={() => setDeleteSection(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </ScreenLayout>
    // </View>
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
