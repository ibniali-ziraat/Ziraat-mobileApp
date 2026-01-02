import { Droplets } from "lucide-react-native";
import { View } from "react-native";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  value: number;
};

export default function HumidityCard({ value }: Props) {

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
      className="border border-light"
    >

      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Droplets size={18} color="#c7611f" />
          <CsText style={typography.Poppins_m_medium} className="ml-2 text-dark">
            HUMIDITY
          </CsText>
        </View>

        <CsText style={typography.Poppins_s_regular} className=" text-dark">
          {Math.round(value)}%
        </CsText>
      </View>


      <CsText style={typography.Poppins_xl_semibold} className=" text-dark">
        {Math.round(value)}%
      </CsText>


      <CsText style={typography.Poppins_xs_regular} className="mt-2 text-dark">
        {getNote(value)}
      </CsText>
    </ZiraatCard>
  );
}
