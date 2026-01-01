import { Droplets } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  amount?: number;
  probability?: number;
};

export function Precipitation({ amount = 0, probability = 0 }: Props) {
  return (
    <ZiraatCard width="48%" paddingHorizontal={1.4} paddingVertical={1.4}>
      <View className="flex-row items-center mb-1">
        <Droplets size={18} color="#c7611f" />
        <CsText className="ml-2 text-sm font-bold tracking-wide text-dark uppercase">
          Precipitation
        </CsText>
      </View>

      <CsText className="text-3xl font-bold text-dark">{amount} mm</CsText>

      <CsText className="text-[11px] text-dark pt-2">
        {amount > 0 ? "Rain recorded today." : "No rain in 24h."}
      </CsText>

      <CsText className="text-[10px] text-dark mt-1">
        {probability}% chance today.
      </CsText>
    </ZiraatCard>
  );
}
