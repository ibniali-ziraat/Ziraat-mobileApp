import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import type { ReactNode } from "react";
import { Text, View } from "react-native";

/**
 * Building blocks for the orchard dashboard tabs. The rule they enforce:
 * show what has data, say nothing about what doesn't — empty rows and empty
 * sections are dropped instead of printing "No data yet" over and over.
 */

export const isFilled = (value: unknown) =>
  value !== null &&
  value !== undefined &&
  String(value).trim() !== "" &&
  !/^no data/i.test(String(value));

export function SectionTitle({ children }: { children: string }) {
  return (
    <Text
      style={[
        typography.Poppins_m_semibold,
        { color: cardTokens.inkPrimary, marginTop: 28, marginBottom: 12 },
      ]}
    >
      {children}
    </Text>
  );
}

/** White panel with a faint outline — no shadow. */
export function Panel({
  children,
  padded = true,
}: {
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <View
      style={{
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: cardTokens.surface,
        padding: padded ? 16 : 0,
        overflow: "hidden",
      }}
    >
      {children}
    </View>
  );
}

export type StatRow = {
  label: string;
  value?: string | number | null;
  /** Draws the value in red (overdue, missed, losses). */
  alert?: boolean;
};

/**
 * Titled list of label → value rows with hairline dividers. Rows without a
 * value are dropped; with none left, the whole block (title included) is.
 */
export function StatList({ title, rows }: { title: string; rows: StatRow[] }) {
  const filled = rows.filter((row) => isFilled(row.value));
  if (filled.length === 0) return null;

  return (
    <View>
      <SectionTitle>{title}</SectionTitle>
      <Panel padded={false}>
        {filled.map((row, index) => (
          <View
            key={row.label}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderTopWidth: index === 0 ? 0 : 1,
              borderTopColor: colors.cardBorder,
            }}
          >
            <Text
              style={[
                typography.Poppins_s_regular,
                { color: cardTokens.inkSecondary, flex: 1, marginRight: 12 },
              ]}
            >
              {row.label}
            </Text>
            <Text
              style={[
                typography.Poppins_s_semibold,
                { color: row.alert ? colors.error : cardTokens.inkPrimary },
              ]}
            >
              {String(row.value)}
            </Text>
          </View>
        ))}
      </Panel>
    </View>
  );
}

/** Titled bullet list; dropped entirely when empty. */
export function NoteList({ title, items }: { title: string; items: string[] }) {
  const filled = items.filter(isFilled);
  if (filled.length === 0) return null;

  return (
    <View>
      <SectionTitle>{title}</SectionTitle>
      <Panel padded={false}>
        {filled.map((text, index) => (
          <Text
            key={`${index}-${text}`}
            style={[
              typography.Poppins_s_regular,
              {
                color: cardTokens.inkPrimary,
                paddingHorizontal: 16,
                paddingVertical: 13,
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopColor: colors.cardBorder,
              },
            ]}
          >
            {text}
          </Text>
        ))}
      </Panel>
    </View>
  );
}

/** Chart in a titled panel; dropped when every point is zero. */
export function ChartBlock({
  title,
  values,
  note,
  children,
}: {
  title: string;
  values: number[];
  note?: string | null;
  children: ReactNode;
}) {
  if (!values.some((value) => Number(value) !== 0)) return null;

  return (
    <View>
      <SectionTitle>{title}</SectionTitle>
      <Panel>
        {children}
        {note ? (
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, textAlign: "center", marginTop: 8 },
            ]}
          >
            {note}
          </Text>
        ) : null}
      </Panel>
    </View>
  );
}

/** "1,23,456" for small numbers, "1.2L" / "45.3k" once they get long. */
export const compactNumber = (value: number, digits = 1) => {
  const abs = Math.abs(value);
  if (abs >= 1e7) return `${(value / 1e7).toFixed(digits)}Cr`;
  if (abs >= 1e5) return `${(value / 1e5).toFixed(digits)}L`;
  if (abs >= 1e4) return `${(value / 1e3).toFixed(digits)}k`;
  return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
};

/** One strip of headline figures: big number, quiet label, hairline gaps. */
export function SummaryStrip({
  stats,
}: {
  stats: { label: string; value: string }[];
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 8,
        paddingVertical: 18,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: cardTokens.surface,
      }}
    >
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          style={{
            flex: 1,
            alignItems: "center",
            borderLeftWidth: index === 0 ? 0 : 1,
            borderLeftColor: colors.cardBorder,
          }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              typography.Poppins_l_semibold,
              { color: cardTokens.inkPrimary },
            ]}
          >
            {stat.value}
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, marginTop: 2 },
            ]}
          >
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
