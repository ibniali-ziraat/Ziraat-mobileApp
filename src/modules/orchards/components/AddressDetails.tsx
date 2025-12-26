import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "../components/DetailRow";

export default function AddressDetails({ orchard }: any) {
  const [district, tehsil] = orchard.location?.split(",") || [];

  return (
    <ZiraatCard width="100%" marginBottom={2}>
      <View className="p-4">
        <CsText className="mb-3" style={[typography.Poppins_m_semibold]}>
          Address Details
        </CsText>

        <DetailRow label="District" value={district?.trim()} />
        <DetailRow label="Tehsil" value={tehsil?.trim()} />
        <DetailRow label="Zone" value={orchard.season} />
        <DetailRow label="PIN Code" value={orchard.irrigation} />
      </View>
    </ZiraatCard>
  );
}
