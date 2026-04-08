import { Moon } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts/typography";
import { shadows } from "../constants/shadows";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 6,
    }}
  >
    <Text style={[typography.Poppins_s_regular, { color: "#666" }]}>
      {label}
    </Text>
    <Text style={[typography.Poppins_s_regular, { color: "#000" }]}>
      {value}
    </Text>
  </View>
);

const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: "rgba(0,0,0,0.08)",
      marginVertical: 2,
    }}
  />
);

type Props = {
  phaseValue?: number;
  illumination?: number;
  moonrise?: string;
};

export function MoonCard({ phaseValue, illumination, moonrise }: Props) {
  const getPhaseName = (deg?: number) => {
    if (deg === undefined || deg === null) return "Waxing Crescent";
    if (deg >= 337.5 || deg < 22.5) return "New Moon";
    if (deg < 67.5) return "Waxing Crescent";
    if (deg < 112.5) return "First Quarter";
    if (deg < 157.5) return "Waxing Gibbous";
    if (deg < 202.5) return "Full Moon";
    if (deg < 247.5) return "Waning Gibbous";
    if (deg < 292.5) return "Last Quarter";
    if (deg < 337.5) return "Waning Crescent";
    return "Moon Phase";
  };

  const formatTimeManual = (timeStr?: string) => {
    if (!timeStr) return "--:--";
    try {
      const timePart = timeStr.includes(" ")
        ? timeStr.split(" ")[1]
        : timeStr;

      let [h, m] = timePart.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      const displayHours = h % 12 || 12;

      return `${displayHours}:${m < 10 ? "0" + m : m} ${ampm}`;
    } catch {
      return "--:--";
    }
  };

  const displayIllumination =
    illumination ??
    (phaseValue !== undefined
      ? Math.round((1 - Math.cos((phaseValue * Math.PI) / 180)) * 50)
      : 0);

  return (
    <View
      style={[
        {
          width: "100%",
          marginVertical: 8,
          paddingHorizontal: 14,
          paddingVertical: 14,
          backgroundColor: "#fff",
          borderRadius: 16,
          height: 180, 
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.05)",
        },
        shadows.profile_card, 
      ]}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Moon size={18} color={colors.secondary} />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: "#000" }]}
        >
          {getPhaseName(phaseValue)}
        </Text>
      </View>

      {/* Content */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        {/* Left Info */}
        <View style={{ flex: 1, paddingRight: 10 }}>
          <InfoRow
            label="Illumination"
            value={`${displayIllumination}%`}
          />
          <Divider />
          <InfoRow
            label="Next Moonrise"
            value={formatTimeManual(moonrise)}
          />
          <Divider />
          <InfoRow
            label="Next Full Moon"
            value={
              phaseValue !== undefined
                ? `${Math.round(
                    ((180 - phaseValue + 360) % 360) / 12.2
                  )} days`
                : "17 days"
            }
          />
        </View>

        {/* Moon Image */}
        <View style={{ width: 90, height: 90 }}>
          <Image
            source={require("../../assets/images/moon.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}