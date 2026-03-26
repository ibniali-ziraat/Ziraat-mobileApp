import {
  Pressable,
  Text,
  View,
} from "react-native";

import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { colors } from "@/src/constants/colors";
import { Heart } from "lucide-react-native";

export default function MessageItem({
  item,
  depth,
  replyTo,
  setReplyTo, 
  onLike,
  setInputText,
}) {
  const isActive = replyTo?.id === item.id;

  const [showReplies, setShowReplies] = useState(false);

  const scale = useSharedValue(0);

  const animatedHeart = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  let lastTap = 0;

  const handleDoubleTap = () => {
    const now = Date.now();

    if (now - lastTap < 300) {
      onLike(item.id);

      scale.value = withTiming(1, { duration: 150 }, () => {
        scale.value = withTiming(0);
      });
    }

    lastTap = now;
  };

  return (
    <View style={{ marginBottom: 16 }}>
      
      <View
        style={{
          marginLeft: depth * 10,
          paddingLeft: depth ? 12 : 0,
          borderLeftWidth: depth ? 2 : 0,
          borderLeftColor: colors.cardBorder,
        }}
      >
        <Pressable onPress={handleDoubleTap}>
          
          {/* ❤️ Animated Heart */}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: "35%",
                left: "42%",
                zIndex: 10,
              },
              animatedHeart,
            ]}
          >
            <Heart size={60} color={colors.secondary} fill={colors.secondary} />
          </Animated.View>

          {/* 🔥 CARD */}
          <View
            style={{
              backgroundColor: isActive
                ? colors.primary + "10"
                : depth > 0
                ? colors.bgColor
                : colors.light,

              borderRadius: 16,
              padding: 14,

              borderWidth: 1,
              borderColor: isActive
                ? colors.primary
                : colors.cardBorder,

              marginVertical: 6,

              shadowColor: colors.dark,
              shadowOpacity: 0.04,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            }}
          >
            {/* 🔥 HEADER */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              {/* Avatar */}
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: colors.bgColor,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                }}
              >
                <Text style={{ fontWeight: "700", color: colors.dark }}>
                  {item.author[0]}
                </Text>
              </View>

              {/* Name + subtle role */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: colors.dark,
                    fontSize: 14,
                  }}
                >
                  {item.author}
                </Text>

                {/* optional metadata feel */}
                <Text
                  style={{
                    fontSize: 10,
                    color: colors.darkHover,
                    marginTop: 1,
                  }}
                >
                  {item.role || "Member"}
                </Text>
              </View>

              {/* ACTIVE BADGE */}
              {isActive && (
                <View
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: colors.light,
                      fontSize: 10,
                      fontWeight: "600",
                    }}
                  >
                    Replying
                  </Text>
                </View>
              )}
            </View>

            {/* CONTENT */}
            {renderTextWithMentions(item.content)}

            {/* 🔥 ACTION BAR */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              {/* ❤️ LIKE */}
              <Pressable
                onPress={() => onLike(item.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 20,
                  backgroundColor: item.isLiked
                    ? colors.secondary + "15"
                    : colors.bgColor,
                }}
              >
                <Heart
                  size={16}
                  fill={item.isLiked ? colors.secondary : "transparent"}
                  color={colors.secondary}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 12,
                    fontWeight: "500",
                    color: colors.darkHover,
                  }}
                >
                  {item.likes || 0}
                </Text>
              </Pressable>

              {/* REPLY */}
              <Pressable
                onPress={() => {
                  setReplyTo(item);
                  setShowReplies(true);
                  setInputText?.(`@${item.author} `);
                }}
                style={{
                  marginLeft: 10,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 20,
                  backgroundColor: isActive
                    ? colors.primary + "15"
                    : "transparent",
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  Reply
                </Text>
              </Pressable>
            </View>

            {/* 🔥 VIEW REPLIES */}
            {item.children?.length > 0 && depth === 0 && (
              <Pressable
                onPress={() => setShowReplies(!showReplies)}
                style={{
                  marginTop: 10,
                  paddingTop: 6,
                  borderTopWidth: 1,
                  borderColor: colors.cardBorder,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.darkHover,
                    fontWeight: "500",
                  }}
                >
                  {showReplies
                    ? "Hide replies"
                    : `View ${item.children.length} replies`}
                </Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>

      {/* REPLIES */}
      {showReplies &&
        item.children?.map((child) => (
          <MessageItem
            key={child.id}
            item={child}
            depth={1}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            onLike={onLike}
            setInputText={setInputText}
          />
        ))}
    </View>
  );
}

/* 🔥 MENTIONS */

function renderTextWithMentions(text: string) {
  const parts = text.split(/(@\w+)/g);

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
      {parts.map((part, i) =>
        part.startsWith("@") ? (
          <Text
            key={i}
            style={{
              color: colors.secondary,
              fontWeight: "600",
              backgroundColor: colors.secondary + "15",
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 6,
              marginRight: 4,
              marginBottom: 4,
              fontSize: 13,
            }}
          >
            {part}
          </Text>
        ) : (
          <Text
            key={i}
            style={{
              color: colors.dark,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {part}
          </Text>
        )
      )}
    </View>
  );
}