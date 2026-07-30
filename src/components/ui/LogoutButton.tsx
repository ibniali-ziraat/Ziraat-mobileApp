import {
  cardShadow,
  cardTokens,
  chartTokens,
} from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { LogOut } from "lucide-react-native";
import { Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";

export default function LogoutButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          marginTop: 6,
          paddingHorizontal: 14,
          paddingVertical: 13,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
          backgroundColor: pressed
            ? cardTokens.mutedSurface
            : cardTokens.surface,
        },
        cardShadow,
      ]}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 12,
          borderCurve: "continuous",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cardTokens.mutedSurface,
          marginRight: 12,
        }}
      >
        <LogOut size={17} color={chartTokens.negative} strokeWidth={1.9} />
      </View>

      <Text
        style={[
          typography.Poppins_s_medium,
          { color: chartTokens.negative, fontSize: 14 },
        ]}
      >
        Log out
      </Text>
    </Pressable>
  );
}
