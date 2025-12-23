import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function ProductionAndMarketing({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3">
          Production & Marketing
        </Text>

        <DetailRow
          label="Average Yield"
          value={`${data.average_annual_yield?.quantity} ${data.average_annual_yield?.unit}`}
        />
        <DetailRow
          label="Harvest Season"
          value={`${data.peak_harvest_season?.start_month} - ${data.peak_harvest_season?.end_month}`}
        />
        <DetailRow label="Selling Preference" value={data.selling_preference?.join(", ")} />
      </View>
    </ZiraatCard>
  );
}
