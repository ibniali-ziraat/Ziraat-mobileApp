import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
        <Text className="text-md" style={{ color: colors.dark }}>
          Welcome
        </Text>
        <Text className="text-lg font-semibold" style={{ color: colors.dark }}>
          {title}
        </Text>
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
