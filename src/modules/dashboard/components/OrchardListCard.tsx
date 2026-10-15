import IconBadge from "@/src/components/shared/IconBadge";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ChevronRight, Trees } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import type { DashboardOrchardSummary } from "../types/dashboardHome";

type Props = {
  orchard: DashboardOrchardSummary;
  onPress: () => void;
};

const formatTrees = (count: number) =>
  `${count.toLocaleString("en-IN")} ${count === 1 ? "tree" : "trees"}`;

/**
 * One orchard as a single row: name, place, then one quiet line of facts —
 * the detail screen carries everything else.
 */
export default function OrchardListCard({ orchard, onPress }: Props) {
  const location = [orchard.tehsil, orchard.district]
    .filter(Boolean)
    .join(", ");

  const facts = [
    `${Number(orchard.areaHa ?? 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })} ha`,
    formatTrees(Number(orchard.totalTrees ?? 0)),
    orchard.establishmentYear != null
      ? `Since ${orchard.establishmentYear}`
      : null,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${orchard.orchardName}`}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        marginBottom: 12,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: pressed ? cardTokens.mutedSurface : cardTokens.surface,
      })}
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
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, marginTop: 1 },
            ]}
          >
            {location}
          </Text>
        ) : null}
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_xs_medium,
            { color: cardTokens.inkSecondary, marginTop: 6 },
          ]}
        >
          {facts}
        </Text>
      </View>

      <ChevronRight size={18} color={cardTokens.inkMuted} />
    </Pressable>
  );
}
