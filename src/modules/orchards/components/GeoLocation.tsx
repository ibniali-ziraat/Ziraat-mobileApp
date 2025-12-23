import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function GeoLocation({ orchard }: any) {
  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3">
          Geo Location
        </Text>

        <DetailRow label="Latitude" value={orchard.lat} />
        <DetailRow label="Longitude" value={orchard.long} />
      </View>
    </ZiraatCard>
  );
}
