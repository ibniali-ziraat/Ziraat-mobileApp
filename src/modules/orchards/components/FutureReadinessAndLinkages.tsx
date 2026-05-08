import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";


export default function FutureReadinessAndLinkages({
  data,
}) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText className="mb-3" style={[typography.Poppins_m_semibold]}>
          Future Readiness & Linkages (Optional)
        </CsText>

        <DetailRow
          label="Government Schemes Availed"
          value={
            data.government_schemes_availed?.length
              ? data.government_schemes_availed.join(", ")
              : "Not Availed"
          }
        />

        <DetailRow
          label="FPO / Cooperative Membership"
          value={data.fpo_or_cooperative_membership ?? "Not Associated"}
        />

        <DetailRow
          label="Certifications"
          value={
            data.certifications?.length
              ? data.certifications.join(", ")
              : "Not Certified"
          }
        />

        <DetailRow
          label="Digital Tools Used"
          value={
            data.digital_tools_used?.length
              ? data.digital_tools_used.join(", ")
              : "Not Used"
          }
        />
      </View>
    </ZiraatCard>
  );
}
