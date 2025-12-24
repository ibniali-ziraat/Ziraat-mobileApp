import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function InputCostDetails({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText className="mb-3" style={[typography.heading_m_semibold]}>
          Input Cost Details
        </CsText>

        <DetailRow label="Supplier Location" value={data.pesticide_supplier_location} />
        <DetailRow label="Payment Type" value={data.payment_type} />
        <DetailRow label="Credit Period" value={data.credit_period} />
      </View>
    </ZiraatCard>
  );
}
