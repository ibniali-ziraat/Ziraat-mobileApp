import { Eye } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  distance: number; // raw value from API (meters)
};

export default function VisibilityCard({ distance }: Props) {
  // Convert meters to KM for readability
  const km = (distance / 1000).toFixed(0);

  const getNote = (d: number) => {
    if (d >= 10000) return "Perfectly clear view.";
    if (d >= 5000) return "Light haze present.";
    if (d >= 2000) return "Moderate fog/haze.";
    return "Very low visibility. Be careful!";
  };

  return (
    <ZiraatCard width="48%" paddingHorizontal={1.4} paddingVertical={1.4}>
      <View className="flex-row items-center mb-2">
        <Eye size={18} color="#c7611f" />
        <CsText className="ml-2 text-md font-semibold tracking-wide text-dark">
          VISIBILITY
        </CsText>
      </View>

      <CsText className="text-3xl font-bold text-dark">{km} km</CsText>

      <CsText className="mt-2 text-sm leading-5 text-dark">
        {getNote(distance)}
      </CsText>
    </ZiraatCard>
  );
}
