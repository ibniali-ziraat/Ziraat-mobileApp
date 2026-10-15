import { useEffect, useState } from "react";

import {
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import BackHeader from "@/src/components/shared/BackHeader";

import {
  useAcceptAnswer,
  useAnswers,
  useCreateAnswer,
  useQuestion,
} from "../hooks/useQuestion";

import MessageItem from "../pages/MessageItem";

import {
  CheckCircle2,
  Clock,
  Heart,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react-native";

import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import Avatar from "../pages/Avatar";
import AnswerPrompt from "../pages/AnswerPrompt";
import BottomAnswerInput from "../pages/BottomAnswerInput";

export default function QuestionScreen() {





  
  const { id } = useLocalSearchParams();
  const questionId = Number(id);
  const { userId } = useAuth();

  const { data } = useQuestion(questionId, userId ? Number(userId) : undefined);
  const { data: answersData } = useAnswers(questionId);
  const { mutate: createAnswerApi, isPending } = useCreateAnswer();
  const { mutate: acceptAnswerApi, isPending: isAccepting } = useAcceptAnswer();

  const [input, setInput] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  // ================= KEYBOARD =================
  // KeyboardAvoidingView + windowSoftInputMode="adjustResize" turned out
  // unreliable on physical devices (composer still landed under the
  // keyboard) — tracking the keyboard's actual height and pushing the
  // composer up by that exact amount is the robust fallback.
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) =>
      setKeyboardHeight(e.endCoordinates?.height ?? 0),
    );
    const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // ================= REPLY =================
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // ================= QUESTION =================
  const questionAuthorId = data?.userId ?? data?.user?.id ?? null;
  const isQuestionOwner =
    !!userId && questionAuthorId != null && Number(questionAuthorId) === Number(userId);

  const question = data
    ? {
        id: data.id?.toString(),
        authorId: questionAuthorId,
        author: data.user?.displayName || "Unknown",
        title: data.title,
        content: data.body,
        votes: data.votes,
        createdAt: data.createdAt,
        tags: data.tags || data.questionTags || [],
        children: [],
      }
    : null;

  // ================= ANSWERS =================
  const answersMap = new Map();

  answersData?.forEach((a: any) => {
    if (!answersMap.has(a.id)) {
      answersMap.set(a.id, {
        id: a.id,
        authorId: a.userId ?? a.user?.id,
        author: a.user?.displayName || "Unknown",
        content: a.body,
        votes: a.votes || 0,
        createdAt: a.createdAt,
        user: a.user,
        isAccepted:
          a.isAccepted ?? a.accepted ?? (data?.acceptedAnswerId === a.id),
        replies: [],
      });
    }
  });

  const answers = Array.from(answersMap.values());

  // ================= ACCEPT ANSWER =================
  const handleAcceptAnswer = (answerId: number) => {
    if (isAccepting) return;
    acceptAnswerApi({ questionId, answerId });
  };

  // ================= CREATE ANSWER =================
  const handleAnswer = () => {
    if (!input.trim() || isPending || !userId) return;
    createAnswerApi(
      { questionId, payload: { body: input, userId: Number(userId) } },
      {
        onSuccess: () => {
          setInput("");
          setIsAnswering(false);
        },
      }
    );
  };

  // ================= SEND REPLY =================
  const handleReply = () => {
    if (!replyMessage.trim() || !activeReplyId || !userId) return;
    createAnswerApi(
      {
        questionId,
        payload: {
          body: `@reply-${activeReplyId} ${replyMessage}`,
          userId: Number(userId),
        },
      },
      {
        onSuccess: () => {
          setReplyMessage("");
          setActiveReplyId(null);
        },
      }
    );
  };

  // ================= BUILD TREE =================
  const getParentId = (body: string) => {
    const match = body?.match(/@reply-(\d+)/);
    return match ? Number(match[1]) : null;
  };

  const buildTree = (items: any[]) => {
    const map: any = {};
    const roots: any[] = [];
    items.forEach((item) => { map[item.id] = { ...item, replies: [] }; });
    items.forEach((item) => {
      const parentId = getParentId(item.content);
      if (parentId && map[parentId]) {
        map[parentId].replies.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });
    // Latest answer first — replies within a thread stay chronological
    // (oldest first), only the top-level answers are newest-first.
    return roots.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  };

  const answersTree = buildTree(answers);

  // ================= FORMAT MESSAGE =================
  const formatMessage = (body: string) =>
    body.replace(/@reply-\d+\s?/, "").trim();

  const renderReplies = (replies: any[], level = 1) => {
    const isDeep = level > 1;
    const avatarSize = isDeep ? 26 : 28;
    const textSize = isDeep ? 14 : 15;

    return replies.map((reply: any) => (
      <View
        key={reply.id}
        style={{
          flexDirection: "row",
          marginTop: 8,
        }}
      >
        {/* ── Content: flex:1 so it fills exactly what's left ── */}
        <View style={{ flex: 1, minWidth: 0 }}>
          <View
            style={{
              backgroundColor: isDeep ? "#f1f5f9" : "#f7f9fc",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: isDeep ? "#e2e8f0" : "#dde3ee",
              padding: 11,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Avatar
                name={reply.user?.displayName || "U"}
                size={avatarSize}
                fontSize={avatarSize * 0.38}
              />

              <View style={{ flex: 1, marginLeft: 9, minWidth: 0 }}>
                {/* NAME + TIME */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: textSize,
                      fontWeight: "700",
                      color: "#0f172a",
                      flexShrink: 1,
                    }}
                  >
                    {reply.author}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                      flexShrink: 0,
                      marginLeft: 6,
                    }}
                  >
                    <Clock size={9} color="#94a3b8" />
                    <Text style={{ fontSize: 13, color: "#94a3b8" }}>now</Text>
                  </View>
                </View>

                {/* MESSAGE */}
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: textSize,
                    lineHeight: 23,
                    color: "#475569",
                  }}
                >
                  {formatMessage(reply.content)}
                </Text>

                {/* ACTIONS */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 9,
                    gap: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      paddingVertical: 3,
                      paddingHorizontal: 9,
                      backgroundColor: "#f1f5f9",
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: "#e2e8f0",
                    }}
                  >
                    <Heart size={10} color="#94a3b8" />
                    <Text style={{ fontSize: 13, fontWeight: "600", color: "#94a3b8" }}>
                      Like
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setActiveReplyId(reply.id)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      paddingVertical: 3,
                      paddingHorizontal: 9,
                      backgroundColor:
                        activeReplyId === reply.id
                          ? colors.primary + "15"
                          : "#f1f5f9",
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor:
                        activeReplyId === reply.id
                          ? colors.primary + "40"
                          : "#e2e8f0",
                    }}
                  >
                    <MessageCircle size={10} color={colors.primary} />
                    <Text style={{ fontSize: 13, fontWeight: "600", color: colors.primary }}>
                      Reply
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* REPLY INPUT */}
                {activeReplyId === reply.id && (
                  <View
                    style={{
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: colors.primary + "30",
                      borderRadius: 12,
                      padding: 10,
                      backgroundColor: "#fff",
                    }}
                  >
                    <TextInput
                      value={replyMessage}
                      onChangeText={setReplyMessage}
                      placeholder="Write a reply..."
                      multiline
                      autoFocus
                      style={{ minHeight: 36, fontSize: 15, color: "#1e293b" }}
                      placeholderTextColor="#94a3b8"
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 8,
                        gap: 8,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setActiveReplyId(null)}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 999,
                          borderWidth: 1,
                          borderColor: "#e2e8f0",
                        }}
                      >
                        <Text style={{ fontSize: 14, color: "#64748b", fontWeight: "600" }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleReply}
                        style={{
                          backgroundColor: colors.primary,
                          paddingHorizontal: 14,
                          paddingVertical: 6,
                          borderRadius: 999,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Send size={12} color="#fff" />
                        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "600" }}>
                          Send
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* CHILDREN — same fixed layout at every depth */}
          {reply.replies?.length > 0 && renderReplies(reply.replies, level + 1)}
        </View>
      </View>
    ));
  };

  return (
    // Neither ScreenLayout's SafeAreaView+fixed-padding nesting nor a plain
    // KeyboardAvoidingView (with "height", or left unset to rely on
    // windowSoftInputMode="adjustResize") reliably cleared the keyboard on
    // physical devices. Tracking the keyboard height directly above and
    // applying it as marginBottom on the composer sidesteps all of that —
    // the composer is simply pushed up by exactly the keyboard's height.
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.light, paddingTop: 18 }}
      edges={["top", "bottom"]}
    >
      <View style={{ flex: 1, backgroundColor: colors.light }}>
        <BackHeader title="Discussion" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {/* QUESTION */}
          {question && (
            <View style={{ marginBottom: 10 }}>
            <MessageItem
  item={question}
  depth={0}
  hideArrow
/>
            </View>
          )}

          {/* SECTION HEADER */}
          <View
            style={{
              marginTop: 6,
              marginBottom: 12,
              marginHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: colors.secondary + "14",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: colors.secondary + "20",
                }}
              >
                <Sparkles size={14} color={colors.secondary} />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.secondary,
                  letterSpacing: 0.1,
                }}
              >
                Community discussion
              </Text>
            </View>

            {/* Answer count badge */}
            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "#dde4f0",
              }}
            >
              <Text
                style={{
                  color: "#5a6a85",
                  fontWeight: "700",
                  fontSize: 14,
                  letterSpacing: 0.2,
                }}
              >
                {answersTree.length} Answers
              </Text>
            </View>
          </View>

          {/* THREADS */}
          {answersTree.map((answer: any, index: number) => (
            <View
              key={answer.id}
              style={{
                marginBottom: 16,
                marginHorizontal: 16,
                backgroundColor: answer.isAccepted ? "#f3fbf3" : "#ffffff",
                borderRadius: 18,
                borderWidth: 1,
                borderColor: answer.isAccepted ? colors.primary + "50" : "#e8edf5",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 4,
                elevation: 1,
                overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <View
                style={{
                  height: 3,
                  backgroundColor: colors.primary,
                  opacity: answer.isAccepted ? 1 : 0.7,
                }}
              />

              <View style={{ padding: 14 }}>

                {/* ── ANSWER NUMBER BADGE ── */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        backgroundColor: colors.primary,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13.5,
                          fontWeight: "800",
                          color: "#fff",
                        }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 13.5,
                        fontWeight: "700",
                        color: colors.primary,
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                        opacity: 0.7,
                      }}
                    >
                      Answer {index + 1}
                    </Text>
                  </View>

                  {/* ACCEPT ANSWER — only the question's own author can accept */}
                  {answer.isAccepted ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 999,
                        backgroundColor: colors.primary + "15",
                      }}
                    >
                      <CheckCircle2 size={13} color={colors.primary} />
                      <Text style={{ fontSize: 13.5, fontWeight: "700", color: colors.primary }}>
                        Accepted
                      </Text>
                    </View>
                  ) : (
                    isQuestionOwner && (
                      <TouchableOpacity
                        disabled={isAccepting}
                        onPress={() => handleAcceptAnswer(answer.id)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 999,
                          borderWidth: 1,
                          borderColor: colors.cardBorder,
                        }}
                      >
                        <CheckCircle2 size={13} color={colors.overlay} />
                        <Text style={{ fontSize: 13.5, fontWeight: "700", color: colors.neutral }}>
                          Accept
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>

                <MessageItem item={answer} depth={1} />

                {/* REPLY BUTTON */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 12,
                    paddingTop: 10,
                    borderTopWidth: 1,
                    borderTopColor: "#f1f5f9",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setActiveReplyId(answer.id)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      paddingVertical: 5,
                      paddingHorizontal: 12,
                      backgroundColor:
                        activeReplyId === answer.id
                          ? colors.primary + "12"
                          : "#f8fafc",
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor:
                        activeReplyId === answer.id
                          ? colors.primary + "35"
                          : "#e2e8f0",
                    }}
                  >
                    <MessageCircle size={12} color={colors.primary} />
                    <Text style={{ fontSize: 14, fontWeight: "700", color: colors.primary }}>
                      Reply
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* ANSWER-LEVEL REPLY INPUT */}
                {activeReplyId === answer.id && (
                  <View
                    style={{
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: colors.primary + "30",
                      borderRadius: 14,
                      padding: 12,
                      backgroundColor: "#fafcff",
                    }}
                  >
                    <TextInput
                      value={replyMessage}
                      onChangeText={setReplyMessage}
                      placeholder="Write a reply..."
                      multiline
                      autoFocus
                      style={{ minHeight: 40, fontSize: 16, color: "#1e293b" }}
                      placeholderTextColor="#94a3b8"
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 8,
                        gap: 8,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setActiveReplyId(null)}
                        style={{
                          paddingHorizontal: 14,
                          paddingVertical: 7,
                          borderRadius: 999,
                          borderWidth: 1,
                          borderColor: "#e2e8f0",
                        }}
                      >
                        <Text style={{ fontSize: 14, color: "#64748b", fontWeight: "600" }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleReply}
                        style={{
                          backgroundColor: colors.primary,
                          paddingHorizontal: 16,
                          paddingVertical: 7,
                          borderRadius: 999,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Send size={13} color="#fff" />
                        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "700" }}>
                          Send
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* NESTED REPLIES */}
                {answer.replies?.length > 0 && (
                  <View style={{ marginTop: 10 }}>
                    {renderReplies(answer.replies)}
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ANSWER INPUT — collapsed behind a small prompt button by default
            (a big always-open composer was bad UX), and hidden entirely
            while a reply input is open so only one composer is active.
            marginBottom pushes it up above the keyboard directly. */}
        <View style={{ marginBottom: keyboardHeight }}>
          {activeReplyId === null &&
            (isAnswering ? (
              <BottomAnswerInput
                input={input}
                setInput={setInput}
                handleAnswer={handleAnswer}
                isPending={isPending}
                onCancel={() => {
                  setIsAnswering(false);
                  setInput("");
                }}
              />
            ) : (
              <AnswerPrompt onPress={() => setIsAnswering(true)} />
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
