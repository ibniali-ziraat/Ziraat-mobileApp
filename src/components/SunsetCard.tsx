import { Sunset } from "lucide-react-native";
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  sunset: string;
  sunrise: string;
};

export default function SunsetCard({ sunset, sunrise }: Props) {
  return (
    <ZiraatCard
      width="48%"
      paddingHorizontal={1.4}
      paddingVertical={1.4}
      className="border border-white"
    >
      <View className="flex-row items-center">
        <Sunset size={18} color="#c7611f" />
        <CsText className="ml-2 text-sm font-semibold tracking-wide text-dark">
          SUNRISE :6:09AM
       </CsText>
      </View>


      <CsText className="mt-1 text-2xl font-bold text-dark">
        {sunset}
     </CsText>


      <Svg width={160} height={48}>

        <Path
          d="M10 36 Q80 16 150 36"
          stroke="#c7611f"
          strokeWidth={3}
          fill="none"
        />

        <Circle
          cx="100"
          cy="20"
          r="4.5"
          fill="#c7611f"
        />
      </Svg>

      {/* SUNRISE LABEL */}
      <CsText className="text-xs text-dark">
        Sunset: 7:44 PM {sunrise}
     </CsText>
    </ZiraatCard>
  );
}
