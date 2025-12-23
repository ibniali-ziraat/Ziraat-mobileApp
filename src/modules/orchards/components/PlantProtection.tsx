import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function PlantProtection({ data }: any) {
  if (!data) return null;

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3">
          Plant Protection & Health
        </Text>

        <DetailRow label="Disease History" value={data.disease_history?.join(", ")} />
        <DetailRow label="Pest History" value={data.pest_history?.join(", ")} />
        <DetailRow label="Crop Insurance" value={data.crop_insurance_coverage ? "Yes" : "No"} />
      </View>
    </ZiraatCard>
  );
}
