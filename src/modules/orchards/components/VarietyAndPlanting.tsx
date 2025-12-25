import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function VarietyAndPlanting({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText className="mb-3" style={[typography.Poppins_m_semibold]}>
          Variety & Planting Details
        </CsText>

        <DetailRow label="Varieties Planted" value={data.varieties_planted?.join(", ")} />
        <DetailRow label="Total Trees" value={data.number_of_trees?.total} />
        <DetailRow label="Plant Density" value={data.plant_density} />
        <DetailRow label="Rootstock Used" value={data.rootstock_used?.join(", ")} />
      </View>
    </ZiraatCard>
  );
}
