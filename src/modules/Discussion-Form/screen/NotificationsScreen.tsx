import { useRouter } from "expo-router";
import { Bell, CheckCheck, MessageCircle } from "lucide-react-native";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  useForumNotifications,
  useMarkForumNotificationRead,
} from "../hooks/useQuestion";

function timeAgo(date: any) {
  if (!date) return "";
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const { userId } = useAuth();

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
  } = useForumNotifications(Number(userId));
  const { mutate: markRead } = useMarkForumNotificationRead();

  const list: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.notifications)
      ? data.notifications
      : [];

  const handlePress = (notif: any) => {
    if (!notif.isRead && !notif.read) {
      markRead(notif.id);
    }
    const questionId = notif.questionId ?? notif.question?.id;
    if (questionId) {
      router.push({
        pathname: ROUTES.Discussion.QuestionScreen,
        params: { id: questionId },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <BackHeader title="Notifications" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {isLoading ? (
          <Text style={{ textAlign: "center", marginTop: 40, color: colors.overlay }}>
            Loading notifications...
          </Text>
        ) : list.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Bell size={40} color={colors.secondary} />
            <Text style={{ marginTop: 10, fontWeight: "700", fontSize: 16 }}>
              No notifications yet
            </Text>
            <Text style={{ marginTop: 4, color: colors.neutral }}>
              Replies, votes and accepted answers will show up here.
            </Text>
          </View>
        ) : (
          list.map((notif: any) => {
            const isRead = notif.isRead ?? notif.read ?? false;
            return (
              <TouchableOpacity
                key={notif.id}
                onPress={() => handlePress(notif)}
                style={{
                  flexDirection: "row",
                  gap: 12,
                  marginHorizontal: 14,
                  marginTop: 10,
                  padding: 14,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                  backgroundColor: isRead ? colors.light : colors.primary + "0a",
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: colors.primary + "15",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MessageCircle size={16} color={colors.primary} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, color: colors.dark, lineHeight: 19 }}>
                    {notif.body || notif.message || notif.title || "New activity"}
                  </Text>
                  <Text style={{ fontSize: 11, color: colors.overlay, marginTop: 4 }}>
                    {timeAgo(notif.createdOn || notif.createdAt)}
                  </Text>
                </View>

                {!isRead && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: colors.secondary,
                      marginTop: 4,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })
        )}

        {list.some((n: any) => !(n.isRead ?? n.read)) && (
          <TouchableOpacity
            onPress={() => list.forEach((n: any) => !( n.isRead ?? n.read) && markRead(n.id))}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginTop: 16,
              marginHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            <CheckCheck size={14} color={colors.primary} />
            <Text style={{ fontSize: 12, fontWeight: "600", color: colors.primary }}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
