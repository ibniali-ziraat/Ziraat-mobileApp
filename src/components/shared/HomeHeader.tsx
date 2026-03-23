import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { router } from "expo-router";
import { BarChart2, Bell } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";
import { ScreenContent } from "./ScreenContent";

const HomeHeader = () => {
  const { userId } = useAuth();
  const { data } = useProfileQuery(userId);

  const title = data?.fullName ?? "Ziraat";

  return (
    <ScreenContent className={"bg-light"}>
      <View
        className="w-full bg-white flex-row items-center justify-between pt-4"
        style={{ borderBottomColor: colors.neutral }}
      >
        <View>
          <CsText className="text-md" style={[typography.Poppins_m_semibold]}>
            Welcome
          </CsText>
          <CsText
            style={[{ color: colors.dark }, typography.Poppins_m_regular]}
          >
            {title.toUpperCase()}
          </CsText>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            className="p-2 mr-3 rounded-full border"
            style={{ borderColor: colors.neutral }}
            onPress={() =>
              router.push({
                pathname: ROUTES.DASHBOARD,
              })
            }
          >
            <BarChart2 size={20} color={colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/user/notifications")}
            className="p-2 mr-3 rounded-full border"
            style={{ borderColor: colors.neutral }}
          >
            <Bell size={24} color={colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push(ROUTES.ACCOUNT.PROFILE)}>
            <View className="w-10 h-10 rounded-full items-center justify-center bg-secondary">
              <CsText className="text-white font-bold uppercase text-lg">
                {data?.fullName ? data.fullName.charAt(0) : "U"}
              </CsText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContent>
  );
};

export default React.memo(HomeHeader);
