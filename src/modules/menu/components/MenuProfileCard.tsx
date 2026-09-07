import { cardShadow, cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";

export default function MenuProfileCard() {
  const { userId } = useAuth();
  const { data } = useProfileQuery(userId);

  const name = data?.fullName ?? "Your profile";
  const subtitle = data?.phone ?? data?.email ?? "View and edit details";
  const avatar = data?.profilePic;

  return (
    <Pressable
      onPress={() => router.push(ROUTES.ACCOUNT.PROFILE)}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          padding: 14,
          marginBottom: 18,
          borderRadius: 20,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
          backgroundColor: cardTokens.surface,
          opacity: pressed ? 0.92 : 1,
        },
        cardShadow,
      ]}
    >
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: chartTokens.current,
          }}
        >
          <Text
            style={[
              typography.Poppins_m_semibold,
              { color: cardTokens.surface, fontSize: 19 },
            ]}
          >
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary, fontSize: 15 },
          ]}
        >
          {name}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, fontSize: 11, marginTop: 2 },
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <ChevronRight size={20} color={cardTokens.inkMuted} />
    </Pressable>
  );
}
