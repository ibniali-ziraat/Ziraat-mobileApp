import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function GeoLocation({ orchard }: any) {
  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText className="mb-3" style={[typography.heading_m_semibold]}>
          Geo Location
        </CsText>

        <DetailRow label="Latitude" value={orchard.lat} />
        <DetailRow label="Longitude" value={orchard.long} />
      </View>
    </ZiraatCard>
  );
}
