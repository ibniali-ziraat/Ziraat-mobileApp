import { Pressable } from "@/src/components/shared/Pressable";
import SearchBar from "@/src/components/shared/SearchBar";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { router } from "expo-router";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  SlidersHorizontal,
  Trees,
  X,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OrchardCard from "./OrchardCard";

/** Longest list shown before it folds behind a "Show all" link. */
const PREVIEW_COUNT = 4;

type Props = {
  orchards: any[];
  search: string;
  setSearch: (val: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
  /** Opens the filter sheet. */
  onOpenFilters?: () => void;
  /** The applied facets, joined for display, or undefined while unfiltered. */
  activeFilterLabel?: string;
  /** Present only while something is filtered. */
  onClearFilters?: () => void;
};

export default function OrchardList({
  orchards,
  search,
  setSearch,
  onRefresh,
  refreshing,
  onOpenFilters,
  activeFilterLabel,
  onClearFilters,
}: Props) {
  const insets = useSafeAreaInsets();
  const footerHeight = Math.max(96, insets.bottom + 76);

  const [showAll, setShowAll] = useState(false);

  // Searching or filtering is a request to see the matches, so a narrowed list
  // never gets folded behind "Show all".
  const isNarrowed = search.trim().length > 0 || !!activeFilterLabel;
  const isCollapsed =
    !isNarrowed && !showAll && orchards.length > PREVIEW_COUNT;

  const visible = useMemo(
    () => (isCollapsed ? orchards.slice(0, PREVIEW_COUNT) : orchards),
    [isCollapsed, orchards],
  );

  const canToggle = !isNarrowed && orchards.length > PREVIEW_COUNT;

  return (
    <FlatList
      style={{ flex: 1 }}
      data={visible}
      keyExtractor={(item) => String(item.id)}
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderItem={({ item }) => <OrchardCard orchard={item} />}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      alwaysBounceVertical
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal: 20,
        flexGrow: 1,
      }}
      ListFooterComponent={
        <View>
          {canToggle ? (
            <Pressable
              onPress={() => setShowAll((value) => !value)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 13,
                marginTop: 4,
                borderRadius: cardTokens.radius,
                borderCurve: "continuous",
                borderWidth: 1,
                borderColor: cardTokens.border,
                backgroundColor: cardTokens.surface,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  { color: chartTokens.current, fontSize: 12, marginRight: 4 },
                ]}
              >
                {showAll ? "Show less" : `Show all ${orchards.length} orchards`}
              </Text>
              {showAll ? (
                <ChevronUp size={15} color={chartTokens.current} />
              ) : (
                <ChevronDown size={15} color={chartTokens.current} />
              )}
            </Pressable>
          ) : null}

          <View style={{ height: footerHeight }} />
        </View>
      }
      ListHeaderComponent={
        <View className="pb-5 pt-6">
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Search your orchards"
            rightAccessory={
              onOpenFilters ? (
                <Pressable
                  onPress={onOpenFilters}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={
                    activeFilterLabel
                      ? `Filters, ${activeFilterLabel} selected`
                      : "Filters"
                  }
                  style={({ pressed }) => ({
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: activeFilterLabel
                      ? chartTokens.current
                      : cardTokens.mutedSurface,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <SlidersHorizontal
                    size={17}
                    strokeWidth={2}
                    color={
                      activeFilterLabel
                        ? cardTokens.surface
                        : cardTokens.inkSecondary
                    }
                  />
                </Pressable>
              ) : null
            }
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            {orchards.length > 0 ? (
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_regular,
                  { flex: 1, color: cardTokens.inkMuted, fontSize: 11 },
                ]}
              >
                Showing {visible.length} of {orchards.length}
                {activeFilterLabel ? ` • ${activeFilterLabel}` : ""}
              </Text>
            ) : (
              <View style={{ flex: 1 }} />
            )}

            {onClearFilters ? (
              <Pressable
                onPress={onClearFilters}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Clear filters"
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <X size={12} color={chartTokens.current} strokeWidth={2.4} />
                <Text
                  style={[
                    typography.Poppins_xs_semibold,
                    { color: chartTokens.current, fontSize: 11, marginLeft: 3 },
                  ]}
                >
                  Clear filters
                </Text>
              </Pressable>
            ) : null}

            {/* Right-end button */}
            <Pressable
              onPress={() => router.push("/dashboard")}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="View orchard dashboard"
              style={({ pressed }) => ({
                marginLeft: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <LayoutDashboard size={13} color={colors.light} strokeWidth={2.2} />
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  { color: colors.light, fontSize: 11 },
                ]}
              >
                View Orchard Dashboard
              </Text>
            </Pressable>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View className="items-center rounded-3xl bg-white px-6 py-12">
          <Trees size={34} color={colors.primary} />
          <Text
            style={[
              typography.Poppins_m_semibold,
              { color: colors.dark, marginTop: 12 },
            ]}
          >
            No matching orchards
          </Text>
          <Text
            style={[
              typography.Poppins_s_regular,
              { color: colors.darkHover, marginTop: 4, textAlign: "center" },
            ]}
          >
            {activeFilterLabel
              ? "Nothing matches these filters. Clear them, or try a different search."
              : "Try a different orchard name, or open the filters."}
          </Text>
        </View>
      }
    />
  );
}
