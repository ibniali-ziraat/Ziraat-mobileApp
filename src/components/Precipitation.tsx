import { Droplets } from "lucide-react-native";
import { View } from "react-native";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  amount?: number;
  probability?: number;
};

export function Precipitation({ amount = 0, probability = 0 }: Props) {
  return (
    <ZiraatCard width="48%"
      paddingHorizontal={1.4}
      paddingVertical={1.4}>
      <View className="flex-row items-center mb-1">
        <Droplets size={18} color="#c7611f" />
        <CsText style={typography.Poppins_m_medium} className="ml-2 text-dark">
          Precipitation
        </CsText>
      </View>

      <CsText style={typography.Poppins_l_medium} className="text-dark">
        {amount} mm
      </CsText>

      <CsText style={typography.Poppins_xs_medium} className="text-dark mt-1">
        {amount > 0 ? "Rain recorded today." : "No rain in 24h."}
      </CsText>

      <CsText style={typography.Poppins_xs_medium} className="text-[10px] text-dark mt-1">
        {probability}% chance today.
      </CsText>
    </ZiraatCard>
  );
}
