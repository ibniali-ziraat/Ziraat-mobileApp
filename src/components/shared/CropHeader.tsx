import { typography } from "@/src/constants/fonts/typography";
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
        <CsText style={[typography.Poppins_m_semibold]} className="text-dark">
          Crops
       </CsText>

        <CsText  style={[typography.Poppins_xs_regular]} className="text-dark">
          Manage Your Orchards & Fields
       </CsText>
      </View>

      {/* Actions */}
    </View>
  );
};

export default React.memo(CropsHeader);
