import { Moon } from "lucide-react-native";
import { Image, View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-2">
    <CsText className="text-sm text-neutral-400">{label}</CsText>
    <CsText className="text-sm text-neutral-300 font-medium">{value}</CsText>
  </View>
);

const Divider = () => <View className="h-[1px] bg-neutral-800 opacity-20" />;

type Props = {
  phaseValue?: number;
  illumination?: number;
  moonrise?: string;
};

export function MoonCard({ phaseValue, illumination, moonrise }: Props) {
  // 1. Helper: Calculate Phase Name
  const getPhaseName = (deg?: number) => {
    if (deg === undefined || deg === null) return "Waxing Crescent"; // Sensible default
    if (deg >= 337.5 || deg < 22.5) return "New Moon";
    if (deg >= 22.5 && deg < 67.5) return "Waxing Crescent";
    if (deg >= 67.5 && deg < 112.5) return "First Quarter";
    if (deg >= 112.5 && deg < 157.5) return "Waxing Gibbous";
    if (deg >= 157.5 && deg < 202.5) return "Full Moon";
    if (deg >= 202.5 && deg < 247.5) return "Waning Gibbous";
    if (deg >= 247.5 && deg < 292.5) return "Last Quarter";
    if (deg >= 292.5 && deg < 337.5) return "Waning Crescent";
    return "Moon Phase";
  };

  // 2. Helper: Handle time strings with OR without dates (e.g., "11:04" or "2025-12-25 11:04")
  const formatTimeManual = (timeStr?: string) => {
    if (!timeStr) return "--:--";
    try {
      // If it contains a space, take the second part. If not, take the whole thing.
      const timePart = timeStr.includes(" ") ? timeStr.split(" ")[1] : timeStr;
      let [h, m] = timePart.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      const displayHours = h % 12 || 12;
      return `${displayHours}:${m < 10 ? "0" + m : m} ${ampm}`;
    } catch (e) {
      return "--:--";
    }
  };

  // 3. Helper: Fallback Illumination calculation
  // If API illumination is missing, we calculate it: 100% at 180 deg, 0% at 0/360 deg
  const displayIllumination =
    illumination ??
    (phaseValue !== undefined
      ? Math.round((1 - Math.cos((phaseValue * Math.PI) / 180)) * 50)
      : 0);

  return (
    <ZiraatCard
      width="100%"
      paddingHorizontal={1.4}
      paddingVertical={1.4}
      marginBottom={1}
    >
      <View className="flex-row items-center">
        <Moon size={18} color="#c7611f" />
        <CsText className="ml-2 text-sm font-bold tracking-wide text-neutral-500 uppercase">
          {getPhaseName(phaseValue)}
        </CsText>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-1 pr-3">
          <InfoRow label="Illumination" value={`${displayIllumination}%`} />
          <Divider />
          <InfoRow label="Next Moonrise" value={formatTimeManual(moonrise)} />
          <Divider />
          <InfoRow
            label="Next Full Moon"
            value={
              phaseValue !== undefined
                ? `${Math.round(((180 - phaseValue + 360) % 360) / 12.2)} days`
                : "17 days"
            }
          />
        </View>

        <View className="w-24 h-24">
          <Image
            source={require("../../assets/images/moon.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </View>
    </ZiraatCard>
  );
}
