import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "./DetailRow";

interface OrchardDetailsProps {
  orchard: any;
}

export default function OrchardDetails({ orchard }: OrchardDetailsProps) {
  return (
    <View className="p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <CsText style={typography.Poppins_m_semibold}>{orchard.name}</CsText>

        <View className="bg-secondary px-3 py-1 rounded-full">
          <CsText className="text-light" style={typography.caption_xs_semibold}>
            {orchard.about}
          </CsText>
        </View>
      </View>

      {/* Details */}
      <DetailRow label="Size" value={orchard.acres} />
      <DetailRow label="Establishment Year" value={orchard.trees} />
      <DetailRow label="Plantation Pattern" value={orchard.fruit} />
      <DetailRow label="Ownership Type" value={orchard.about} />
    </View>
  );
}
