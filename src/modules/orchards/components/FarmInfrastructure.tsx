import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function FarmInfrastructure({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3">
          Farm Infrastructure
        </Text>

        <DetailRow label="Equipment Owned" value={data.equipment_owned?.join(", ")} />
        <DetailRow label="Storage Facilities" value={data.storage_facilities?.join(", ")} />
        <DetailRow label="Permanent Labor" value={data.farm_labor?.permanent} />
        <DetailRow label="Seasonal Labor" value={data.farm_labor?.seasonal} />
      </View>
    </ZiraatCard>
  );
}
