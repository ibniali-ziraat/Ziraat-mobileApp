import { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import { MessageCircleMore, Plus } from "lucide-react-native";

import SearchBar from "@/src/components/shared/SearchBar";
import { useCreateQuestion, useQuestions } from "../hooks/useQuestion";


import AskModal from "../pages/AskModal";
import FilterModal from "../pages/FilterModal";
import MessageItem from "../pages/MessageItem";

type FilterType =
  | "latest"
  | "mostViewed"
  | "mostVoted";

const FILTERS: {
  label: string;
  value: FilterType;
}[] = [
  {
    label: "Latest",
    value: "latest",
  },

  {
    label: "Most Viewed",
    value: "mostViewed",
  },

  {
    label: "Most Voted",
    value: "mostVoted",
  },
];
             

export default function Discussionforum() {
  const { data, isLoading } = useQuestions();
  const { mutate: createQuestionApi, isPending } = useCreateQuestion();

  const [askVisible, setAskVisible] = useState(false);
  const [filter, setFilter] = useState<FilterType>("latest");
  const [search, setSearch] = useState("");




  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [advancedFilter, setAdvancedFilter] = useState<any>({});





  const scrollRef = useRef<ScrollView>(null);

  /* API QUESTIONS */
  const apiQuestions =
    data?.map((q: any) => ({
      id: q.id?.toString(),
      author: q.user?.displayName || "Unknown",
      title: q.title,
      content: q.body,
      excerpt: q.body?.slice(0, 100),
    tags:
  q.tags ||
  q.tagsInput ||
  q.tagNames ||
  q.questionTags ||
  [],
      createdAt: q.createdAt || new Date(),
      votes: q.votes || 0,
      views: q.views || 0,
      likes: 0,
      isLiked: false,
      children: q.children || [],
    })) || [];

  /* FILTER LOGIC */
  let discussionList = [...apiQuestions];

  /* ───────────────── GLOBAL SEARCH ───────────────── */

if (search.trim()) {
  const q = search
    .toLowerCase()
    .trim();

  discussionList = discussionList.filter(
    (item) => {
      /* QUESTION TITLE */
      const titleMatch =
        item.title
          ?.toLowerCase()
          .includes(q);

      /* QUESTION CONTENT */
      const contentMatch =
        item.content
          ?.toLowerCase()
          .includes(q);

      /* EXCERPT */
      const excerptMatch =
        item.excerpt
          ?.toLowerCase()
          .includes(q);

      /* AUTHOR */
      const authorMatch =
        item.author
          ?.toLowerCase()
          .includes(q);

      /* TAGS */
      const tagMatch =
        item.tags?.some(
          (tag: string) =>
            tag
              ?.toLowerCase()
              .includes(q)
        );

      /* ANSWERS / REPLIES */
      const replyMatch =
        item.children?.some(
          (reply: any) => {
            const replyText =
              reply?.content ||
              reply?.body ||
              reply?.message ||
              "";

            const replyAuthor =
              reply?.author ||
              reply?.user
                ?.displayName ||
              "";

            return (
              replyText
                .toLowerCase()
                .includes(q) ||
              replyAuthor
                .toLowerCase()
                .includes(q)
            );
          }
        );

      return (
        titleMatch ||
        contentMatch ||
        excerptMatch ||
        authorMatch ||
        tagMatch ||
        replyMatch
      );
    }
  );
}
/* ───────────────── MAIN FILTER TABS ───────────────── */

if (filter === "latest") {
  discussionList.sort((a, b) => {
    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  });
}

/* ───────────────── MAIN FILTER TABS ───────────────── */

/* LATEST */

if (filter === "latest") {
  discussionList.sort((a, b) => {
    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  });
}

/* MOST VIEWED */

if (filter === "mostViewed") {
  discussionList.sort((a, b) => {
    const viewDiff =
      (b.views || 0) -
      (a.views || 0);

    if (viewDiff !== 0) {
      return viewDiff;
    }

    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  });
}

/* MOST VOTED */

if (filter === "mostVoted") {
  discussionList.sort((a, b) => {
    const voteDiff =
      (b.votes || 0) -
      (a.votes || 0);

    if (voteDiff !== 0) {
      return voteDiff;
    }

    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  });
}





  /* CREATE QUESTION */
  const handleAskSubmit = (payload: any) => {
    if (isPending) return;
    createQuestionApi(payload, {
      onSuccess: () => {
        setAskVisible(false);
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
        {/* Title + Ask button */}
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
            <Text style={{ color: colors.light, fontWeight: "600", fontSize: 13 }}>
              Ask Question
            </Text>
          </TouchableOpacity>
        </View>

        {/* Count */}
        <Text style={{ fontSize: 13, color: colors.primary, marginBottom: 12 }}>
          {discussionList.length} question{discussionList.length !== 1 ? "s" : ""}
        </Text>

     {/*  NEW SEARCH BAR */}
  <View style={{ marginBottom: 12 }}>
          <SearchBar
            search={search}
            setSearch={setSearch}
        placeholder="Search questions, answers, tags..."
            
          />
          
        </View>

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
                  fontSize: 13,
                  fontWeight: filter === f.value ? "600" : "400",
                  color:
                    filter === f.value ? colors.primary : colors.dark,
                }}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── LIST (unchanged) ── */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 6 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              color: colors.overlay,
            }}
          >
            Loading discussions...
          </Text>
        ) : discussionList.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <MessageCircleMore size={40} color={colors.secondary} />
            <Text
              style={{ marginTop: 10, fontWeight: "700", fontSize: 16 }}
            >
              No questions yet
            </Text>
            <Text style={{ marginTop: 4 }}>
              {search ? "Try a different search" : "Be the first to ask something"}
            </Text>
          </View>
        ) : (
          discussionList.map((item) => (
            <MessageItem key={item.id} item={item} depth={0} />
          ))
        )}
      </ScrollView>

      <AskModal
        visible={askVisible}
        onClose={() => setAskVisible(false)}
        onSubmit={handleAskSubmit}
        loading={isPending}
      />

       {/*FILTER MODAL */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(filters: any) => setAdvancedFilter(filters)}
      />
    </View>
  );
}