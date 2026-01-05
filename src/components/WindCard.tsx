import { Wind } from "lucide-react-native";
import { View } from "react-native";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";
import WindCompass from "./WindCompass";

type Props = {
  speed: number;
  gusts: number;
  degree: number;
  direction: string;
};

export default function WindCard({ speed, gusts, degree, direction }: Props) {
  return (
    <ZiraatCard width="100%" paddingHorizontal={1} paddingVertical={1}>


      <View className="w-full flex-row justify-between">
        <View className="w-36">
          <View className="flex-row pb-5">
            <Wind size={18} color="#c7611f" />
            <CsText style={typography.Poppins_m_medium} className="ml-2 text-dark">
              WIND
            </CsText>
          </View>

          <View className="flex-col">
            <Row label="Wind" value={`2 kph `} />
            <Row label="Gusts" value={`8 kph `} />
            <Row label="Direction" value={`123 ESE `} />
          </View>
        </View>

        <View className="flex-col items-center">
          <View className="pb-2">
            <WindCompass speed={speed} degree={degree} />
          </View>

          <View>
            <CsText style={typography.Poppins_m_regular} className="text-sm font-semibold text-dark">
              {direction}
            </CsText>
          </View>
        </View>
      </View>
    </ZiraatCard>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between mb-2">
      <CsText style={typography.Poppins_s_regular} className="text-sm text-dark">{label} - </CsText>
      <CsText style={typography.Poppins_xs_regular} className="text-sm font-medium text-dark">{value}</CsText>
    </View>
  );
}
