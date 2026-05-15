import { View } from "react-native";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import CsText from "./CsText";

const OrchardsHeader = () => {
  return (
    <View className="flex-row items-center justify-between h-16 bg-light px-4">
      <View>
        <CsText
          style={[typography.Poppins_m_semibold, { color: colors.dark }]}
          className="text-lg"
        >
          My Orchards
        </CsText>

        <CsText
          style={[typography.Poppins_xs_regular, { color: colors.dark }]}
          className="text-neutral"
        >
          Manage and view your orchards
        </CsText>
      </View>
    </View>
  );
};

export default OrchardsHeader;
