import BackHeader from "@/src/components/shared/BackHeader";

import { colors } from "@/src/constants/colors";

import {
  useAddressDeleteMutation,
  useAddressQuery,
  useEducationDeleteMutation,
  useEducationQuery,
  useProfessionDeleteMutation,
  useProfessionQuery,
  useProfileQuery,
} from "../../hooks/userQueryHooks";

import { showSuccessToast } from "@/src/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

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
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { DUMMY_EMAIL } from "@/src/constants/constants";
import { ROUTES } from "@/src/constants/routes";
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  GraduationCap,
  GraduationCapIcon,
  Home,
  Mail,
  MapPin,
  Navigation,
  Phone,
  School,
  User,
  UserCheck,
  VenetianMask,
} from "lucide-react-native";
import DetailsCard from "./components/DetailsCard";

export default function UserProfileScreen() {
  const [deleteSection, setDeleteSection] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { userId, setUserProfileId, userProfileId, logoutUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: profileData } = useProfileQuery(userId);
  const { data: addressData } = useAddressQuery(userProfileId);
  const { data: educationData } = useEducationQuery(userProfileId);
  const { data: professionData } = useProfessionQuery(userProfileId);
  console.log(professionData);

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
    <ScreenLayout>
      <BackHeader
        title="Profile"
        onPress={() => router.push(ROUTES.TABS.HOME)}
      />
      <ScreenContent>
        <ProfileTopHeader
          profilePic={profileData?.profilePic}
          fullName={profileData?.fullName}
          profileData={profileData}
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

        <DetailsCard 
          heading="Personal Details"
          items={
            profileData
              ? [
                  {
                    title: "Email",
                    value:
                      profileData?.email === DUMMY_EMAIL
                        ? "—"
                        : profileData?.email,
                    icon: <Mail size={22} color={colors.primary} />,
                  },
                  {
                    title: "Phone",
                    value: profileData?.phone,
                    icon: <Phone size={22} color={colors.primary} />,
                  },
                  {
                    title: "Age",
                    value: profileData?.age,
                    icon: <User size={22} color={colors.primary} />,
                  },
                  {
                    title: "Gender",
                    value: profileData?.gender,
                    icon: <VenetianMask size={22} color={colors.primary} />,
                  },
                  {
                    title: "User Since",
                    value: profileData?.createdOn
                      ? new Date(profileData.createdOn).toLocaleDateString()
                      : "—",
                    icon: <Calendar size={22} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={() => goToSection("profile")}
        />
        <DetailsCard
          heading="Address"
          items={
            addressData
              ? [
                  {
                    title: "State",
                    value: addressData.state,
                    icon: <MapPin size={22} color={colors.primary} />,
                  },
                  {
                    title: "District",
                    value: addressData.district,
                    icon: <Building size={22} color={colors.primary} />,
                  },
                  {
                    title: "Tehsil",
                    value: addressData.tehsil,
                    icon: <Navigation size={22} color={colors.primary} />,
                  },
                  {
                    title: "Locality",
                    value: addressData.village,
                    icon: <Home size={22} color={colors.primary} />,
                  },

                  {
                    title: "Pincode",
                    value: addressData.pincode,
                    icon: <MapPin size={22} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={addressData ? () => goToSection("address") : undefined}
          onDelete={addressData ? () => setDeleteSection("address") : undefined}
          onAdd={() => goToSection("address")}
          emptyActionLabel="Add Address"
        />
        {/* EDUCATION */}
        <DetailsCard
          heading="Education"
          items={
            educationData
              ? [
                  {
                    title: "Qualification",
                    value: educationData.highestQualification,
                    icon: <GraduationCap size={22} color={colors.primary} />,
                  },
                  {
                    title: "Institute",
                    value: educationData.instituteName,
                    icon: <School size={22} color={colors.primary} />,
                  },
                  {
                    title: "Passing Year",
                    value: educationData.passingYear,
                    icon: <Calendar size={22} color={colors.primary} />,
                  },
                  {
                    title: "Specialization",
                    value: educationData.specialization || "—",
                    icon: (
                      <GraduationCapIcon size={22} color={colors.primary} />
                    ),
                  },
                ]
              : []
          }
          onEdit={educationData ? () => goToSection("education") : undefined}
          onDelete={
            educationData ? () => setDeleteSection("education") : undefined
          }
          onAdd={() => goToSection("education")}
          emptyActionLabel="Add Education"
        />
        {/* PROFESSION */}
        <DetailsCard
          heading="Profession"
          onEdit={() => goToSection("profession")}
          onDelete={() => setDeleteSection("profession")}
          onAdd={() => goToSection("profession")}
          items={
            professionData
              ? [
                  {
                    title: "Organization",
                    value: professionData.organizationName,
                    icon: <Briefcase size={22} color={colors.primary} />,
                  },
                  {
                    title: "Designation",
                    value: professionData.designation,
                    icon: <UserCheck size={22} color={colors.primary} />,
                  },
                  {
                    title: "Profession Type",
                    value: professionData.professionType,
                    icon: <Building size={22} color={colors.primary} />,
                  },
                  {
                    title: "Experience",
                    value: professionData.experienceYears
                      ? `${professionData.experienceYears} yrs`
                      : "—",
                    icon: <Clock size={22} color={colors.primary} />,
                  },
                  {
                    title: "Skills",
                    value: professionData.skills || "—",
                    icon: <UserCheck size={22} color={colors.primary} />,
                  },
                ]
              : []
          }
          emptyActionLabel="Add Profession Details"
        />

        <LogoutButton onPress={logoutUser} />
        <ConfirmDeleteModal
          visible={!!deleteSection}
          title="Confirm deletion"
          description="Are you sure you want to delete this information?"
          onCancel={() => setDeleteSection(null)}
          onConfirm={confirmDelete}
          loading={deleting}
        />
      </ScreenContent>
    </ScreenLayout>
  );
}
