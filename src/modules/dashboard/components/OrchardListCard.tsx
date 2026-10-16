import IconBadge from "@/src/components/shared/IconBadge";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ChevronRight, MapPin, Trees } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import type { DashboardOrchardSummary } from "../types/dashboardHome";

type Props = {
  orchard: DashboardOrchardSummary;
  onPress: () => void;
};

const formatTrees = (count: number) => count.toLocaleString("en-IN");

/**
 * One orchard as a card: name and place on top, then a hairline and three
 * labelled figures underneath — the detail screen carries everything else.
 */
export default function OrchardListCard({ orchard, onPress }: Props) {
  const location = [orchard.tehsil, orchard.district]
    .filter(Boolean)
    .join(", ");

  const facts = [
    {
      label: "Area",
      value: `${Number(orchard.areaHa ?? 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })} ha`,
    },
    {
      label: "Trees",
      value: formatTrees(Number(orchard.totalTrees ?? 0)),
    },
    orchard.establishmentYear != null
      ? { label: "Since", value: String(orchard.establishmentYear) }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${orchard.orchardName}`}
      style={({ pressed }) => ({
        marginBottom: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: pressed ? cardTokens.mutedSurface : cardTokens.surface,
        overflow: "hidden",
      })}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
      >
        <IconBadge icon={Trees} tone="green" size={46} />

        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_m_semibold,
              { color: cardTokens.inkPrimary },
            ]}
          >
            {orchard.orchardName}
          </Text>
          {location ? (
            <View
              style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}
            >
              <MapPin size={12} color={cardTokens.inkMuted} />
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_regular,
                  { color: cardTokens.inkMuted, marginLeft: 4, flexShrink: 1 },
                ]}
              >
                {location}
              </Text>
            </View>
          ) : null}
        </View>

        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: cardTokens.mutedSurface,
          }}
        >
          <ChevronRight size={16} color={cardTokens.inkSecondary} />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: colors.cardBorder,
          backgroundColor: cardTokens.mutedSurface,
        }}
      >
        {facts.map((fact, index) => (
          <View
            key={fact.label}
            style={{
              flex: 1,
              alignItems: "center",
              borderLeftWidth: index === 0 ? 0 : 1,
              borderLeftColor: colors.cardBorder,
            }}
          >
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_s_semibold,
                { color: cardTokens.inkPrimary },
              ]}
            >
              {fact.value}
            </Text>
            <Text
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkMuted },
              ]}
            >
              {fact.label}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
