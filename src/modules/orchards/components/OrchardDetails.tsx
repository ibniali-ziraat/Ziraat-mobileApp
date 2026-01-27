import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import DetailRow from "./DetailRow";

interface OrchardDetailsProps {
  orchard: any;
}

export default function OrchardDetails({ orchard }: OrchardDetailsProps) {
  return (
    <View className="p-5">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1 pr-3">
        <CsText
  style={[
    typography.Poppins_m_semibold,
    { color: colors.secondary }
  ]}
  numberOfLines={1}
>
  {orchard.orchardName}
</CsText>

          <CsText
            style={typography.caption_xs_semibold}
            className="mt-2"
            numberOfLines={1}
          >
            Orchard Details
          </CsText>
        </View>

        <View
        style={{backgroundColor:colors.secondary}}
         className=" px-3 py-1.5 rounded-full">
      
          <CsText
            className="text-light"
            style={typography.caption_xs_semibold}
            numberOfLines={1}
          >
            {orchard.ownershipType}
          </CsText>
        </View>
      </View>

      {/* Details */}
      <DetailRow
        label="Size"
        value={
          orchard?.kanals > 0
            ? `${orchard.kanals} kanals`
            : orchard?.marlas > 0
              ? `${orchard.marlas} marlas`
              : ""
        }
      />

      <DetailRow label="Establishment Year" value={orchard.establishmentYear} />

      <DetailRow label="Plantation Pattern" value={orchard.plantationPattern} />

      <DetailRow
        label="Ownership Type"
        value={orchard.ownershipType}
        isLast
      />
    </View>
  );
}

