import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SendHorizonal,
  Sparkles,
} from "lucide-react-native";

import { colors } from "@/src/constants/colors";

type Props = {
  input: string;

  setInput: (
    text: string
  ) => void;

  handleAnswer: () => void;

  isPending: boolean;
};

export default function BottomAnswerInput({
  input,
  setInput,
  handleAnswer,
  isPending,
}: Props) {
  const canPost =
    input.trim() &&
    !isPending;

  return (
    <View
      style={{
        backgroundColor:
          colors.light,

        borderTopWidth: 1,

        borderColor:
          colors.overlay +
          "08",

        paddingHorizontal: 14,

        paddingTop: 10,

        paddingBottom: 18,
      }}
    >
      {/* OUTER WRAPPER */}
      <View
        style={{
          backgroundColor:
            colors.light,

          borderRadius: 30,

          borderWidth: 1.3,

          borderColor:
            canPost
              ? colors.primary +
                "25"
              : colors.overlay +
                "08",

          overflow: "hidden",

          shadowColor:
            colors.dark,

          shadowOffset: {
            width: 0,
            height: 8,
          },

          shadowOpacity: 0.05,

          shadowRadius: 14,

          elevation: 3,
        }}
      >
        {/* TOP BAR */}
        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            paddingHorizontal: 16,

            paddingTop: 12,

            paddingBottom: 8,
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
                width: 26,
                height: 26,

                borderRadius: 13,

                alignItems:
                  "center",

                justifyContent:
                  "center",

                backgroundColor:
                  colors.primary +
                  "12",

                marginRight: 8,
              }}
            >
              <Sparkles
                size={13}
                color={
                  colors.primary
                }
                strokeWidth={2.5}
              />
            </View>

            <Text
              style={{
                fontSize: 12,

                color:
                  colors.primary,

                fontWeight:
                  "800",

                letterSpacing: 0.4,
              }}
            >
              WRITE ANSWER
            </Text>
          </View>

        
        </View>

        {/* INPUT ROW */}
        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "flex-end",

            paddingLeft: 16,

            paddingRight: 8,

            paddingBottom: 8,
          }}
        >
          {/* INPUT */}
          <TextInput
            placeholder="Share your thoughts with the community..."
            placeholderTextColor={
              colors.overlay
            }
            value={input}
            onChangeText={setInput}
            multiline
            textAlignVertical="top"
            style={{
              flex: 1,

              minHeight: 54,

              maxHeight: 140,

              paddingTop: 8,

              paddingBottom: 12,

              paddingRight: 12,

              fontSize: 14.5,

              lineHeight: 24,

              color:
                colors.dark,

              fontWeight: "500",
            }}
          />

          {/* SEND BUTTON */}
          <TouchableOpacity
            onPress={
              handleAnswer
            }
            disabled={!canPost}
            activeOpacity={0.88}
            style={{
              width: 52,
              height: 52,

              borderRadius: 26,

              alignItems:
                "center",

              justifyContent:
                "center",

              backgroundColor:
                canPost
                  ? colors.secondary
                  : colors.overlay +
                    "10",

              marginBottom: 2,

              shadowColor:
                canPost
                  ? colors.secondary
                  : "transparent",

              shadowOffset: {
                width: 0,
                height: 6,
              },

              shadowOpacity:
                canPost
                  ? 0.28
                  : 0,

              shadowRadius: 10,

              elevation:
                canPost
                  ? 5
                  : 0,
            }}
          >
            <SendHorizonal
              size={19}
              color={
                canPost
                  ? colors.light
                  : colors.overlay
              }
              strokeWidth={2.6}
            />
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            paddingHorizontal: 16,

            paddingTop: 10,

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
          <Text
            style={{
              fontSize: 11.5,

              color:
                colors.overlay,

              fontWeight:
                "500",
            }}
          >
            Helpful answers get
            more visibility
          </Text>

          {/* STATUS */}
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
                width: 6,
                height: 6,

                borderRadius: 999,

                backgroundColor:
                  canPost
                    ? colors.primary
                    : colors.overlay,

                marginRight: 6,
              }}
            />

            <Text
              style={{
                fontSize: 11,

                fontWeight:
                  "700",

                color:
                  canPost
                    ? colors.primary
                    : colors.overlay,
              }}
            >
              {isPending
                ? "Posting..."
                : canPost
                ? "Ready"
                : "Waiting"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}