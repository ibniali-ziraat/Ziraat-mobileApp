import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { LogOut } from "lucide-react-native";
import { Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";

export default function LogoutButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: cardTokens.hairline,
        backgroundColor: cardTokens.surface,
      }}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cardTokens.surface,
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
        Log out of your account
      </Text>
    </Pressable>
  );
}
