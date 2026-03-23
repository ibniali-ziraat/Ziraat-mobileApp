import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";

const OrchardsContent = () => (
  <View className="flex-row items-center justify-between h-16">
    <View>
      <Text
        style={[typography.Poppins_m_semibold, { color: colors.dark }]}
        className="text-lg"
      >
        My Orchards
      </Text>
      <Text
        style={[typography.Poppins_xs_regular, { color: colors.dark }]}
        className="text-neutral"
      >
        Manage and view your orchards
      </Text>
    </View>
  </View>
);

export default OrchardsContent;
