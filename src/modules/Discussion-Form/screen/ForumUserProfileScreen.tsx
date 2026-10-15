import { useLocalSearchParams } from "expo-router";
import { Award, MessageSquare, ThumbsUp } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import Avatar from "../pages/Avatar";
import MessageItem from "../pages/MessageItem";
import { useForumUser, useQuestions } from "../hooks/useQuestion";

function StatPill({ icon, label, value }: any) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: colors.light,
      }}
    >
      {icon}
      <Text style={{ fontSize: 18, fontWeight: "800", color: colors.dark, marginTop: 6 }}>
        {value ?? 0}
      </Text>
      <Text style={{ fontSize: 13.5, color: colors.overlay, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

export default function ForumUserProfileScreen() {
  const { id } = useLocalSearchParams();
  const userId = Number(id);

  const { data: user, isLoading } = useForumUser(userId);
  const { data: questionsData } = useQuestions({ userId, limit: 20 });

  const name = user?.displayName || user?.fullName || user?.name || "User";

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <BackHeader title="Forum Profile" />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {isLoading ? (
          <Text style={{ textAlign: "center", marginTop: 40, color: colors.overlay }}>
            Loading profile...
          </Text>
        ) : (
          <>
            <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
              <Avatar name={name} size={72} fontSize={26} />
              <Text style={{ fontSize: 18, fontWeight: "800", color: colors.dark, marginTop: 12 }}>
                {name}
              </Text>
              {user?.email && (
                <Text style={{ fontSize: 14, color: colors.overlay, marginTop: 2 }}>
                  {user.email}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 16,
                marginBottom: 20,
              }}
            >
              <StatPill
                icon={<MessageSquare size={18} color={colors.primary} />}
                label="Questions"
                value={user?.questionsCount ?? questionsData?.total}
              />
              <StatPill
                icon={<ThumbsUp size={18} color={colors.secondary} />}
                label="Reputation"
                value={user?.reputation ?? user?.votesReceived}
              />
              <StatPill
                icon={<Award size={18} color={colors.primary} />}
                label="Badges"
                value={
                  (user?.goldBadges ?? 0) +
                  (user?.silverBadges ?? 0) +
                  (user?.bronzeBadges ?? 0)
                }
              />
            </View>

            <View
              style={{
                marginHorizontal: 16,
                marginBottom: 10,
                fontWeight: "700",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", color: colors.dark }}>
                Questions asked
              </Text>
            </View>

            {(questionsData?.questions ?? []).length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 20, color: colors.overlay }}>
                No questions yet
              </Text>
            ) : (
              questionsData!.questions.map((q: any) => (
                <MessageItem
                  key={q.id}
                  depth={0}
                  item={{
                    id: q.id?.toString(),
                    authorId: q.userId ?? q.user?.id ?? userId,
                    author: q.user?.displayName || name,
                    title: q.title,
                    content: q.body,
                    tags: q.tags || q.tagsInput || q.tagNames || q.questionTags || [],
                    createdAt: q.createdAt,
                    votes: q.votes || 0,
                    views: q.views || 0,
                  }}
                />
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
