import { Pressable } from "@/src/components/shared/Pressable";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { filterArt } from "@/src/constants/iconArt";
import { RotateCcw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** Sentinel for "this facet is not filtering anything". */
export const ANY = "__any__";

export type OrchardSort =
  | "name-asc"
  | "name-desc"
  | "area-desc"
  | "year-desc";

export type OrchardFilters = {
  ownershipType: string;
  district: string;
  plantationPattern: string;
  sort: OrchardSort;
};

export const DEFAULT_FILTERS: OrchardFilters = {
  ownershipType: ANY,
  district: ANY,
  plantationPattern: ANY,
  sort: "name-asc",
};

export type FacetOption = {
  value: string;
  label: string;
  /** Undefined for sort options, which do not narrow anything. */
  count?: number;
};

export type OrchardFacets = {
  ownershipType: FacetOption[];
  district: FacetOption[];
  plantationPattern: FacetOption[];
};

export const SORT_OPTIONS: FacetOption[] = [
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "area-desc", label: "Largest area" },
  { value: "year-desc", label: "Newest first" },
];

type Props = {
  visible: boolean;
  facets: OrchardFacets;
  value: OrchardFilters;
  onApply: (next: OrchardFilters) => void;
  onClose: () => void;
};

function Chip({
  option,
  selected,
  onPress,
}: {
  option: FacetOption;
  selected: boolean;
  onPress: () => void;
}) {
  const empty = option.count === 0;

  return (
    <Pressable
      onPress={onPress}
      disabled={empty}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: empty }}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 13,
        paddingVertical: 9,
        borderRadius: 999,
        borderCurve: "continuous",
        borderWidth: 1,
        borderColor: selected ? chartTokens.current : cardTokens.hairline,
        backgroundColor: selected ? chartTokens.current : cardTokens.surface,
        opacity: empty ? 0.4 : pressed ? 0.75 : 1,
      })}
    >
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_xs_medium,
          {
            fontSize: 14,
            color: selected ? cardTokens.surface : cardTokens.inkSecondary,
          },
        ]}
      >
        {option.label}
      </Text>

      {typeof option.count === "number" ? (
        <Text
          style={[
            typography.Poppins_xs_semibold,
            {
              fontSize: 13,
              marginLeft: 6,
              color: selected ? "rgba(255,255,255,0.75)" : cardTokens.inkMuted,
            },
          ]}
        >
          {option.count}
        </Text>
      ) : null}
    </Pressable>
  );
}

function Facet({
  title,
  art,
  options,
  value,
  onChange,
}: {
  title: string;
  /** Full-colour icon from `filterArt`, shown before the title. */
  art: string;
  options: FacetOption[];
  value: string;
  onChange: (next: string) => void;
}) {
  if (options.length <= 1) return null;

  return (
    <View style={{ marginBottom: 22 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          marginLeft: 2,
        }}
      >
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 9,
            marginRight: 8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: cardTokens.mutedSurface,
          }}
        >
          <SvgXml xml={art} width={19} height={19} />
        </View>
        <Text
          style={[
            typography.Poppins_xs_semibold,
            { color: cardTokens.inkSecondary, fontSize: 14 },
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {options.map((option) => (
          <Chip
            key={option.value}
            option={option}
            selected={option.value === value}
            onPress={() => onChange(option.value)}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * Every way the orchard list can be narrowed, in one sheet: ownership, where
 * it is, how it is planted, and the order to read them in.
 *
 * Choices are held locally and committed on Apply, so setting three facets
 * re-filters the list once rather than on every tap. Options that would empty
 * the list are dimmed and inert.
 */
export default function OrchardFilterSheet({
  visible,
  facets,
  value,
  onApply,
  onClose,
}: Props) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<OrchardFilters>(value);

  // Opening the sheet always starts from what is currently applied, so a
  // dismissed edit never leaks into the next visit.
  useEffect(() => {
    if (visible) setDraft(value);
  }, [visible, value]);

  const set = <K extends keyof OrchardFilters>(
    key: K,
    next: OrchardFilters[K],
  ) => setDraft((current) => ({ ...current, [key]: next }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        onPress={onClose}
        accessibilityLabel="Close filters"
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
      />

      <View
        style={{
          backgroundColor: cardTokens.surface,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderCurve: "continuous",
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 16),
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.14,
          shadowRadius: 24,
          elevation: 24,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: chartTokens.track,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 6,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              marginRight: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EEF4E9",
            }}
          >
            <SvgXml xml={filterArt.funnel} width={28} height={28} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                typography.Poppins_m_semibold,
                { color: cardTokens.inkPrimary, fontSize: 18 },
              ]}
            >
              Filter orchards
            </Text>
            <Text
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkMuted, marginTop: 2 },
              ]}
            >
              Narrow the list by ownership, place or planting
            </Text>
          </View>

          <Pressable
            onPress={() => setDraft(DEFAULT_FILTERS)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Reset filters"
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <RotateCcw size={13} color={cardTokens.inkMuted} />
            <Text
              style={[
                typography.Poppins_xs_medium,
                { color: cardTokens.inkMuted, fontSize: 14, marginLeft: 4 },
              ]}
            >
              Reset
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={{ maxHeight: 420 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14 }}
          showsVerticalScrollIndicator={false}
        >
          <Facet
            title="Ownership type"
            art={filterArt.ownership}
            options={facets.ownershipType}
            value={draft.ownershipType}
            onChange={(next) => set("ownershipType", next)}
          />

          <Facet
            title="Location"
            art={filterArt.location}
            options={facets.district}
            value={draft.district}
            onChange={(next) => set("district", next)}
          />

          <Facet
            title="Plantation pattern"
            art={filterArt.pattern}
            options={facets.plantationPattern}
            value={draft.plantationPattern}
            onChange={(next) => set("plantationPattern", next)}
          />

          <Facet
            title="Sort by"
            art={filterArt.sort}
            options={SORT_OPTIONS}
            value={draft.sort}
            onChange={(next) => set("sort", next as OrchardSort)}
          />
        </ScrollView>

        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <Pressable
            onPress={() => {
              onApply(draft);
              onClose();
            }}
            accessibilityRole="button"
            style={({ pressed }) => ({
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 15,
              borderRadius: 18,
              borderCurve: "continuous",
              backgroundColor: chartTokens.current,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Text
              style={[
                typography.Poppins_s_semibold,
                { color: cardTokens.surface, fontSize: 16 },
              ]}
            >
              Show results
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
