import { GitGraph } from "lucide-react-native";
import { View } from "react-native";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  currentMax?: number;
  averageMax?: number; // e.g. seasonal average
};

export default function AveragesCard({
  currentMax = 0,
  averageMax = 10,
}: Props) {
  const diff = currentMax - averageMax;
  const status = diff > 0 ? "Above" : "Below";
  const diffColor = diff > 0 ? "#16a34a" : "#dc2626";

  return (
    <ZiraatCard width="48%"
      paddingHorizontal={1.4}
      paddingVertical={1.4}>
      <View className="flex justify-center">

        <View className="flex-row items-center mb-1">
          <GitGraph size={18} color="#c7611f" />
          <CsText
            className="ml-2 text-sm  tracking-wide uppercase"
            style={typography.Poppins_m_medium}
          >
            Averages
          </CsText>
        </View>



        <CsText style={typography.Poppins_l_medium} className="text-dark">
          {diff > 0 ? `+${diff}` : diff}°
        </CsText>

        <CsText style={typography.Poppins_xs_regular} className="mt-1 text-dark">
          {status} average daily high.
        </CsText>

        <CsText style={typography.Poppins_xs_regular} className=" text-dark mt-1">
          Today: {currentMax}° | Avg: {averageMax}°
        </CsText>
      </View>
    </ZiraatCard>
  );
}
