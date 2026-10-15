import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Bell,
  Bookmark,
  Hash,
  MessageCircleMore,
  Plus,
  X,
} from "lucide-react-native";

import SearchBar from "@/src/components/shared/SearchBar";
import {
  useCreateQuestion,
  useForumNotifications,
  useForumStats,
  useQuestions,
} from "../hooks/useQuestion";

import AskModal from "../pages/AskModal";
import MessageItem from "../pages/MessageItem";

type FilterType = "latest" | "mostViewed" | "mostVoted";

const FILTERS: { label: string; value: FilterType; sort: string }[] = [
  { label: "Latest", value: "latest", sort: "createdAt" },
  { label: "Most Viewed", value: "mostViewed", sort: "views" },
  { label: "Most Voted", value: "mostVoted", sort: "votes" },
];

const PAGE_SIZE = 20;

export default function Discussionforum() {
  const router = useRouter();
  const { userId } = useAuth();
  const params = useLocalSearchParams<{ tag?: string }>();

  const [askVisible, setAskVisible] = useState(false);
  const [filter, setFilter] = useState<FilterType>("latest");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | undefined>(params.tag);
  const [page, setPage] = useState(1);
  const [accumulated, setAccumulated] = useState<any[]>([]);

  const scrollRef = useRef<ScrollView>(null);

  // Debounce search → server-side `Q` param, matching the pattern already
  // used elsewhere in the app (useLocationSearch) instead of filtering an
  // already-fetched in-memory list.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset pagination whenever the query itself changes.
  useEffect(() => {
    setPage(1);
    setAccumulated([]);
  }, [debouncedSearch, filter, activeTag]);

  const activeFilter = FILTERS.find((f) => f.value === filter)!;

  const { data, isLoading, isFetching, refetch, isRefetching } = useQuestions({
    q: debouncedSearch || undefined,
    sort: activeFilter.sort,
    order: "DESC",
    tag: activeTag,
    page,
    limit: PAGE_SIZE,
  });

  const { mutate: createQuestionApi, isPending } = useCreateQuestion();
  const { data: statsData } = useForumStats();
  const { data: notifData } = useForumNotifications(Number(userId));

  const unreadCount = (
    Array.isArray(notifData)
      ? notifData
      : Array.isArray(notifData?.notifications)
        ? notifData.notifications
        : []
  ).filter((n: any) => !(n.isRead ?? n.read)).length;

  // Merge newly-fetched pages onto what's already loaded.
  useEffect(() => {
    if (!data) return;
    setAccumulated((prev) => (page === 1 ? data.questions : [...prev, ...data.questions]));
  }, [data, page]);

  const apiQuestions = accumulated.map((q: any) => ({
    id: q.id?.toString(),
    authorId: q.userId ?? q.user?.id,
    author: q.user?.displayName || "Unknown",
    title: q.title,
    content: q.body,
    excerpt: q.body?.slice(0, 100),
    tags: q.tags || q.tagsInput || q.tagNames || q.questionTags || [],
    createdAt: q.createdAt || new Date(),
    votes: q.votes || 0,
    views: q.views || 0,
    isBounty: q.isBounty,
    bountyAmount: q.bountyAmount,
  }));

  const total = data?.total ?? apiQuestions.length;
  const hasMore = apiQuestions.length < total;

  const handleAskSubmit = (payload: any) => {
    if (isPending) return;
    createQuestionApi(payload, {
      onSuccess: () => {
        setAskVisible(false);
        setPage(1);
        setAccumulated([]);
        refetch();
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <BackHeader title="Discussion" />

      {/* ── HEADER ── */}
      <View
        style={{
          backgroundColor: colors.light,
          borderBottomWidth: 1,
          borderColor: colors.cardBorder,
          paddingHorizontal: 16,
          paddingTop: 14,
        }}
      >
        {/* Title + quick actions */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", color: colors.dark }}>
            Questions
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TouchableOpacity
              onPress={() => router.push(ROUTES.Discussion.Tags)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.cardBorder,
              }}
            >
              <Hash size={16} color={colors.secondary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push(ROUTES.Discussion.Bookmarks)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.cardBorder,
              }}
            >
              <Bookmark size={16} color={colors.secondary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push(ROUTES.Discussion.Notifications)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.cardBorder,
              }}
            >
              <Bell size={16} color={colors.secondary} />
              {unreadCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    width: 9,
                    height: 9,
                    borderRadius: 5,
                    backgroundColor: colors.error,
                  }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAskVisible(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: colors.primary,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
              }}
            >
              <Plus size={14} color={colors.light} strokeWidth={2.5} />
              <Text style={{ color: colors.light, fontWeight: "600", fontSize: 15 }}>
                Ask
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Count + stats */}
        <Text style={{ fontSize: 15, color: colors.primary, marginBottom: 12 }}>
          {total} question{total !== 1 ? "s" : ""}
          {statsData?.totalAnswers != null ? ` · ${statsData.totalAnswers} answers` : ""}
          {statsData?.totalUsers != null ? ` · ${statsData.totalUsers} members` : ""}
        </Text>

        {/* SEARCH BAR */}
        <View style={{ marginBottom: 12 }}>
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Search..."
          />
        </View>

        {/* Active tag chip */}
        {activeTag && (
          <TouchableOpacity
            onPress={() => setActiveTag(undefined)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 6,
              backgroundColor: colors.primary + "15",
              borderWidth: 1,
              borderColor: colors.primary + "30",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              marginBottom: 10,
            }}
          >
            <Hash size={12} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: 14, fontWeight: "700" }}>
              {activeTag}
            </Text>
            <X size={12} color={colors.primary} />
          </TouchableOpacity>
        )}

        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -16 }}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.value}
              onPress={() => setFilter(f.value)}
              style={{
                marginRight: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderBottomWidth: 2,
                borderBottomColor:
                  filter === f.value ? colors.primary : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: filter === f.value ? "600" : "400",
                  color: filter === f.value ? colors.primary : colors.dark,
                }}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── LIST ── */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 6 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && page === 1}
            onRefresh={() => {
              setPage(1);
              setAccumulated([]);
              refetch();
            }}
          />
        }
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const nearBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;
          if (nearBottom && hasMore && !isFetching) {
            setPage((p) => p + 1);
          }
        }}
        scrollEventThrottle={200}
      >
        {isLoading && page === 1 ? (
          <Text style={{ textAlign: "center", marginTop: 40, color: colors.overlay }}>
            Loading discussions...
          </Text>
        ) : apiQuestions.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <MessageCircleMore size={40} color={colors.secondary} />
            <Text style={{ marginTop: 10, fontWeight: "700", fontSize: 17 }}>
              No questions yet
            </Text>
            <Text style={{ marginTop: 4 }}>
              {search ? "Try a different search" : "Be the first to ask something"}
            </Text>
          </View>
        ) : (
          <>
            {apiQuestions.map((item) => (
              <MessageItem key={item.id} item={item} depth={0} />
            ))}
            {isFetching && page > 1 && (
              <ActivityIndicator
                style={{ marginTop: 16 }}
                color={colors.primary}
              />
            )}
          </>
        )}
      </ScrollView>

      <AskModal
        visible={askVisible}
        onClose={() => setAskVisible(false)}
        onSubmit={handleAskSubmit}
        loading={isPending}
      />
    </View>
  );
}
