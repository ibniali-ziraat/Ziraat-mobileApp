import { Droplets } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  value: number;
};

export default function HumidityCard({ value }: Props) {
  // Logic to determine the note based on the pressure/humidity value
  const getNote = (val: number) => {
    if (val >= 70) return "The air is quite humid and heavy right now.";
    if (val <= 30) return "The air is very dry and crisp.";
    return "The humidity level is currently comfortable.";
  };

  return (
    <ZiraatCard
      width="48%"
      paddingHorizontal={1.4}
      paddingVertical={1.7}
      className="border border-white"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Droplets size={18} color="#c7611f" />
          <CsText className="ml-2 text-md font-semibold tracking-wide text-dark">
            HUMIDITY
          </CsText>
        </View>

        {/* Dynamic small value in corner */}
        <CsText className="text-[12px] font-bold text-dark">
          {Math.round(value)}%
        </CsText>
      </View>

      {/* Main Large Display */}
      <CsText className="text-3xl font-bold text-dark">
        {Math.round(value)}%
      </CsText>

      {/* Dynamic User-Friendly Note */}
      <CsText className="mt-2 text-sm leading-5 text-neutral-600">
        {getNote(value)}
      </CsText>
    </ZiraatCard>
  );
}
