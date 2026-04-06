import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useRouter } from "expo-router";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DiscussionInput from "./DiscussionInput";
import MessageRenderer from "./MessageRenderer";

/* ─── TIME ─── */
function useTimeAgo(date: any) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) setTime(`${diff}s ago`);
    else if (diff < 3600) setTime(`${Math.floor(diff / 60)}m ago`);
    else if (diff < 86400) setTime(`${Math.floor(diff / 3600)}h ago`);
    else setTime(`${Math.floor(diff / 86400)}d ago`);
  }, []);

  return time;
}

/* ─── AVATAR ─── */
function getInitials(name: string) {
  return (
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
}

function AuthorAvatar({ name, size = 30 }: any) {
  const palette = ["#b45309",];
  const idx = name ? name.charCodeAt(0) % palette.length : 0;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: palette[idx],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700" }}>
        {getInitials(name)}
      </Text>
    </View>
  );
}

/* ─── VOTE ─── */
function VoteColumn({ votes = 0 }: any) {
  const [count, setCount] = useState(votes);
  const [vote, setVote] = useState(0);

  return (
    <View style={{ alignItems: "center", width: 42 }}>
      <TouchableOpacity
        onPress={() => {
          setVote(1);
          setCount(count + 1);
        }}
      >
        <ChevronUp size={20} color={vote === 1 ? colors.primary : "#bbb"} />
      </TouchableOpacity>

      <Text style={{ fontWeight: "800", marginVertical: 4 }}>
        {count}
      </Text>

      <TouchableOpacity
        onPress={() => {
          setVote(-1);
          setCount(count - 1);
        }}
      >
        <ChevronDown size={20} color={vote === -1 ? colors.error : "#bbb"} />
      </TouchableOpacity>
    </View>
  );
}

/* ─── MAIN ─── */
export default function MessageItem({ item, depth = 0 }: any) {
  const router = useRouter();
  const time = useTimeAgo(item.createdAt);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes ?? 0);

  const [showReply, setShowReply] = useState(false);
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const handleLike = (e: any) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    console.log("Reply:", text);
    setMessage("");
    setShowReply(false);
  };

  const isQuestion = depth === 0;

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => {
        if (isQuestion) {
          router.push({
            pathname: ROUTES.Discussion.QuestionScreen,
            params: { data: JSON.stringify(item) },
          });
        }
      }}
    >
      <View
        style={{
          backgroundColor: colors.light,
          borderBottomWidth: 1,
          borderColor: colors.cardBorder,
        }}
      >
        {/* HEADER */}
        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <AuthorAvatar name={item.author} />

            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: colors.neutral,
                }}
              >
                {item.author || "Unknown"}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Clock size={11} color="#777" />
                <Text style={{ fontSize: 11, color: "#777" }}>
                  asked {time}
                </Text>
              </View>
            </View>
          </View>

          {/* TITLE */}
          {isQuestion && (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "800",
                color: colors.neutral,
                lineHeight: 22,
              }}
            >
              {item.excerpt || item.title || item.content?.slice(0, 90)}
            </Text>
          )}

          {/* CONTENT */}
          <View style={{ marginTop: 6 }}>
            {isQuestion ? (
              <Text style={{ color: "#555", fontSize: 14, lineHeight: 20 }}>
                {item.content?.slice(0, 140)}...
              </Text>
            ) : (
              <MessageRenderer text={item.content} />
            )}
          </View>

          {/* STATS (only for question) */}
          {isQuestion && (
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Eye size={12} color="#777" />
                <Text style={{ fontSize: 11, color: "#777" }}>
                  {item.views || 0}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <MessageSquare size={12} color="#777" />
                <Text style={{ fontSize: 11, color: "#777" }}>
                  {item.children?.length || 0}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* BODY (for BOTH) */}
        <View style={{ flexDirection: "row", padding: 16 }}>
          <VoteColumn votes={item.votes} />

          <View style={{ flex: 1 }}>
            {/* ACTIONS */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {/* REPLY */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  setShowReply((prev) => !prev);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: colors.primary,
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  borderRadius: 8,
                }}
              >
                <MessageSquare size={14} color={colors.light} />
                <Text style={{ color: colors.light, marginLeft: 6 }}>
                  Reply
                </Text>
              </TouchableOpacity>

              {/* LIKE */}
              <TouchableOpacity
                onPress={handleLike}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: liked ? colors.error : colors.cardBorder,
                  backgroundColor: liked
                    ? colors.error + "15"
                    : colors.light,
                }}
              >
                <Heart
                  size={14}
                  color={liked ? colors.error : "#777"}
                  fill={liked ? colors.error : "transparent"}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: liked ? colors.error : "#777",
                    fontWeight: "600",
                  }}
                >
                  {likes}
                </Text>
              </TouchableOpacity>

              {/* SHARE */}
              <TouchableOpacity style={{ padding: 8 }}>
                <Share2 size={14} color="#777" />
              </TouchableOpacity>
            </View>

            {/* INLINE REPLY */}
            {showReply && (
              <View
                style={{
                  marginTop: 12,
                  borderTopWidth: 1,
                  borderColor: colors.cardBorder,
                  paddingTop: 10,
                }}
              >
                <DiscussionInput
                  message={message}
                  setMessage={setMessage}
                  replyTo={replyTo}
                  setReplyTo={setReplyTo}
                  onSend={handleSend}
                  inputText={inputText}
                  setInputText={setInputText}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}