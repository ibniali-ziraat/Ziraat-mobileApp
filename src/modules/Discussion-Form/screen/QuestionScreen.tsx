import BackHeader from "@/src/components/shared/BackHeader";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import {
  useAnswers,
  useComments,
  useCreateAnswer,
  useCreateComment,
  useQuestion,
} from "../hooks/useQuestion";

import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import MessageItem from "../pages/MessageItem";

// ─── SHOW COMMENTS ──
function AnswerComments({ answerId }: { answerId: number }) {
  const { data, isLoading } = useComments(answerId);

  if (isLoading) {
    return (
      <Text style={{ marginLeft: 20, fontSize: 12 }}>Loading replies...</Text>
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <View style={{ marginLeft: 20, marginTop: 6 }}>
      {data.map((c: any) => (
        <View key={c.id} style={{ marginBottom: 6 }}>
          <Text style={{ fontSize: 12, color: "#64748b" }}>
            {c.user?.displayName || "User"}
          </Text>
          <Text style={{ fontSize: 13 }}>{c.body}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── REPLY INPUT ───
function AnswerReplyInput({ answerId }: { answerId: number }) {
  const [replyText, setReplyText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createCommentApi, isPending } = useCreateComment();

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;

    createCommentApi(
      {
        body: replyText,
        userId: 2,
        answerId,
      },
      {
        onSuccess: () => {
          setReplyText("");
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
      {!isOpen ? (
        <Pressable onPress={() => setIsOpen(true)}>
          <Text style={{ color: colors.primary }}>Reply</Text>
        </Pressable>
      ) : (
        <>
          <TextInput
            placeholder="Write a reply..."
            value={replyText}
            onChangeText={setReplyText}
            style={{ borderWidth: 1, borderRadius: 10, padding: 8 }}
          />

          <Pressable onPress={handleSubmitReply}>
            <Text>{isPending ? "Posting..." : "Post Reply"}</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

// ─── MAIN SCREEN ───────────────────────────
export default function QuestionScreen() {
  const { id } = useLocalSearchParams();
  const questionId = Number(id);

  const { data, isLoading } = useQuestion(questionId);
  const { data: answersData } = useAnswers(questionId);
  const { mutate: createAnswerApi, isPending } = useCreateAnswer();

  const [input, setInput] = useState("");

  const question = data
    ? {
        id: data.id?.toString(),
        author: data.user?.displayName || "Unknown",
        title: data.title,

        content: data.body,
        votes: data.votes,
        tags: data.tags || [],
        children: [],
      }
    : null;

  const answers =
    answersData?.map((a: any) => ({
      id: a.id?.toString(),
      author: a.user?.displayName || "Unknown",

      content: a.body,
      votes: a.votes || 0,
      children: [],
    })) || [];

  const handleAnswer = () => {
    if (!input.trim()) return;

    createAnswerApi(
      {
        questionId,
        payload: {
          body: input,
          userId: 2,
        },
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BackHeader title="Discussion" />

      <ScreenContent>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {question && <MessageItem item={question} depth={0} />}

          {answers.map((a) => (
            <View key={a.id}>
              <MessageItem item={a} depth={1} />

              {/* COMMENTS */}
              <AnswerComments answerId={Number(a.id)} />

              {/* REPLY */}
              <AnswerReplyInput answerId={Number(a.id)} />
            </View>
          ))}
        </ScrollView>
      </ScreenContent>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderTopWidth: 0.5,
          borderColor: colors.cardBorder,
          backgroundColor: colors.light,
        }}
      >
        {/* INPUT BOX */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.light,
            borderRadius: 25,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderColor: colors.cardBorder,
          }}
        >
          <TextInput
            placeholder="Write your answer..."
            value={input}
            onChangeText={setInput}
            style={{
              flex: 1,
              paddingVertical: 10,
              fontSize: 14,
            }}
            placeholderTextColor={colors.overlay}
          />
        </View>

        {/* BUTTON */}
        <Pressable
          onPress={handleAnswer}
          style={{
            marginLeft: 10,
            backgroundColor: colors.secondary,
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 20,
            opacity: input.trim() ? 1 : 0.5,
          }}
          disabled={!input.trim() || isPending}
        >
          <Text
            style={{
              color: colors.light,
              fontWeight: "700",
              fontSize: 13,
              letterSpacing: 0.4,
            }}
          >
            {isPending ? "Posting…" : "Post"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
