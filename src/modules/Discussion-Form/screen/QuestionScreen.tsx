import BackHeader from "@/src/components/shared/BackHeader";
import { useLocalSearchParams } from "expo-router";
import { ArrowUp, MessageSquare } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MessageItem from "../pages/MessageItem";


const CURRENT_USER = {
  name: "Amir Khan",
  username: "@amir.khan",
  initials: "AK",
};

export default function QuestionScreen() {
  const { data } = useLocalSearchParams();
  const question = JSON.parse(data as string);

  const [answers, setAnswers] = useState(question.children || []);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleReply = () => {
    if (!input.trim()) return;

    const newAnswer = {
      id: Date.now().toString(),
      author: CURRENT_USER.name,
      content: input,
      votes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    setAnswers([newAnswer, ...answers]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <BackHeader title="Discussion" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* QUESTION CARD */}
        <View style={styles.questionWrapper}>
          <View style={styles.questionBadgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>QUESTION</Text>
            </View>
          </View>
          <MessageItem item={question} depth={0} />
        </View>

        {/* ANSWERS SECTION HEADER */}
        {answers.length > 0 && (
          <View style={styles.answersHeader}>
            <View style={styles.answersDividerLine} />
            <Text style={styles.answersLabel}>
              {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
            </Text>
            <View style={styles.answersDividerLine} />
          </View>
        )}

        {/* ANSWERS */}
        {answers.map((a: any, index: number) => (
          <View
            key={a.id}
            style={[
              styles.answerWrapper,
              index === 0 && styles.answerWrapperFirst,
            ]}
          >
            <View style={styles.answerAccent} />
            <View style={styles.answerContent}>
              <MessageItem item={a} depth={1} />
            </View>
          </View>
        ))}

        {answers.length === 0 && (
          <View style={styles.emptyState}>
          <MessageSquare size={40} color="#999" />
            <Text style={styles.emptyTitle}>No answers yet</Text>
            <Text style={styles.emptySubtitle}>
              Be the first to share your thoughts
            </Text>
          </View>
        )}
      </ScrollView>

      {/* INPUT BOX */}
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>

        {/* REPLYING AS banner */}
        <View style={styles.replyingAsRow}>
          <Text style={styles.replyingAsLabel}>Replying as</Text>
          <View style={styles.replyingAsChip}>
            <View style={styles.replyingAsDot} />
            <Text style={styles.replyingAsName}>{CURRENT_USER.name}</Text>
            <Text style={styles.replyingAsUsername}>{CURRENT_USER.username}</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarSmallText}>{CURRENT_USER.initials}</Text>
          </View>
          <TextInput
            placeholder="Share your answer..."
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.textInput}
            multiline
            maxLength={1000}
          />
        </View>

        <View style={styles.inputFooter}>
          <Text style={styles.charCount}>{input.length}/1000</Text>
          <TouchableOpacity
            onPress={handleReply}
            disabled={!input.trim()}
            style={[
              styles.postButton,
              !input.trim() && styles.postButtonDisabled,
            ]}
            activeOpacity={0.85}
          >
            <Text style={styles.postButtonText}>Post Answer</Text>
         <ArrowUp size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const BRAND_GREEN = "#2d6b06";
const BRAND_GREEN_LIGHT = "#e8f3e1";
const BRAND_GREEN_MID = "#4a9e0f";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8f5",
  },
  scrollContent: {
    paddingBottom: 160,
    paddingTop: 8,
  },

  // Question
  questionWrapper: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    shadowColor: "#2d6b06",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e8f0e0",
  },
  questionBadgeRow: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: BRAND_GREEN_LIGHT,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#c8e0b8",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: BRAND_GREEN,
    letterSpacing: 1.2,
  },

  // Answers header
  answersHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
    gap: 10,
  },
  answersDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#dde8d6",
  },
  answersLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: BRAND_GREEN,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  // Answer cards
  answerWrapper: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: "#fff",
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  answerWrapperFirst: {
    borderColor: "#d4eac4",
    shadowColor: BRAND_GREEN,
    shadowOpacity: 0.07,
  },
  answerAccent: {
    width: 4,
    backgroundColor: BRAND_GREEN_MID,
    opacity: 0.5,
  },
  answerContent: {
    flex: 1,
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },

  // Replying as
  replyingAsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  replyingAsLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  replyingAsChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: BRAND_GREEN_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#c8e0b8",
  },
  replyingAsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BRAND_GREEN,
  },
  replyingAsName: {
    fontSize: 12,
    fontWeight: "700",
    color: BRAND_GREEN,
  },
  replyingAsUsername: {
    fontSize: 11,
    color: "#7aab50",
    fontWeight: "400",
  },

  // Input
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e8e8e8",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  inputContainerFocused: {
    borderColor: "#c8e0b8",
    shadowColor: BRAND_GREEN,
    shadowOpacity: 0.1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginBottom: 10,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  avatarSmallText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  textInput: {
    flex: 1,
    minHeight: 42,
    maxHeight: 110,
    backgroundColor: "#f5f8f2",
    borderWidth: 1.5,
    borderColor: "#dde8d6",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 11,
    paddingBottom: 11,
    fontSize: 15,
    color: "#222",
    lineHeight: 21,
  },
  inputFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 42,
  },
  charCount: {
    fontSize: 11,
    color: "#bbb",
    fontWeight: "500",
  },
  postButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRAND_GREEN,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 10,
    gap: 6,
    shadowColor: BRAND_GREEN,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  postButtonDisabled: {
    backgroundColor: "#c5d4be",
    shadowOpacity: 0,
    elevation: 0,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  postButtonIcon: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 18,
  },
});