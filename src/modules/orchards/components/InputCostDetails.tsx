import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function InputCostDetails({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3">
          Input Cost Details
        </Text>

        <DetailRow label="Supplier Location" value={data.pesticide_supplier_location} />
        <DetailRow label="Payment Type" value={data.payment_type} />
        <DetailRow label="Credit Period" value={data.credit_period} />
      </View>
    </ZiraatCard>
  );
}
