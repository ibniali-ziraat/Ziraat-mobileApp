// components/discussion/DiscussionSection.tsx

import { colors } from "@/src/constants/colors";
import { MessageCircle, Sparkles } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import DiscussionInput from "./DiscussionInput";
import DiscussionItem from "./DiscussionItem";

export default function DiscussionSection() {
  const discussions = [
    {
      id: "1",
      name: "Expert",
      isExpert: true,
      online: true,
      message: "Please upload your GST certificate here.",
      time: "2m",
      likes: 3,
      replies: [
        {
          id: "r1",
          name: "You",
          message: "PDF or image?",
          time: "1m",
        },
      ],
    },
    {
      id: "2",
      name: "You",
      message: "Got it, thanks!",
      time: "Just now",
      likes: 1,
    },
    {
      id: "3",
      name: "Expert",
     
      online: true,
      message: "Please upload your GST certificate here.",
      time: "2m",
      likes: 3,
    },
    {
      id: "2",
      name: "You",
      message: "Got it, thanks!",
      time: "Just now",
      likes: 1,
    },
    {
      id: "3",
      name: "Expert",
  
      online: true,
      message: "Please upload your GST certificate here.",
      time: "2m",
      likes: 3,
    },
     {
      id: "1",
      name: "Expert",
     
      online: true,
      message: "Please upload your GST certificate here.",
      time: "2m",
      likes: 3,
      replies: [
        {
          id: "r1",
          name: "You",
          message: "PDF or image?",
          time: "1m",
        },
      ],
    },
     {
      id: "1",
      name: "Expert",
     
      online: true,
      message: "Please upload your GST certificate here.",
      time: "2m",
      likes: 3,
      replies: [
        {
          id: "r1",
          name: "You",
          message: "PDF or image?",
          time: "1m",
        },
      ],
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgColor,
      }}
    >
      {/* 🔹 HEADER */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderColor: colors.cardBorder,
          backgroundColor: colors.light,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: colors.bgColor,
                padding: 8,
                borderRadius: 12,
              }}
            >
              <MessageCircle size={18} color={colors.primary} />
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  color: colors.dark,
                }}
              >
                Discussion
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: colors.darkHover,
                  marginTop: 2,
                }}
              >
                Chat with experts in real-time
              </Text>
            </View>
          </View>

          <Sparkles size={16} color={colors.primary} />
        </View>
      </View>

      {/*  CHAT AREA */}
      <View style={{ flex: 1 }}>

        {/*  INFO BANNER */}
        <View
          style={{
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 6,
            backgroundColor: colors.light,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.cardBorder,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: colors.darkHover,
            }}
          >
            You are connected with a verified expert
          </Text>
        </View>

        {/*  MESSAGES */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 6,
            paddingBottom: 12,
          }}
          showsVerticalScrollIndicator={false}
        >
          {discussions.map((item) => (
            <DiscussionItem key={item.id} item={item} />
          ))}
        </ScrollView>

        {/*  INPUT WRAPPER */}
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 8,
            paddingBottom: 10,
            backgroundColor: colors.light,

            //  top border + subtle shadow
            borderTopWidth: 1,
            borderColor: colors.cardBorder,
            shadowColor: colors.dark,
            shadowOpacity: 0.05,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          <DiscussionInput />
        </View>

      </View>
    </View>
  );
}