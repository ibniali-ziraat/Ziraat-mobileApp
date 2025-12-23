import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function SoilAndWater({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3">
          Soil & Water Profile
        </Text>

        <DetailRow label="Soil Type" value={data.soil_type} />
        <DetailRow label="Soil Health" value={data.soil_health_status} />
        <DetailRow label="Water Source" value={data.water_source?.join(", ")} />
        <DetailRow label="Irrigation Method" value={data.irrigation_method} />
        <DetailRow label="Water Availability" value={data.water_availability} />
      </View>
    </ZiraatCard>
  );
}
