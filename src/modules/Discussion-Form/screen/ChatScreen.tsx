import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import { MessageCircleMore, PlusCircle } from "lucide-react-native";
import { useCreateQuestion, useQuestions } from "../hooks/useQuestion";
import AskModal from "../pages/AskModal";
import MessageItem from "../pages/MessageItem";

export default function Discussionforum() {
  const { data, isLoading } = useQuestions();
  const { mutate: createQuestionApi, isPending } = useCreateQuestion();

  const [localQuestions, setLocalQuestions] = useState<any[]>([]);
  const [askVisible, setAskVisible] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  /* API QUESTIONS */
  const apiQuestions =
    data?.map((q: any) => ({
      id: q.id?.toString(),
      author: q.user?.displayName || "Unknown",

      title: q.title,
      content: q.body,
      excerpt: q.body?.slice(0, 100),
      tags: q.tags || [],
      createdAt: q.createdAt || new Date(),

      votes: q.votes || 0,
      views: q.views || 0,
      likes: 0,
      isLiked: false,
      children: [],
    })) || [];

  const discussionList = [...localQuestions, ...apiQuestions];

  /*  CREATE QUESTION */
  const handleAskSubmit = (payload: any) => {
    createQuestionApi(payload, {
      onSuccess: (res: any) => {
        const newQuestion = {
          id: res?.data?.id?.toString() || Date.now().toString(),
          author: "You",

          title: payload.title,
          content: payload.body,
          excerpt: payload.body.slice(0, 100),
          tags: payload.tags || [],
          createdAt: new Date(),

          votes: 0,
          views: 1,
          likes: 0,
          isLiked: false,
          children: [],
        };

        setLocalQuestions((prev) => [newQuestion, ...prev]);
        setAskVisible(false);

        scrollRef.current?.scrollTo({ y: 0, animated: true });
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      {/* HEADER */}
      <BackHeader title="Discussion" />

      {/*  ASK SECTION */}
      <View
        style={{
          padding: 16,
          backgroundColor: colors.light,
          borderBottomWidth: 1,
          borderColor: colors.cardBorder,
        }}
      >
        <Pressable
          onPress={() => setAskVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primary,
            paddingVertical: 14,
            borderRadius: 12,
            elevation: 2,
          }}
        >
          <PlusCircle size={18} color={colors.light} />
          <Text
            style={{
              color: colors.light,
              marginLeft: 8,
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            Ask a Question
          </Text>
        </Pressable>
      </View>

      {/* LIST */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingTop: 6,
        }}
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
              style={{
                marginTop: 10,
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              No questions yet
            </Text>
            <Text style={{ marginTop: 4 }}>Be the first to ask something</Text>
          </View>
        ) : (
          discussionList.map((item) => (
            <MessageItem key={item.id} item={item} depth={0} />
          ))
        )}
      </ScrollView>

      {/* MODAL */}
      <AskModal
        visible={askVisible}
        onClose={() => setAskVisible(false)}
        onSubmit={handleAskSubmit}
        loading={isPending}
      />
    </View>
  );
}
