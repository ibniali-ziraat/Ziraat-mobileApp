import IllustrationBackground from "@/src/components/shared/IllustrationBackground";
import { typography } from "@/src/constants/fonts/typography";
import { profileArt } from "@/src/constants/iconArt";
import { illustrations } from "@/src/constants/illustrations";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Pressable } from "@/src/components/shared/Pressable";

const AVATAR = 56;

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
          marginBottom: 18,
          borderRadius: 20,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <IllustrationBackground
        xml={illustrations.profileCover}
        style={{ height: 128, borderRadius: 20 }}
      >
        <LinearGradient
          colors={[
            "rgba(12,42,6,0)",
            "rgba(12,42,6,0.35)",
            "rgba(12,42,6,0.88)",
          ]}
          locations={[0, 0.4, 1]}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
            padding: 14,
          }}
        >
          <View
            style={{
              width: AVATAR,
              height: AVATAR,
              borderRadius: AVATAR / 2,
              borderWidth: 3,
              borderColor: "#FFFFFF",
              overflow: "hidden",
              backgroundColor: "#E8F5E9",
            }}
          >
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            ) : (
              <SvgXml xml={profileArt.avatar} width="100%" height="100%" />
            )}
          </View>

          <View style={{ flex: 1, marginLeft: 12, marginBottom: 4 }}>
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_s_semibold,
                { color: "#FFFFFF", fontSize: 17 },
              ]}
            >
              {name}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_xs_regular,
                { color: "rgba(255,255,255,0.82)", fontSize: 13.5, marginTop: 1 },
              ]}
            >
              {subtitle}
            </Text>
          </View>

          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginBottom: 6,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <ChevronRight size={18} color="#FFFFFF" />
          </View>
        </LinearGradient>
      </IllustrationBackground>
    </Pressable>
  );
}
