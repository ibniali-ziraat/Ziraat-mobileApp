import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function CropAndNutrition({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText className="mb-3" style={[typography.heading_m_semibold]}>
          Crop & Nutrition Management
        </CsText>

        <DetailRow label="Fertilizer Practice" value={data.fertilizer_practices} />
        <DetailRow label="Fertigation Facility" value={data.fertigation_facility ? "Yes" : "No"} />
        <DetailRow label="Nutrition Plan Followed" value={data.nutrition_plan_followed ? "Yes" : "No"} />
        <DetailRow label="Mulching" value={data.mulching ? "Yes" : "No"} />
      </View>
    </ZiraatCard>
  );
}
