import { colors } from "@/src/constants/colors";
import React from "react";
import { Text, View } from "react-native";

interface CropsHeaderProps {
  role?: "farmer" | "supplier"; // optional role prop
}

const CropsHeader = ({ role = "farmer" }: CropsHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between h-16 bg-white">
      {/* Title & Subtitle */}
      <View>
        <Text className="text-lg font-bold" style={{ color: colors.dark }}>
          Crops
        </Text>

        <Text className="text-sm" style={{ color: colors.neutral }}>
          Manage Your Orchards & Fields
        </Text>
      </View>

      {/* Actions */}
    </View>
  );
};

export default React.memo(CropsHeader);
