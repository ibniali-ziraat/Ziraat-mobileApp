import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function BasicInformation({ orchard }: any) {
  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3 ">
          Basic Information
        </Text>

        <DetailRow label="Orchard Name" value={orchard.name} />
        <DetailRow label="Size" value={orchard.acres} />
        <DetailRow label="Establishment Year" value={orchard.trees} />
        <DetailRow label="Plantation Pattern" value={orchard.fruit} />
        <DetailRow label="Ownership Type" value={orchard.about} />
      </View>
    </ZiraatCard>
  );
}
