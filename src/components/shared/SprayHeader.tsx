import { colors } from "@/src/constants/colors";
import { MoreVertical } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SprayHeader = () => {
  return (
    <View className="flex-row items-center justify-between h-16 w-full bg-light  px-1">
      
      {/* Left: Title & Description */}
      <View>
        <Text className="text-lg font-bold" style={{ color: colors.dark }}>
          Spray Records
        </Text>

        <Text className="text-sm" style={{ color: colors.neutral }}>
          Manage your spray activities
        </Text>
      </View>

      {/* Right: More Options */}
      <TouchableOpacity
        className="p-2 rounded-full border"
        style={{ borderColor: colors.neutral }}
        onPress={() => {
          // later you can open bottom sheet / menu
        }}
      >
        <MoreVertical size={20} color={colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SprayHeader);
