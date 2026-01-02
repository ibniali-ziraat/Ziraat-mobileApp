import { Eye } from "lucide-react-native";
import { View } from "react-native";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  distance: number;
};

export default function VisibilityCard({ distance }: Props) {

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
        <CsText style={typography.Poppins_m_medium} className="ml-2 text-dark">
          VISIBILITY
        </CsText>
      </View>

      <CsText style={typography.Poppins_l_medium} className=" text-dark">
        {km} km
      </CsText>

      <CsText style={typography.Poppins_xs_regular} className="mt-1 text-dark">
        {getNote(distance)}
      </CsText>
    </ZiraatCard>
  );
}
