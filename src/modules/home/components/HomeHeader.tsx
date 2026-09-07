import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { orchardRoutes } from "@/src/modules/orchards/routes/orchardRoutes";
import { router } from "expo-router";
import { ChevronRight, ClipboardList } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import {
  getWeatherPresentation,
  type WeatherCodeSet,
} from "../utils/weatherPictogram";
import type { WeatherState } from "../utils/weatherUtils";
import { useActiveOrchardCompleteness } from "../hooks/useActiveOrchardCompleteness";

type HomeHeaderProps = {
  current: WeatherState | null;
};

export default function HomeHeader({ current }: HomeHeaderProps) {
  const { profileData, setOrchardProfileId } = useAuth();
  const { targetOrchard, missingSections, total } =
    useActiveOrchardCompleteness();

  const conditionCode = current?.condition ?? 0;
  const conditionSet: WeatherCodeSet = current?.conditionSet ?? "daily";
  const isDaylight = current?.isDaylight !== 0;
  const weather = getWeatherPresentation(
    conditionCode,
    conditionSet,
    isDaylight,
  );
  const WeatherIcon = weather.icon;

  const firstName = profileData?.fullName?.split(" ")[0];

  const cta = !targetOrchard
    ? {
        label: "Add your orchard to get started",
        onPress: () =>
          router.push({
            pathname: ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO,
            params: { mode: "create" },
          }),
      }
    : missingSections.length > 0
      ? {
          label: `${missingSections.length} of ${total} sections pending — Complete your profile`,
          onPress: () => {
            setOrchardProfileId(Number(targetOrchard.id));
            router.push(orchardRoutes[missingSections[0].routeKey]);
          },
        }
      : null;

  return (
    <View style={{ paddingTop: 4, paddingBottom: 8 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={[typography.Poppins_m_semibold, { color: colors.dark }]}>
          {firstName ? `Hi, ${firstName}` : "Welcome back"}
        </Text>

        <Pressable
          onPress={() => router.push(ROUTES.WEATHER.DETAILS)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.primary + "0D",
            borderRadius: 999,
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <WeatherIcon size={14} strokeWidth={1.8} color={colors.secondary} />
          <Text
            style={[
              typography.Poppins_xs_semibold,
              { color: colors.dark, marginLeft: 5 },
            ]}
          >
            {typeof current?.tempC === "number" ? current.tempC : "--"}°
          </Text>
        </Pressable>
      </View>

      {cta && (
        <Pressable
          onPress={cta.onPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 12,
            paddingHorizontal: 14,
          }}
        >
          <ClipboardList size={18} color={colors.light} />
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_s_medium,
              { color: colors.light, marginLeft: 10, flex: 1 },
            ]}
          >
            {cta.label}
          </Text>
          <ChevronRight size={18} color={colors.light} />
        </Pressable>
      )}
    </View>
  );
}
