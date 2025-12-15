import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface HomeHeaderProps {
  title?: string;
}

const HomeHeader = ({ title = "Naik Ummar Mukhtar" }: HomeHeaderProps) => {
  return (
    <View
      className="w-full bg-white flex-row items-center justify-between pt-4"
      style={{ borderBottomColor: colors.neutral }}
    >
      {/* LEFT: Greeting */}
      <View className="flex-row items-center">
        <View>
          <Text className="text-md" style={{ color: colors.dark }}>
            Welcome
          </Text>
          <Text
            className="text-lg font-semibold"
            style={{ color: colors.dark }}
          >
            {title}
          </Text>
        </View>
      </View>

      {/* RIGHT: Actions */}
      <View className="flex-row items-center">
        {/* Become Supplier */}
        {/* <TouchableOpacity
          onPress={() => router.push("/auth/vendor")}
          className="mr-4"
        >
          <Text
            className="text-sm font-medium"
            style={{ color: colors.primary }}
          >
            Become a Supplier
          </Text>
        </TouchableOpacity> */}

        {/* Notifications */}
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          className="p-2 mr-3 rounded-full border"
          style={{ borderColor: colors.neutral }}
        >
          <Bell size={24} color={colors.secondary} />
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity
          onPress={() => router.push(ROUTES.USER.PROFILE)}
          className="p-1"
        >
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
