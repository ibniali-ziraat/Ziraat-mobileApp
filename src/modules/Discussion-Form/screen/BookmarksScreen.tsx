import { Bookmark } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import MessageItem from "../pages/MessageItem";
import { useBookmarks } from "../hooks/useQuestion";

export default function BookmarksScreen() {
  const { userId } = useAuth();
  const { data, isLoading } = useBookmarks(Number(userId));

  const bookmarks: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.bookmarks)
      ? data.bookmarks
      : [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <BackHeader title="Saved Questions" />

      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingTop: 6 }}>
        {isLoading ? (
          <Text style={{ textAlign: "center", marginTop: 40, color: colors.overlay }}>
            Loading bookmarks...
          </Text>
        ) : bookmarks.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Bookmark size={40} color={colors.secondary} />
            <Text style={{ marginTop: 10, fontWeight: "700", fontSize: 17 }}>
              No saved questions
            </Text>
            <Text style={{ marginTop: 4, color: colors.neutral }}>
              Tap the bookmark icon on a question to save it here.
            </Text>
          </View>
        ) : (
          bookmarks.map((b: any) => {
            const q = b.question || b;
            return (
              <MessageItem
                key={b.id ?? q.id}
                depth={0}
                item={{
                  id: (q.id ?? b.questionId)?.toString(),
                  authorId: q.userId ?? q.user?.id,
                  author: q.user?.displayName || q.author || "Unknown",
                  title: q.title,
                  content: q.body || q.content,
                  tags: q.tags || q.tagsInput || q.tagNames || q.questionTags || [],
                  createdAt: q.createdAt,
                  votes: q.votes || 0,
                  views: q.views || 0,
                }}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
