import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useRouter } from "expo-router";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  Share2,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useVote } from "../hooks/useQuestion";

function useTimeAgo(date: any) {
  const [time, setTime] = useState("");
  useEffect(() => {
    if (!date) return setTime("");
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) setTime(`${diff}s`);
    else if (diff < 3600) setTime(`${Math.floor(diff / 60)}m`);
    else if (diff < 86400) setTime(`${Math.floor(diff / 3600)}h`);
    else setTime(`${Math.floor(diff / 86400)}d`);
  }, [date]);
  return time;
}

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

function AuthorAvatar({ name }: any) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        // Subtle inner glow via shadow
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <Text
        style={{
          color: colors.light,
          fontWeight: "700",
          fontSize: 13,
          letterSpacing: 0.8,
        }}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}

function VoteColumn({
  votes = 0,
  targetId,
  targetType,
}: {
  votes: number;
  targetId: number;
  targetType: "question" | "answer";
}) {
  const [count, setCount] = useState(votes);
  const [vote, setVote] = useState(0);

  const { mutate: voteApi, isPending } = useVote();

  const handleVote = (value: number) => {
    if (isPending) return;

    let newVote = value;
    let newCount = count;

    if (vote === value) {
      newVote = 0;
      newCount = count - value;
    } else {
      newCount = count + value - vote;
    }

    setVote(newVote);
    setCount(newCount);

    voteApi(
      {
        userId: 2,
        targetId,
        targetType,
        value: newVote,
      },
      {
        onError: () => {
          setVote(vote);
          setCount(count);
        },
      },
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.light,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        overflow: "hidden",
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <Pressable
        onPress={() => handleVote(1)}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,
          backgroundColor: vote === 1 ? colors.primary + "14" : "transparent",
        }}
      >
        <ChevronUp
          size={15}
          color={vote === 1 ? colors.primary : colors.overlay}
          strokeWidth={vote === 1 ? 2.5 : 1.8}
        />
      </Pressable>

      <Text
        style={{
          fontWeight: "700",
          fontSize: 13,
          color:
            vote === 1 ? colors.primary : vote === -1 ? colors.error : "#555",
          minWidth: 18,
          textAlign: "center",
        }}
      >
        {count}
      </Text>

      <Pressable
        onPress={() => handleVote(-1)}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,
          backgroundColor: vote === -1 ? colors.error + "14" : "transparent",
        }}
      >
        <ChevronDown
          size={15}
          color={vote === -1 ? colors.error : colors.overlay}
          strokeWidth={vote === -1 ? 2.5 : 1.8}
        />
      </Pressable>
    </View>
  );
}

/* ─── STAT PILL ─── */
function StatPill({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string | number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: colors.light,
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      {icon}
      <Text style={{ fontSize: 12, fontWeight: "600", color: "#666" }}>
        {value}
      </Text>
    </View>
  );
}

/* ─── ICON PILL ─── */
function IconPill({ children }: any) {
  return (
    <Pressable
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: colors.light,
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      {children}
    </Pressable>
  );
}

export default function MessageItem({ item, depth = 0 }: any) {
  const router = useRouter();
  const time = useTimeAgo(item.createdAt);
  const isQuestion = depth === 0;

  return (
    <View
      style={{
        backgroundColor: colors.light,
        marginHorizontal: 14,
        marginTop: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        overflow: "hidden",
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
      }}
    >
      {/* Top accent stripe for questions */}
      {isQuestion && (
        <View
          style={{
            height: 3,
            backgroundColor: colors.primary,
            opacity: 0.85,
          }}
        />
      )}

      {/* BODY */}
      <Pressable
        activeOpacity={0.82}
        style={{ padding: 16 }}
        onPress={() => {
          if (isQuestion) {
            router.push({
              pathname: ROUTES.Discussion.QuestionScreen,
              params: { id: item.id },
            });
          }
        }}
      >
        {/* HEADER ROW */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          {/* LEFT: Avatar + Name + Time */}
          <View style={{ flexDirection: "row", gap: 11, alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
              <AuthorAvatar name={item.author} />
            </View>

            <View style={{ justifyContent: "center", gap: 2 }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: colors.primary,
                  letterSpacing: 0.1,
                }}
              >
                {item.author}
              </Text>
              {!!time && (
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.overlay,
                    fontWeight: "400",
                  }}
                >
                  {time} ago
                </Text>
              )}
            </View>
          </View>

          {/* QUESTION BADGE */}
          {isQuestion && (
            <View
              style={{
                backgroundColor: colors.primary + "15",
                borderWidth: 1,
                borderColor: colors.primary + "30",
                paddingHorizontal: 11,
                paddingVertical: 4,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: colors.primary,
                  fontWeight: "700",
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}
              >
                Question
              </Text>
            </View>
          )}
        </View>

        {/* TITLE */}
        {isQuestion && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 7,
              lineHeight: 23,

              letterSpacing: 0.1,
            }}
          >
            {item.title || item.excerpt}
          </Text>
        )}

        {/* CONTENT */}
        <Text
          style={{
            fontSize: 13.5,
            lineHeight: 22,
            fontWeight: "400",
            color: colors.neutral,
          }}
          numberOfLines={3}
        >
          {item.content}
        </Text>

        {/* TAGS */}
        {item.tags?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 12,
              gap: 6,
            }}
          >
            {item.tags.map((tag: string) => (
              <View
                key={tag}
                style={{
                  backgroundColor: colors.primary + "12",
                  borderWidth: 1,
                  borderColor: colors.primary + "30",
                  paddingHorizontal: 11,
                  paddingVertical: 5,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.primary,
                    fontWeight: "600",
                    letterSpacing: 0.2,
                  }}
                >
                  #{tag}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>

      {/* FOOTER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 11,
          borderTopWidth: 1,
          borderTopColor: colors.cardBorder,
          backgroundColor: colors.primary + "04",
        }}
      >
        <VoteColumn
          votes={item.votes}
          targetId={Number(item.id)}
          targetType={depth === 0 ? "question" : "answer"}
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <StatPill
            icon={<Eye size={12} color={colors.overlay} strokeWidth={2} />}
            value={item.views || 0}
          />

          <IconPill>
            <Heart size={14} color={colors.overlay} strokeWidth={1.8} />
          </IconPill>

          <IconPill>
            <Share2 size={14} color={colors.overlay} strokeWidth={1.8} />
          </IconPill>
        </View>
      </View>
    </View>
  );
}
