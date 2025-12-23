import { colors } from "@/src/constants/colors";
import React from "react";
import { View } from "react-native";
import CsText from "./CsText";

interface CropsHeaderProps {
  role?: "farmer" | "supplier"; // optional role prop
}

const CropsHeader = ({ role = "farmer" }: CropsHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between h-16 bg-white">
      {/* Title & Subtitle */}
      <View>
        <CsText className="text-lg font-bold" style={{ color: colors.dark }}>
          Crops
       </CsText>

        <CsText className="text-sm" style={{ color: colors.neutral }}>
          Manage Your Orchards & Fields
       </CsText>
      </View>

      {/* Actions */}
    </View>
  );
};

export default React.memo(CropsHeader);
