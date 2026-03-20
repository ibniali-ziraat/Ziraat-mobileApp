
import { colors } from "@/src/constants/colors";
import { Heart, MessageCircle } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function DiscussionItem({ item }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>

   
        <View style={{ position: "relative" }}>
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: colors.light,
                fontWeight: "600",
              }}
            >
              {item.name[0]}
            </Text>
          </View>

          {/*  Online */}
          {item.online && (
            <View
              style={{
                position: "absolute",
                bottom: 1,
                right: 1,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#22c55e",
                borderWidth: 2,
                borderColor: colors.light,
              }}
            />
          )}
        </View>

        {/* 🔹 Content */}
        <View style={{ marginLeft: 10, flex: 1 }}>

          {/* 💬 Bubble */}
          <View
            style={{
              backgroundColor: colors.bgColor,
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: 16,

              // subtle depth
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            {/* Name + Badge */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.dark,
                  fontSize: 13,
                }}
              >
                {item.name}
              </Text>

              {item.isExpert && (
                <View
                  style={{
                    marginLeft: 6,
                    backgroundColor: colors.primary,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      color: colors.light,
                      fontWeight: "600",
                    }}
                  >
                    EXPERT
                  </Text>
                </View>
              )}
            </View>

            {/* Message */}
            <Text
              style={{
                color: colors.neutral,
                marginTop: 4,
                lineHeight: 18,
                fontSize: 13,
              }}
            >
              {item.message}
            </Text>
          </View>

          {/* 🔹 Actions Row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: colors.darkHover,
              }}
            >
              {item.time}
            </Text>

            {/* Like */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 14,
              }}
            >
              <Heart size={14} color={colors.darkHover} />
              <Text
                style={{
                  marginLeft: 4,
                  fontSize: 11,
                  color: colors.darkHover,
                }}
              >
                {item.likes}
              </Text>
            </TouchableOpacity>

            {/* Reply */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 14,
              }}
            >
              <MessageCircle size={14} color={colors.darkHover} />
              <Text
                style={{
                  marginLeft: 4,
                  fontSize: 11,
                  color: colors.darkHover,
                }}
              >
                Reply
              </Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 Replies (Threaded) */}
          {item.replies?.map((reply) => (
            <View
              key={reply.id}
              style={{
                marginTop: 12,
                marginLeft: 16,
                paddingLeft: 10,
                borderLeftWidth: 2,
                borderColor: colors.cardBorder,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 12,
                  color: colors.dark,
                }}
              >
                {reply.name}
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: colors.neutral,
                  marginTop: 2,
                }}
              >
                {reply.message}
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  color: colors.darkHover,
                  marginTop: 2,
                }}
              >
                {reply.time}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}