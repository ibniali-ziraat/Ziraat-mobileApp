import CsText from "@/src/components/shared/CsText";
import { productArt, statIcons } from "@/src/constants/iconArt";
import { getOrchardTile } from "@/src/constants/illustrations";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { ChevronRight, MapPin } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { SvgXml } from "react-native-svg";
import type { DashboardOrchardSummary } from "../types/dashboardHome";

type Props = {
  orchard: DashboardOrchardSummary;
  onPress: () => void;
};

export default function OrchardListCard({ orchard, onPress }: Props) {
  const location = [orchard.tehsil, orchard.district]
    .filter(Boolean)
    .join(", ");

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.light,
          borderRadius: 16,
          marginBottom: 12,
        },
        shadows.profile_card,
      ]}
    >
      <View style={{ padding: 14 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              overflow: "hidden",
              marginRight: 12,
            }}
          >
            <SvgXml xml={getOrchardTile(orchard)} width={56} height={56} />
          </View>

          <View style={{ flex: 1, marginRight: 8 }}>
            <CsText
              style={[
                typography.Poppins_m_semibold,
                { fontSize: 16, color: colors.dark },
              ]}
              numberOfLines={1}
            >
              {orchard.orchardName}
            </CsText>

            {!!location && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                  gap: 4,
                }}
              >
                <MapPin size={12} color={colors.neutral} />
                <CsText
                  style={{ fontSize: 12, color: colors.neutral }}
                  numberOfLines={1}
                >
                  {location}
                </CsText>
              </View>
            )}
          </View>

          <ChevronRight size={20} color={colors.neutral} />
        </View>

        <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
          {[
            {
              art: statIcons.area,
              tint: "#FFF4E5",
              label: "Area",
              value: `${orchard.areaHa.toFixed(2)} ha`,
            },
            {
              art: productArt.seeds,
              tint: "#EAF5E4",
              label: "Trees",
              value: String(orchard.totalTrees),
            },
            ...(orchard.establishmentYear != null
              ? [
                  {
                    art: statIcons.age,
                    tint: "#E6F3FC",
                    label: "Since",
                    value: String(orchard.establishmentYear),
                  },
                ]
              : []),
          ].map((stat) => (
            <View
              key={stat.label}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 7,
                paddingHorizontal: 8,
                borderRadius: 12,
                backgroundColor: stat.tint,
              }}
            >
              <SvgXml xml={stat.art} width={20} height={20} />
              <View style={{ marginLeft: 6, flexShrink: 1 }}>
                <CsText
                  numberOfLines={1}
                  style={[
                    typography.Poppins_s_semibold,
                    { fontSize: 12.5, color: colors.dark },
                  ]}
                >
                  {stat.value}
                </CsText>
                <CsText style={{ fontSize: 10, color: colors.neutral }}>
                  {stat.label}
                </CsText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}
