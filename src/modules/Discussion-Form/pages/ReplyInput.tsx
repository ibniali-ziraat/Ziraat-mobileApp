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
  Sparkles,
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
  const [replyText, setReplyText] =
    useState("");

  const [isOpen, setIsOpen] =
    useState(false);

  const [isFocused, setIsFocused] =
    useState(false);

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  const scaleAnim = useRef(
    new Animated.Value(0.96)
  ).current;

  const {
    mutate: createCommentApi,
    isPending,
  } = useCreateComment();

  const openInput = () => {
    setIsOpen(true);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
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
        duration: 180,
        useNativeDriver: true,
      }),

      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setReplyText("");
      setIsOpen(false);
    });
  };

  const handleSubmitReply = () => {
    if (
      !replyText.trim() ||
      isPending
    )
      return;

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

          scaleAnim.setValue(0.96);
        },
      }
    );
  };

  const canSend =
    replyText.trim() &&
    !isPending;

  return (
    <View
      style={{
        marginTop: 8,
      }}
    >
      {!isOpen ? (
        /* REPLY BUTTON */
        <TouchableOpacity
          onPress={openInput}
          activeOpacity={0.82}
          style={{
            alignSelf: "flex-start",

            flexDirection: "row",

            alignItems: "center",

            paddingVertical: 9,

            paddingHorizontal: 16,

            borderRadius: 999,

            backgroundColor:
              colors.light,

            borderWidth: 1,

            borderColor:
              colors.primary +
              "12",

            shadowColor:
              colors.dark,

            shadowOffset: {
              width: 0,
              height: 4,
            },

            shadowOpacity: 0.04,

            shadowRadius: 10,

            elevation: 2,
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,

              borderRadius: 999,

              alignItems:
                "center",

              justifyContent:
                "center",

              backgroundColor:
                colors.primary +
                "10",

              marginRight: 8,
            }}
          >
            <CornerDownRight
              size={12}
              color={
                colors.primary
              }
              strokeWidth={2.7}
            />
          </View>

          <Text
            style={{
              fontSize: 12.5,

              fontWeight: "800",

              color:
                colors.primary,

              letterSpacing: 0.3,
            }}
          >
            Reply
          </Text>
        </TouchableOpacity>
      ) : (
        /* COMPOSER */
        <Animated.View
          style={{
            opacity: fadeAnim,

            transform: [
              {
                translateY:
                  fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
              },

              {
                scale: scaleAnim,
              },
            ],

            marginTop: 12,

            borderRadius: 30,

            backgroundColor:
              colors.light,

            borderWidth: 1.2,

            borderColor: isFocused
              ? colors.primary +
                "30"
              : colors.overlay +
                "08",

            overflow: "hidden",

            shadowColor:
              colors.dark,

            shadowOffset: {
              width: 0,
              height: 10,
            },

            shadowOpacity: isFocused
              ? 0.08
              : 0.04,

            shadowRadius: 18,

            elevation: isFocused
              ? 6
              : 2,
          }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              justifyContent:
                "space-between",

              paddingHorizontal: 16,

              paddingTop: 14,

              paddingBottom: 10,
            }}
          >
            {/* LEFT */}
            <View
              style={{
                flexDirection: "row",

                alignItems:
                  "center",
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,

                  borderRadius: 999,

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  backgroundColor:
                    colors.primary +
                    "10",

                  marginRight: 10,
                }}
              >
                <Sparkles
                  size={14}
                  color={
                    colors.primary
                  }
                  strokeWidth={2.5}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 12,

                    fontWeight:
                      "800",

                    color:
                      colors.primary,

                    letterSpacing: 0.6,
                  }}
                >
                  {parentCommentId
                    ? "REPLYING"
                    : "NEW REPLY"}
                </Text>

                <Text
                  style={{
                    marginTop: 2,

                    fontSize: 11,

                    color:
                      colors.overlay,

                    fontWeight:
                      "500",
                  }}
                >
                  Join the
                  discussion
                </Text>
              </View>
            </View>

            {/* CLOSE */}
            <TouchableOpacity
              onPress={closeInput}
              activeOpacity={0.8}
              style={{
                width: 32,
                height: 32,

                borderRadius: 999,

                alignItems:
                  "center",

                justifyContent:
                  "center",

                backgroundColor:
                  colors.bgColor,

                borderWidth: 1,

                borderColor:
                  colors.overlay +
                  "08",
              }}
            >
              <X
                size={15}
                color={
                  colors.dark
                }
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          </View>

          {/* INPUT */}
          <TextInput
            placeholder="Write your reply..."
            placeholderTextColor={
              colors.overlay
            }
            value={replyText}
            onChangeText={setReplyText}
            multiline
            autoFocus
            onFocus={() =>
              setIsFocused(true)
            }
            onBlur={() =>
              setIsFocused(false)
            }
            textAlignVertical="top"
            style={{
              paddingHorizontal: 18,

              paddingTop: 6,

              paddingBottom: 18,

              minHeight: 90,

              maxHeight: 150,

              fontSize: 14.5,

              lineHeight: 24,

              color:
                colors.dark,

              fontWeight: "500",
            }}
          />

          {/* FOOTER */}
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              justifyContent:
                "space-between",

              paddingHorizontal: 14,

              paddingTop: 12,

              paddingBottom: 14,

              borderTopWidth: 1,

              borderTopColor:
                colors.overlay +
                "06",

              backgroundColor:
                colors.bgColor,
            }}
          >
            {/* LEFT */}
            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",
              }}
            >
              <View
                style={{
                  width: 7,
                  height: 7,

                  borderRadius: 999,

                  backgroundColor:
                    canSend
                      ? colors.primary
                      : colors.overlay,

                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontSize: 11.5,

                  color:
                    canSend
                      ? colors.primary
                      : colors.overlay,

                  fontWeight:
                    "700",
                }}
              >
                {isPending
                  ? "Sending..."
                  : canSend
                  ? "Ready to send"
                  : "Waiting"}
              </Text>
            </View>

            {/* RIGHT */}
            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",
              }}
            >
              {!!replyText.length && (
                <View
                  style={{
                    paddingHorizontal: 10,

                    paddingVertical: 5,

                    borderRadius: 999,

                    backgroundColor:
                      colors.primary +
                      "10",

                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,

                      fontWeight:
                        "800",

                      color:
                        colors.primary,
                    }}
                  >
                    {
                      replyText.length
                    }
                  </Text>
                </View>
              )}

              {/* SEND */}
              <TouchableOpacity
                onPress={
                  handleSubmitReply
                }
                disabled={!canSend}
                activeOpacity={0.88}
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  paddingVertical: 11,

                  paddingHorizontal: 18,

                  borderRadius: 999,

                  backgroundColor:
                    canSend
                      ? colors.secondary
                      : colors.overlay +
                        "10",

                  shadowColor:
                    canSend
                      ? colors.secondary
                      : "transparent",

                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },

                  shadowOpacity:
                    canSend
                      ? 0.24
                      : 0,

                  shadowRadius: 10,

                  elevation:
                    canSend
                      ? 4
                      : 0,
                }}
              >
                <SendHorizonal
                  size={14}
                  color={
                    canSend
                      ? colors.light
                      : colors.overlay
                  }
                  strokeWidth={2.6}
                />

                <Text
                  style={{
                    marginLeft: 7,

                    fontSize: 12.5,

                    fontWeight:
                      "800",

                    color:
                      canSend
                        ? colors.light
                        : colors.overlay,

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