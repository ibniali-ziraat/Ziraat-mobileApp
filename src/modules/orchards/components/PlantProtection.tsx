import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function PlantProtection({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText className="mb-3"style={[typography.heading_m_semibold]}>
          Plant Protection & Health
        </CsText>

        <DetailRow label="Disease History" value={data.disease_history?.join(", ")} />
        <DetailRow label="Pest History" value={data.pest_history?.join(", ")} />
        <DetailRow label="Crop Insurance" value={data.crop_insurance_coverage ? "Yes" : "No"} />
      </View>
    </ZiraatCard>
  );
}
