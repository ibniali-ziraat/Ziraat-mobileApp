import { Sunset } from "lucide-react-native";
import { Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../constants/colors";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";

type Props = {
  sunset: string;
  sunrise: string;
};

export default function SunsetCard({ sunset, sunrise }: Props) {
  const formatTimeManual = (timeStr?: string) => {
    if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":"))
      return "--:--";

    try {
      const timePart = timeStr.split(" ")[1] || timeStr;
      let [hours, minutes] = timePart.split(":").map(Number);

      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${displayHours}:${displayMinutes} ${ampm}`;
    } catch {
      return "--:--";
    }
  };

  const parseSafeDate = (dateStr: string) => {
    if (!dateStr) return null;

    const isoStr = dateStr.replace(" ", "T");
    const d = new Date(isoStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const calculatePosition = () => {
    const sunDate = parseSafeDate(sunrise);
    const setDate = parseSafeDate(sunset);

    if (!sunDate || !setDate) return { x: 80, y: 16 };

    const now = new Date().getTime();
    const start = sunDate.getTime();
    const end = setDate.getTime();

    let progress = (now - start) / (end - start);
    progress = Math.min(Math.max(progress, 0), 1);

    const x = 10 + progress * 140;
    const t = progress;

    const y =
      Math.pow(1 - t, 2) * 36 +
      2 * (1 - t) * t * 16 +
      Math.pow(t, 2) * 36;

    return { x, y };
  };

  const { x, y } = calculatePosition();

  return (
    <View
      style={[
        {
          width: "100%",
          marginVertical: 8,
          paddingHorizontal: 14,
          paddingVertical: 14,
          backgroundColor: cardTokens.surface,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          height: 160,
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: cardTokens.border,
        },
        cardShadow,
      ]}
    >
      {/* Header (Sunrise) */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Sunset size={18} color={colors.secondary} />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: cardTokens.inkPrimary }]}
        >
          SUNRISE: {formatTimeManual(sunrise)}
        </Text>
      </View>

      {/* Curve + Sun */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Svg
          width={160}
          height={50}
          viewBox="0 0 160 48"
          style={{ overflow: "visible" }}
        >
          <Path
            d="M10 36 Q80 16 150 36"
            stroke={colors.secondary}
            strokeWidth={3}
            fill="none"
          />

          {!isNaN(x) && !isNaN(y) && (
            <Circle cx={x} cy={y} r="5" fill={colors.secondary} />
          )}
        </Svg>
      </View>

      {/* Sunset */}
      <Text
        style={[typography.Poppins_s_medium, { color: cardTokens.inkSecondary }]}
      >
        Sunset: {formatTimeManual(sunset)}
      </Text>
    </View>
  );
}