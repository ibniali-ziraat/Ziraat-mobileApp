
import { useRef, useState } from "react";

import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  CornerDownRight,
  SendHorizonal,
  X,
} from "lucide-react-native";

import { colors } from "@/src/constants/colors";

import { useCreateComment } from "../hooks/useQuestion";

type ReplyInputProps = {
  answerId: number;
  parentCommentId?: number;
};

export default function ReplyInput({
  answerId,
  parentCommentId,
}: ReplyInputProps) {
  const [replyText, setReplyText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.97)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  const { mutate: createCommentApi, isPending } = useCreateComment();

  const openInput = () => {
    setIsOpen(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeInput = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setReplyText("");
      setIsOpen(false);
    });
  };

  const handleSubmitReply = () => {
    if (!replyText.trim() || isPending) return;

    createCommentApi(
      {
        body: parentCommentId
          ? `@reply-${parentCommentId} ${replyText}`
          : replyText,
        userId: 2,
        answerId,
      },
      {
        onSuccess: () => {
          setReplyText("");
          setIsOpen(false);
          fadeAnim.setValue(0);
          scaleAnim.setValue(0.97);
        },
      }
    );
  };

  const canSend = replyText.trim() && !isPending;

  return (
    <View style={{ marginTop: 6 }}>
      {!isOpen ? (
        /* ── REPLY TRIGGER BUTTON ── */
        <TouchableOpacity
          onPress={openInput}
          activeOpacity={0.75}
          style={{
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          
              paddingVertical: 5,
            borderRadius: 999,
            backgroundColor: colors.primary + "0D",
            borderWidth: 1,
            borderColor: colors.primary + "20",
          }}
        >
          <CornerDownRight
            size={11}
            color={colors.primary}
            strokeWidth={2.8}
          />
          <Text
            style={{
              fontSize: 11.5,
              fontWeight: "700",
              color: colors.primary,
              letterSpacing: 0.2,
            }}
          >
            Reply
          </Text>
        </TouchableOpacity>
      ) : (
        /* ── COMPOSER (expands below the action row) ── */
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, 0],
                }),
              },
              { scale: scaleAnim },
            ],
            marginTop: 10,
            borderRadius: 18,
            backgroundColor: colors.light,
            borderWidth: 1.2,
            borderColor: isFocused
              ? colors.primary + "35"
              : colors.overlay + "14",
            overflow: "hidden",
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isFocused ? 0.08 : 0.03,
            shadowRadius: 12,
            elevation: 2,
          }}
        >
          {/* ── TOP BAR ── */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 14,
              paddingTop: 11,
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderBottomColor: colors.overlay + "08",
            }}
          >
            {/* Label */}
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
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.primary + "12",
                }}
              >
                <CornerDownRight
                  size={11}
                  color={colors.primary}
                  strokeWidth={2.7}
                />
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "800",
                  color: colors.primary,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                {parentCommentId ? "Replying" : "New Reply"}
              </Text>
            </View>

            {/* Close */}
            <TouchableOpacity
              onPress={closeInput}
              activeOpacity={0.75}
              style={{
                width: 26,
                height: 26,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.bgColor,
                borderWidth: 1,
                borderColor: colors.overlay + "12",
              }}
            >
              <X size={13} color={colors.dark} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {/* ── TEXT INPUT ── */}
          <TextInput
            placeholder="Write your reply…"
            placeholderTextColor={colors.overlay}
            value={replyText}
            onChangeText={setReplyText}
            multiline
            autoFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            textAlignVertical="top"
            style={{
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 12,
              minHeight: 78,
              maxHeight: 130,
              fontSize: 14,
              lineHeight: 23,
              color: colors.dark,
              fontWeight: "500",
            }}
          />

          {/* ── FOOTER ── */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderTopWidth: 1,
              borderTopColor: colors.overlay + "07",
              backgroundColor: colors.bgColor,
            }}
          >
            {/* Status pill */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingHorizontal: 9,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: canSend
                  ? colors.primary + "0D"
                  : colors.overlay + "08",
              }}
            >
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  backgroundColor: canSend ? colors.primary : colors.overlay,
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: canSend ? colors.primary : colors.overlay,
                  letterSpacing: 0.1,
                }}
              >
                {isPending ? "Sending…" : canSend ? "Ready" : "Waiting"}
              </Text>
            </View>

            {/* Right side: char count + send */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              {replyText.length > 0 && (
                <Text
                  style={{
                    fontSize: 10.5,
                    fontWeight: "700",
                    color: colors.overlay,
                  }}
                >
                  {replyText.length}
                </Text>
              )}

              <TouchableOpacity
                onPress={handleSubmitReply}
                disabled={!canSend}
                activeOpacity={0.85}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingVertical: 9,
                  paddingHorizontal: 16,
                  borderRadius: 999,
                  backgroundColor: canSend
                    ? colors.secondary
                    : colors.overlay + "10",
                  shadowColor: canSend ? colors.secondary : "transparent",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: canSend ? 0.22 : 0,
                  shadowRadius: 8,
                  elevation: canSend ? 3 : 0,
                }}
              >
                <SendHorizonal
                  size={13}
                  color={canSend ? colors.light : colors.overlay}
                  strokeWidth={2.6}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "800",
                    color: canSend ? colors.light : colors.overlay,
                    letterSpacing: 0.3,
                  }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}