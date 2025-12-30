import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CsText from "./CsText";

const HomeHeader = () => {
  const { userId } = useAuth();
  const { data } = useProfileQuery(userId);

  const title = data?.fullName ?? "Ziraat";

  return (
    <View
      className="w-full bg-white flex-row items-center justify-between pt-4"
      style={{ borderBottomColor: colors.neutral }}
    >
      <View>
        <CsText className="text-md" style={[typography.Poppins_m_semibold]}>
          Welcome
        </CsText>
        <CsText style={[{ color: colors.dark }, typography.Poppins_m_regular]}>
          {title}
        </CsText>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => router.push("/user/notifications")}
          className="p-2 mr-3 rounded-full border"
          style={{ borderColor: colors.neutral }}
        >
          <Bell size={24} color={colors.secondary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push(ROUTES.USER.PROFILE)}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=2" }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(HomeHeader);
