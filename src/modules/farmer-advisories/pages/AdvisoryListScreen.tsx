import BackHeader from "@/src/components/shared/BackHeader";
import { Pressable } from "@/src/components/shared/Pressable";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { advisoryArt, advisoryKindArt } from "@/src/constants/iconArt";
import { router, useLocalSearchParams } from "expo-router";
import { CloudOff, Inbox } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import AdvisoryBanner from "../components/AdvisoryBanner";
import AdvisoryCard from "../components/AdvisoryCard";
import AdvisoryEmptyState from "../components/AdvisoryEmptyState";
import { useInfiniteAdvisories } from "../hooks/usefarmadvisories";
import { advisoryRoutes } from "../routes/advisoryRoutes";
import {
  ADVISORY_FILTERS,
  matchesFilter,
  type AdvisoryFilter,
} from "../utils/advisoryStatus";

const EMPTY_MESSAGES: Record<AdvisoryFilter, string> = {
  all: "Advisories sent for this orchard will show up here.",
  pending: "Nothing waiting on you right now.",
  overdue: "No overdue advisories. Nice work!",
  completed: "Completed advisories will show up here.",
};

export default function AdvisoryListScreen() {
  const { orchardProfileId, orchardName } = useLocalSearchParams<{
    orchardProfileId: string;
    orchardName?: string;
  }>();
  const parsedId = Number(orchardProfileId);
  const [filter, setFilter] = useState<AdvisoryFilter>("all");

  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteAdvisories(Number.isNaN(parsedId) ? undefined : parsedId);

  const advisories = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );
  const visible = useMemo(
    () => advisories.filter((advisory) => matchesFilter(advisory, filter)),
    [advisories, filter],
  );

  const total = data?.pages[0]?.total ?? 0;
  const subtitle = [
    orchardName?.trim() || advisories[0]?.orchardName?.trim(),
    data ? `${total} ${total === 1 ? "advisory" : "advisories"}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={{ paddingTop: 48 }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (isError) {
      return (
        <AdvisoryEmptyState
          icon={CloudOff}
          art={advisoryArt.offline}
          title="Couldn't load advisories"
          message="Check your connection and try again."
          actionLabel="Try again"
          onAction={() => refetch()}
        />
      );
    }

    return (
      <AdvisoryEmptyState
        icon={Inbox}
        art={advisoryArt.empty}
        title="No advisories"
        message={EMPTY_MESSAGES[filter]}
      />
    );
  };

  return (
    <ScreenLayout scrollable={false} bottomPadding={0}>
      <BackHeader title="Advisories" desc={subtitle || undefined} />

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 12, gap: 8 }}
        >
          {ADVISORY_FILTERS.map((option) => {
            const selected = option.key === filter;
            return (
              <Pressable
                key={option.key}
                onPress={() => setFilter(option.key)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: selected ? colors.primary : colors.primary + "18",
                  backgroundColor: selected ? colors.primary : colors.primary + "0B",
                }}
              >
                <Text
                  style={[
                    typography.Poppins_s_medium,
                    {
                      fontSize: 15,
                      color: selected ? colors.light : cardTokens.inkSecondary,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.recipientId}
        renderItem={({ item }) => (
          <AdvisoryCard
            advisory={item}
            onPress={() => router.push(advisoryRoutes.details(item.recipientId))}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 4, paddingBottom: 24, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={refetch}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <AdvisoryBanner
            orchardProfileId={Number.isNaN(parsedId) ? undefined : parsedId}
            title="Expert advice for your orchard"
            subtitle="Spray, fertigation, pruning & harvest"
            badges={["spray", "fertigation", "pruning", "harvest"].map(
              (kind) => advisoryKindArt[kind].art,
            )}
          />
        }
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator color={colors.primary} style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </ScreenLayout>
  );
}
