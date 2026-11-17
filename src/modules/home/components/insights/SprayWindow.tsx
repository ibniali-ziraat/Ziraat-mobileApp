import { Pressable } from "@/src/components/shared/Pressable";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { advisoryKindArt } from "@/src/constants/iconArt";
import { ROUTES } from "@/src/constants/routes";
import { useHomeWeather } from "@/src/modules/home/hooks/useHomeWeather";
import { getWeatherPresentation } from "@/src/modules/home/utils/weatherPictogram";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

/** Look this far ahead for rain — sprays need a few dry hours to set. */
const RAIN_WINDOW_HOURS = 6;

type Verdict = "good" | "caution" | "avoid";

const VERDICT = {
  good: { label: "Good time to spray", tint: "#EAF5E4", ink: "#2D6B06" },
  caution: { label: "Spray with care", tint: "#FFF4E5", ink: "#B26100" },
  avoid: { label: "Avoid spraying now", tint: "#FDECEC", ink: "#C0392B" },
} as const;

/**
 * Today's spray conditions from the live forecast: wind (drift), rain in
 * the next few hours (wash-off) and heat (evaporation). Common orchard
 * guidance, not a prescription — the advisories carry the actual advice.
 */
export default function SprayWindow() {
  const { currentWeather, hourly, source } = useHomeWeather();
  // A verdict needs the farm's own weather — not the Srinagar fallback.
  if (!currentWeather || source === "default") return null;

  const isDaylight = currentWeather.isDaylight !== 0;
  const effect = getWeatherPresentation(
    currentWeather.condition ?? 0,
    currentWeather.conditionSet ?? "daily",
    isDaylight,
  ).effect;

  const wind = Math.round(currentWeather.windKph ?? 0);
  const temp = Math.round(currentWeather.tempC ?? 0);
  const rainChances = hourly
    .slice(0, RAIN_WINDOW_HOURS)
    .map((hour) => hour.rainChance)
    .filter((chance): chance is number => typeof chance === "number");
  const rain = rainChances.length ? Math.max(...rainChances) : null;
  const wet = effect === "rain" || effect === "storm" || effect === "snow";

  const reasons: { verdict: Verdict; text: string }[] = [];
  if (wet) reasons.push({ verdict: "avoid", text: "It's raining now" });
  if (rain != null && rain >= 60)
    reasons.push({ verdict: "avoid", text: `${rain}% chance of rain soon` });
  else if (rain != null && rain >= 30)
    reasons.push({ verdict: "caution", text: `${rain}% chance of rain soon` });
  if (wind > 20)
    reasons.push({ verdict: "avoid", text: "Too windy — spray will drift" });
  else if (wind > 12)
    reasons.push({ verdict: "caution", text: "Breezy — watch for drift" });
  if (temp >= 32)
    reasons.push({ verdict: "caution", text: "Hot — spray early or late" });

  const verdict: Verdict = reasons.some((r) => r.verdict === "avoid")
    ? "avoid"
    : reasons.length
      ? "caution"
      : "good";
  const style = VERDICT[verdict];
  const reason =
    reasons.find((r) => r.verdict === verdict)?.text ??
    "Calm, dry and mild — conditions look right";

  const facts = [
    { label: "Wind", value: `${wind} km/h` },
    {
      label: `Rain · ${RAIN_WINDOW_HOURS}h`,
      value: rain != null ? `${rain}%` : "—",
    },
    { label: "Temp", value: `${temp}°` },
  ];

  return (
    <Pressable
      onPress={() => router.push(ROUTES.WEATHER.DETAILS as any)}
      accessibilityRole="button"
      accessibilityLabel={`${style.label}. ${reason}. Open forecast`}
      style={({ pressed }) => ({
        marginTop: 14,
        padding: 14,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: pressed ? cardTokens.mutedSurface : cardTokens.surface,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 13,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: style.tint,
          }}
        >
          <SvgXml xml={advisoryKindArt.spray.art} width={26} height={26} />
        </View>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted },
            ]}
          >
            Spray conditions today
          </Text>
          <Text
            numberOfLines={1}
            style={[typography.Poppins_s_semibold, { color: style.ink }]}
          >
            {style.label}
          </Text>
        </View>
        <ChevronRight size={16} color={cardTokens.inkMuted} />
      </View>

      <Text
        style={[
          typography.Poppins_xs_regular,
          { color: cardTokens.inkSecondary, marginTop: 8 },
        ]}
      >
        {reason}
      </Text>

      <View
        style={{
          flexDirection: "row",
          marginTop: 12,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: colors.cardBorder,
        }}
      >
        {facts.map((fact) => (
          <View key={fact.label} style={{ flex: 1 }}>
            <Text
              style={[
                typography.Poppins_s_semibold,
                { color: cardTokens.inkPrimary },
              ]}
            >
              {fact.value}
            </Text>
            <Text
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkMuted, fontSize: 11 },
              ]}
            >
              {fact.label}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
