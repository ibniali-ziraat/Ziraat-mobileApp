import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Cog, PhoneCall } from "lucide-react-native";
import { Linking, Text, View } from "react-native";
import IconButton from "./IconButton";

const MenuContent = () => (
  <View className="flex-row items-center justify-between py-4">
    <View>
      <Text style={[typography.Poppins_l_semibold, { color: colors.dark }]}>
        Menu
      </Text>
      <Text style={[typography.Poppins_s_regular, { color: colors.neutral }]}>
        Explore features and settings
      </Text>
    </View>


    <View className="flex-row items-center gap-3">
      <IconButton
        onPress={() => Linking.openURL("tel:+919876543210")}
      >
        <PhoneCall size={20} color={colors.primary} />
      </IconButton>

      <IconButton
        onPress={() =>
          router.push({ pathname: ROUTES.SETTINGS })
        }
      >
        <Cog size={20} color={colors.dark} />
      </IconButton>
    </View>
  </View>
);

export default MenuContent;
