import { Pressable } from "@/src/components/shared/Pressable";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { advisoryArt } from "@/src/constants/iconArt";
import { useDashboardHome } from "@/src/modules/dashboard/hooks/useDashboardHome";
import AdvisoryKindIcon from "@/src/modules/farmer-advisories/components/AdvisoryKindIcon";
import AdvisoryStatusBadge from "@/src/modules/farmer-advisories/components/AdvisoryStatusBadge";
import { advisoryKeys } from "@/src/modules/farmer-advisories/hooks/usefarmadvisories";
import { advisoryRoutes } from "@/src/modules/farmer-advisories/routes/advisoryRoutes";
import {
  getAllAdvisories,
  type AdvisoryListItem,
} from "@/src/modules/farmer-advisories/services/farmeradvisories.service";
import {
  formatWindow,
  getAdvisoryStatus,
} from "@/src/modules/farmer-advisories/utils/advisoryStatus";
import { useQueries } from "@tanstack/react-query";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import DashboardSectionHeader from "../dashboard/DashboardSectionHeader";

const PAGE_SIZE = 25;
const SHOWN = 3;

// Overdue first, then new, then the rest; earliest deadline first within each.
const urgency = { overdue: 0, new: 1, seen: 2, acknowledged: 3 } as const;

/**
 * Advisories across all the farmer's orchards. Reuses the advisory list's
 * query keys, so opening an orchard's list afterwards is instant, and React
 * Query shares the requests between every caller.
 *
 * `total` counts every advisory (any status), so Home can tell a farmer who
 * receives advisories from one who never has.
 */
export function useAdvisoryFeed() {
  const { data, isFetched } = useDashboardHome();
  const orchards = data?.orchards ?? [];

  const results = useQueries({
    queries: orchards.map((orchard) => ({
      queryKey: advisoryKeys.list(orchard.orchardProfileId, 1, PAGE_SIZE),
      queryFn: () =>
        getAllAdvisories({
          orchardProfileId: orchard.orchardProfileId,
          page: 1,
          pageSize: PAGE_SIZE,
        }),
      staleTime: 60_000,
    })),
  });

  const loaded =
    orchards.length > 0 && results.every((result) => !result.isPending);
  const total = results.reduce(
    (sum, result) => sum + (result.data?.items?.length ?? 0),
    0,
  );

  const open = useMemo(() => {
    const items: (AdvisoryListItem & { statusKey: keyof typeof urgency })[] =
      [];
    for (const result of results) {
      for (const item of result.data?.items ?? []) {
        const statusKey = getAdvisoryStatus(item);
        if (statusKey in urgency) {
          items.push({ ...item, statusKey: statusKey as keyof typeof urgency });
        }
      }
    }
    return items.sort(
      (a, b) =>
        urgency[a.statusKey] - urgency[b.statusKey] ||
        new Date(a.windowEnd).getTime() - new Date(b.windowEnd).getTime(),
    );
    // results is a new array each render; its data is what matters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results.map((r) => r.dataUpdatedAt).join()]);

  // Settled: orchards known and, if there are any, their advisories too.
  const ready = isFetched && (orchards.length === 0 || loaded);

  return { orchards, open, total, loaded, ready };
}

export default function AdvisoryDigest() {
  const { open, total, loaded } = useAdvisoryFeed();

  if (!loaded || total === 0) return null;

  const overdue = open.filter((item) => item.statusKey === "overdue").length;
  // The advisory list is per orchard, so "view all" only makes sense when
  // everything open belongs to one.
  const singleOrchard =
    open.length > 0 &&
    open.every((item) => item.orchardProfileId === open[0].orchardProfileId);
  const subtitle = open.length
    ? [`${open.length} open`, overdue ? `${overdue} overdue` : null]
        .filter(Boolean)
        .join(" · ")
    : "You're all caught up";

  return (
    <View>
      <DashboardSectionHeader
        title="Advisories"
        subtitle={subtitle}
        art={advisoryArt.bell}
      />

      {open.length === 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 14,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.cardBorder,
          }}
        >
          <SvgXml xml={advisoryArt.empty} width={44} height={44} />
          <Text
            style={[
              typography.Poppins_s_regular,
              { color: cardTokens.inkSecondary, marginLeft: 12, flex: 1 },
            ]}
          >
            No pending advisories. New advice for your orchards will show up
            here.
          </Text>
        </View>
      ) : (
        <View
          style={{
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.cardBorder,
            overflow: "hidden",
          }}
        >
          {open.slice(0, SHOWN).map((item, index) => (
            <Pressable
              key={item.recipientId}
              onPress={() =>
                router.push(advisoryRoutes.details(item.recipientId) as any)
              }
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopColor: colors.cardBorder,
                backgroundColor: pressed
                  ? cardTokens.mutedSurface
                  : cardTokens.surface,
              })}
            >
              <AdvisoryKindIcon kind={item.kind} size={40} />
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_s_semibold,
                    { color: cardTokens.inkPrimary },
                  ]}
                >
                  {item.title?.charAt(0).toUpperCase() + item.title?.slice(1)}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_xs_regular,
                    { color: cardTokens.inkMuted },
                  ]}
                >
                  {[
                    item.orchardName?.trim(),
                    formatWindow(item.windowStart, item.windowEnd),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </Text>
              </View>
              <AdvisoryStatusBadge status={item.statusKey} />
            </Pressable>
          ))}

          {singleOrchard ? (
            <Pressable
              onPress={() =>
                router.push(
                  advisoryRoutes.list(
                    open[0].orchardProfileId,
                    open[0].orchardName,
                  ) as any,
                )
              }
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 11,
                borderTopWidth: 1,
                borderTopColor: colors.cardBorder,
                backgroundColor: pressed
                  ? cardTokens.mutedSurface
                  : cardTokens.surface,
              })}
            >
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  { color: colors.primary },
                ]}
              >
                {open.length > SHOWN
                  ? `View all ${open.length} advisories`
                  : "View all advisories"}
              </Text>
              <ChevronRight size={15} color={colors.primary} />
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}
