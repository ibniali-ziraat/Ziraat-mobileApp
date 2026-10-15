import IllustrationBackground from "@/src/components/shared/IllustrationBackground";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import {
  exploreArt,
  menuArt,
  statIcons,
  weatherIcons,
} from "@/src/constants/iconArt";
import { illustrations } from "@/src/constants/illustrations";
import { ROUTES } from "@/src/constants/routes";
import { ModeButton } from "@/src/modules/auth/components/ModeButton";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

type Props = {
  children: React.ReactNode;
  mode: "login" | "register";
};

const HERO_HEIGHT = 220;

// What the app does, shown as pictures before anyone has to read a form.
const FEATURES = [
  { label: "My orchards", art: statIcons.orchard, tint: "#EAF5E4" },
  { label: "Weather", art: weatherIcons.cloudSun, tint: "#E6F3FC" },
  { label: "Expert advice", art: menuArt.discussion, tint: "#FFF4E5" },
  { label: "Shop", art: exploreArt.shop, tint: "#FCE8F0" },
];
// The logo is a wide wordmark, so it sits on a rounded card, not a disc.
const LOGO_WIDTH = 168;
const LOGO_HEIGHT = 112;

/**
 * Shared by login and signup: a farm scene runs edge to edge across the top
 * (under the status bar), with the logo on a white card overlapping its foot.
 */
export default function AuthWrapper({ children, mode }: Props) {
  return (
    <ScreenLayout topPadding={0}>
      <View style={{ backgroundColor: colors.light, paddingBottom: 20 }}>
        <IllustrationBackground
          xml={illustrations.farm}
          style={{
            height: HERO_HEIGHT,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        />

        <View
          style={{
            alignSelf: "center",
            width: LOGO_WIDTH,
            height: LOGO_HEIGHT,
            borderRadius: 26,
            marginTop: -LOGO_HEIGHT / 2,
            marginBottom: 6,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.light,
          }}
        >
          <Image
            source={require("@/assets/images/logo.jpeg")}
            style={{
              width: LOGO_WIDTH - 24,
              height: LOGO_HEIGHT - 16,
              resizeMode: "contain",
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 10,
            marginBottom: 18,
          }}
        >
          {FEATURES.map((feature) => (
            <View
              key={feature.label}
              style={{ width: "23%", alignItems: "center" }}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 18,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: feature.tint,
                }}
              >
                <SvgXml xml={feature.art} width={30} height={30} />
              </View>
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_medium,
                  {
                    color: cardTokens.inkSecondary,
                    fontSize: 13,
                    marginTop: 6,
                  },
                ]}
              >
                {feature.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Form on its own card, so it reads as the one thing to do here. */}
        <View
          style={[
            {
              marginHorizontal: 16,
              marginBottom: 16,
              paddingTop: 20,
              paddingBottom: 6,
              borderRadius: 24,
              backgroundColor: cardTokens.surface,
            },
          ]}
        >
          {children}
        </View>

        <ModeButton
          title={
            mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"
          }
          onPress={() =>
            mode === "login"
              ? router.replace(ROUTES.AUTH.SIGNUP)
              : router.replace(ROUTES.AUTH.LOGIN)
          }
        />
      </View>
    </ScreenLayout>
  );
}
