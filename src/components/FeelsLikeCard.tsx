import { Thermometer } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  temp: number; // feels like
  actualTemp?: number;
};

export default function FeelsLikeCard({ temp, actualTemp }: Props) {
  const diff = actualTemp !== undefined ? temp - actualTemp : 0;

  const getMessage = () => {
    if (diff >= 3) return "Feels hotter due to humidity.";
    if (diff <= -3) return "Feels colder because of wind.";
    return "Similar to the actual temperature.";
  };

  return (
    <ZiraatCard
      width="48%"
      marginVertical={1}
      paddingHorizontal={1}
      paddingVertical={1}
    >
      <View className="flex-row items-center mb-2">
        <Thermometer size={18} color="#c7611f" />
        <CsText className="ml-2 text-sm font-semibold tracking-wide text-dark">
          Feels Like
        </CsText>
      </View>

      <CsText className="mt-1 text-3xl font-bold text-dark">{temp}°</CsText>

      <CsText className="mt-1 text-sm text-dark">{getMessage()}</CsText>
    </ZiraatCard>
  );
}
