
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
    <View className="px-5 py-6">
      
      {/* ================= HERO ================= */}
      <View className="mb-8">
        {/* Accent Line */}
        <View
          style={{ backgroundColor: colors.secondary }}
          className="w-14 h-1 rounded-full mb-3"
        />

        <CsText
          style={[
            typography.Poppins_m_semibold,
            { fontSize: 22, color: colors.dark }
          ]}
          numberOfLines={2}
        >
          {orchard.orchardName}
        </CsText>

        <View className="flex-row items-center mt-3">
          <CsText
            style={[
              typography.caption_xs_semibold,
              { color: colors.gray }
            ]}
          >
            Orchard Details
          </CsText>

          <View className="mx-2 w-1 h-1 rounded-full" />

          <CsText
            style={[
              typography.caption_xs_semibold,
              { color: colors.secondary }
            ]}
          >
            {orchard.ownershipType}
          </CsText>
        </View>
      </View>

      {/* ================= INFO ================= */}
      <View
        className="rounded-2xl "
        style={{
          backgroundColor: colors.light,
        }}
      >
        <DetailRow
          label="Size"
          value={
            orchard?.kanals > 0
              ? `${orchard.kanals} kanals`
              : orchard?.marlas > 0
              ? `${orchard.marlas} marlas`
              : "-"
          }
        />

        <DetailRow
          label="Established"
          value={orchard.establishmentYear || "-"}
        />

        <DetailRow
          label="Plantation"
          value={orchard.plantationPattern || "-"}
        />

        <DetailRow
          label="Ownership"
          value={orchard.ownershipType}
          isLast
        />
      </View>
    </View>
  );
}
