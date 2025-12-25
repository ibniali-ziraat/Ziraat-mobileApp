import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function FarmInfrastructure({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText className="mb-3" style={[typography.heading_m_semibold]}>
          Farm Infrastructure
        </CsText>

        <DetailRow label="Equipment Owned" value={data.equipment_owned?.join(", ")} />
        <DetailRow label="Storage Facilities" value={data.storage_facilities?.join(", ")} />
        <DetailRow label="Permanent Labor" value={data.farm_labor?.permanent} />
        <DetailRow label="Seasonal Labor" value={data.farm_labor?.seasonal} />
      </View>
    </ZiraatCard>
  );
}
