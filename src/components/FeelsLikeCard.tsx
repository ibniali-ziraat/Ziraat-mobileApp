import { Thermometer } from "lucide-react-native";
import { View } from "react-native";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  temp: number;
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
        <CsText style={typography.Poppins_m_medium} className="ml-2 text-dark">
          Feels Like
        </CsText>
      </View>

      <CsText style={typography.Poppins_l_medium} className="mt-1 text-dark">{temp}°</CsText>

      <CsText style={typography.Poppins_xs_regular} className="mt-1 text-dark">{getMessage()}</CsText>
    </ZiraatCard>
  );
}
