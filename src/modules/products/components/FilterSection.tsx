import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

export const FilterSection = ({ title, children }) => (
  <View className="mb-6">
    <CsText style={typography.Poppins_s_semibold} className="mb-3">
      {title}
    </CsText>
    <View className="flex-row flex-wrap gap-2">{children}</View>
  </View>
);
