import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";

/**
 * Title only. The call shortcut is gone and settings moved into the list, so
 * the header no longer competes with the cards below it.
 */
const MenuContent = () => (
  <View
    style={{
      paddingTop: 10,
      paddingBottom: 12,
      backgroundColor: cardTokens.surface,
    }}
  >
    <Text
      style={[
        typography.Poppins_l_semibold,
        { color: cardTokens.inkPrimary, fontSize: 20 },
      ]}
    >
      Menu
    </Text>
    <Text
      style={[
        typography.Poppins_xs_regular,
        { color: cardTokens.inkMuted, fontSize: 13.5, marginTop: 2 },
      ]}
    >
      Manage your account, farm and preferences
    </Text>
  </View>
);

export default MenuContent;
