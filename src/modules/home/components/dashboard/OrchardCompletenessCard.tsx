import { Pressable } from "@/src/components/shared/Pressable";
import {
  cardShadow,
  cardTokens,
  chartTokens,
} from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import type { OrchardCompleteness } from "@/src/modules/orchards/hooks/useOrchardCompleteness";
import { router } from "expo-router";
import { CheckCircle2, ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import MiniMeter from "./MiniMeter";

/** Longest list shown before the card folds the rest away. */
const PREVIEW_COUNT = 4;

type Props = {
  orchards: OrchardCompleteness[];
  done: number;
  total: number;
  percent: number;
  incomplete: number;
};

/**
 * One segment per section, in a fixed order, with a surface gap between them.
 * Filled means the section has details; the track step means it is still
 * empty. The "4 of 6" beside it carries the same value in text, so the row
 * never depends on colour alone.
 */
function SectionSegments({ row }: { row: OrchardCompleteness }) {
  return (
    <View style={{ flexDirection: "row", gap: 3, marginTop: 8 }}>
      {row.sections.map((section) => (
        <View
          key={section.key}
          style={{
            flex: 1,
            height: 7,
            borderRadius: 3.5,
            backgroundColor: section.done
              ? chartTokens.current
              : chartTokens.track,
          }}
        />
      ))}
    </View>
  );
}

function OrchardRow({
  row,
  isLast,
}: {
  row: OrchardCompleteness;
  isLast: boolean;
}) {
  const complete = row.done === row.total;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: ROUTES.ORCHARDS.DETAILS.ORCHARD_DETAILS,
          params: { id: row.id },
        })
      }
      accessibilityRole="button"
      accessibilityLabel={
        complete
          ? `${row.name}, all details added`
          : `${row.name}, ${row.done} of ${row.total} sections added. Missing ${row.missing.join(", ")}`
      }
      style={({ pressed }) => ({
        paddingVertical: 13,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: cardTokens.border,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_s_medium,
            { flex: 1, color: cardTokens.inkPrimary, fontSize: 13.5 },
          ]}
        >
          {row.name}
        </Text>

        <Text
          style={[
            typography.Poppins_xs_semibold,
            {
              color: complete ? chartTokens.current : cardTokens.inkSecondary,
              fontSize: 11.5,
              marginRight: 2,
            },
          ]}
        >
          {row.done} of {row.total}
        </Text>
        <ChevronRight size={15} color={cardTokens.inkMuted} />
      </View>

      <SectionSegments row={row} />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 7 }}
      >
        {complete ? (
          <>
            <CheckCircle2 size={12} color={chartTokens.current} />
            <Text
              style={[
                typography.Poppins_xs_regular,
                {
                  color: chartTokens.current,
                  fontSize: 10.5,
                  marginLeft: 4,
                },
              ]}
            >
              All sections added
            </Text>
          </>
        ) : (
          <Text
            numberOfLines={2}
            style={[
              typography.Poppins_xs_regular,
              { flex: 1, color: cardTokens.inkMuted, fontSize: 10.5 },
            ]}
          >
            Still to add: {row.missing.join(" · ")}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

/**
 * Which orchards are still missing which registration sections.
 *
 * The orchards with the most left to do sit at the top, and every row names
 * the sections it is missing, so the card reads as a to-do list rather than a
 * score.
 */
export default function OrchardCompletenessCard({
  orchards,
  done,
  total,
  percent,
  incomplete,
}: Props) {
  if (orchards.length === 0) return null;

  const visible = orchards.slice(0, PREVIEW_COUNT);
  const hidden = orchards.length - visible.length;

  return (
    <View
      style={[
        {
          borderRadius: 22,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.hairline,
          backgroundColor: cardTokens.surface,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 6,
        },
        cardShadow,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text
            style={[
              typography.Poppins_s_semibold,
              { color: cardTokens.inkPrimary, fontSize: 14.5 },
            ]}
          >
            Orchard records
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 10.5, marginTop: 2 },
            ]}
          >
            {incomplete === 0
              ? "Every orchard has all six sections filled"
              : `${incomplete} ${incomplete === 1 ? "orchard needs" : "orchards need"} more details`}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={[
              typography.Poppins_l_semibold,
              { color: cardTokens.inkPrimary, fontSize: 22, lineHeight: 26 },
            ]}
          >
            {percent}%
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 10 },
            ]}
          >
            {done} of {total} sections
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 12, marginBottom: 4 }}>
        <MiniMeter percent={percent} />
      </View>

      {visible.map((row, index) => (
        <OrchardRow
          key={row.id}
          row={row}
          isLast={index === visible.length - 1 && hidden === 0}
        />
      ))}

      {hidden > 0 ? (
        <Pressable
          onPress={() => router.push(ROUTES.TABS.ORCHARDS)}
          accessibilityRole="button"
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 13,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={[
              typography.Poppins_xs_semibold,
              { color: chartTokens.current, fontSize: 12, marginRight: 2 },
            ]}
          >
            {hidden} more {hidden === 1 ? "orchard" : "orchards"}
          </Text>
          <ChevronRight size={14} color={chartTokens.current} />
        </Pressable>
      ) : null}
    </View>
  );
}
