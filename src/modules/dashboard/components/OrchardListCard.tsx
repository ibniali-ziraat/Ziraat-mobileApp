import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { ChevronRight, MapPin } from "lucide-react-native";
import { Pressable, View } from "react-native";
import type { DashboardOrchardSummary } from "../types/dashboardHome";

type Props = {
  orchard: DashboardOrchardSummary;
  onPress: () => void;
};

export default function OrchardListCard({ orchard, onPress }: Props) {
  const location = [orchard.tehsil, orchard.district].filter(Boolean).join(", ");

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.light,
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        },
        shadows.profile_card,
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <CsText
            style={[typography.Poppins_m_semibold, { fontSize: 16, color: colors.dark }]}
            numberOfLines={1}
          >
            {orchard.orchardName}
          </CsText>

          {!!location && (
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, gap: 4 }}>
              <MapPin size={12} color={colors.neutral} />
              <CsText style={{ fontSize: 12, color: colors.neutral }} numberOfLines={1}>
                {location}
              </CsText>
            </View>
          )}
        </View>

        <ChevronRight size={20} color={colors.neutral} />
      </View>

      <View style={{ flexDirection: "row", marginTop: 12, gap: 20 }}>
        <View>
          <CsText style={{ fontSize: 11, color: colors.neutral }}>Area</CsText>
          <CsText style={[typography.Poppins_s_semibold, { fontSize: 14, color: colors.dark }]}>
            {orchard.areaHa.toFixed(2)} ha
          </CsText>
        </View>

        <View>
          <CsText style={{ fontSize: 11, color: colors.neutral }}>Trees</CsText>
          <CsText style={[typography.Poppins_s_semibold, { fontSize: 14, color: colors.dark }]}>
            {orchard.totalTrees}
          </CsText>
        </View>

        {orchard.establishmentYear != null && (
          <View>
            <CsText style={{ fontSize: 11, color: colors.neutral }}>Established</CsText>
            <CsText style={[typography.Poppins_s_semibold, { fontSize: 14, color: colors.dark }]}>
              {orchard.establishmentYear}
            </CsText>
          </View>
        )}
      </View>
    </Pressable>
  );
}
