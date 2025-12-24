import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function BasicInformation({ orchard }: any) {
  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText style={[typography.heading_m_semibold]}>
          Basic Information
        </CsText>

        <DetailRow label="Orchard Name" value={orchard.name} />
        <DetailRow label="Size" value={orchard.acres} />
        <DetailRow label="Establishment Year" value={orchard.trees} />
        <DetailRow label="Plantation Pattern" value={orchard.fruit} />
        <DetailRow label="Ownership Type" value={orchard.about} />
      </View>
    </ZiraatCard>
  );
}
