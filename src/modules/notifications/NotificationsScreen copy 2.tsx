import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useNotification } from "@/src/contexts/NotificationContext";
import { useLocationWatcher } from "@/src/hooks/useLocationWatcher";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { Bell, MapPin, Trash2 } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRegisterDeviceToken } from "./hooks/notification.hooks";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DELETE_THRESHOLD = -72;
const SWIPE_FULL = -SCREEN_WIDTH;

interface StoredNotification {
  id: string;
  title: string;
  body?: string;
  imageUrl?: string;
  receivedAt: number;
}

function getNotificationImage(
  notification: FirebaseMessagingTypes.RemoteMessage,
): string | undefined {
  const data = notification?.data as Record<string, any> | undefined;
  if (data?._richContent?.image) return data._richContent.image;
  return (
    (notification as any)?.notification?.android?.imageUrl ??
    (notification as any)?.notification?.apple?.imageUrl
  );
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function SwipeableRow({
  item,
  onDelete,
}: {
  item: StoredNotification;
  onDelete: (id: string) => void;
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const rowScale = useRef(new Animated.Value(1)).current;
  const deleteOpacity = useRef(new Animated.Value(0)).current;
  let startX = 0;

  const onTouchStart = (e: any) => (startX = e.nativeEvent.pageX);

  const onTouchMove = (e: any) => {
    const dx = e.nativeEvent.pageX - startX;
    if (dx > 0) return;
    translateX.setValue(Math.max(dx, -100));
    deleteOpacity.setValue(Math.min(1, Math.abs(dx) / 72));
  };

  const onTouchEnd = (e: any) => {
    const dx = e.nativeEvent.pageX - startX;
    if (dx < DELETE_THRESHOLD) {
      Animated.spring(translateX, {
        toValue: -80,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(deleteOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }
  };

  const confirmDelete = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: SWIPE_FULL,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(rowScale, {
        toValue: 0,
        duration: 260,
        delay: 160,
        useNativeDriver: false,
      }),
    ]).start(() => onDelete(item.id));
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            scaleY: rowScale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
        overflow: "hidden",
      }}
    >
      <View style={styles.rowWrap}>
        <Animated.View style={[styles.deleteBack, { opacity: deleteOpacity }]}>
          <TouchableOpacity
            style={styles.deleteAction}
            onPress={confirmDelete}
            activeOpacity={0.8}
          >
            <Trash2 size={20} color={colors.light} />
            <Text style={styles.deleteLabel}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.card, { transform: [{ translateX }] }]}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <View style={styles.accent} />
          <View style={styles.cardBody}>
            <View style={styles.cardTop}>
              <View style={styles.unreadDot} />
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.cardTime}>{timeAgo(item.receivedAt)}</Text>
            </View>
            {item.body ? (
              <Text style={styles.cardMessage} numberOfLines={2}>
                {item.body}
              </Text>
            ) : null}
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            ) : null}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

export default function NotificationsScreen() {
  const { notification } = useNotification();
  const { mutate: saveToken } = useRegisterDeviceToken();
  const { coords, status: locationStatus } = useLocationWatcher();
  const [storedNotifs, setStoredNotifs] = useState<StoredNotification[]>([]);
  console.log(coords, "cords");

  const locationOff =
    locationStatus === "denied" || locationStatus === "disabled";

  useEffect(() => {
    (async () => {
      try {
        const token = await messaging().getToken();
        if (token) {
          saveToken({
            userId: "100",
            token,
            platform: Platform.OS,
            // lat: coords?.lat,
            // lon: coords?.lon,
            lat: 26.1445,
            lon: 91.7362,
          });
        }
      } catch (err) {
        console.log("Token error:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!notification) return;
    setStoredNotifs((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        title: notification.notification?.title ?? "Notification",
        body: notification.notification?.body,
        imageUrl: getNotificationImage(notification),
        receivedAt: Date.now(),
      },
      ...prev,
    ]);
  }, [notification]);

  const deleteOne = (id: string) =>
    setStoredNotifs((p) => p.filter((n) => n.id !== id));

  const deleteAll = () =>
    Alert.alert("Clear All", "Remove all notifications?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: () => setStoredNotifs([]),
      },
    ]);

  return (
    // ScreenLayout handles SafeAreaView + ScrollView + KeyboardAvoidingView
    <ScreenLayout scrollable>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgColor} />

      {/* ScreenContent adds consistent horizontal padding */}
      <ScreenContent>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSub}>
              {storedNotifs.length > 0
                ? `${storedNotifs.length} message${storedNotifs.length !== 1 ? "s" : ""}`
                : "You're all caught up"}
            </Text>
          </View>
          {storedNotifs.length > 0 && (
            <Pressable onPress={deleteAll} style={styles.clearBtn}>
              <Trash2 size={14} color={colors.error} />
              <Text style={styles.clearBtnText}>Clear all</Text>
            </Pressable>
          )}
        </View>

        {/* Location warning */}
        {locationOff && (
          <View style={styles.locationRow}>
            <MapPin size={12} color={colors.warning} />
            <Text style={styles.locationText}>
              Location off —{" "}
              <Text style={styles.locationBold}>
                weather alerts may not be accurate
              </Text>
            </Text>
          </View>
        )}

        {/* List or empty state */}
        {storedNotifs.length > 0 ? (
          <View style={styles.list}>
            <Text style={styles.swipeHint}>← swipe left to delete</Text>
            {storedNotifs.map((item) => (
              <SwipeableRow key={item.id} item={item} onDelete={deleteOne} />
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <Bell size={40} color={colors.darkHover} strokeWidth={1.2} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySub}>You're all caught up</Text>
          </View>
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.dark,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: colors.darkHover,
    marginTop: 2,
    fontWeight: "500",
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.bgColor,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  clearBtnText: { fontSize: 13, color: colors.error, fontWeight: "600" },

  // Location warning
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.warning + "18",
    borderRadius: 10,
  },
  locationText: {
    fontSize: 12.5,
    color: colors.warning,
    fontWeight: "500",
    flex: 1,
  },
  locationBold: { fontWeight: "700", color: colors.warning },

  // List
  list: { marginTop: 4 },
  swipeHint: {
    fontSize: 11.5,
    color: colors.darkHover,
    fontWeight: "400",
    marginBottom: 10,
  },

  // Swipeable row
  rowWrap: { position: "relative", marginBottom: 10 },
  deleteBack: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: colors.error,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteAction: { alignItems: "center", justifyContent: "center", gap: 3 },
  deleteLabel: { fontSize: 11, color: colors.light, fontWeight: "700" },

  card: {
    backgroundColor: colors.light,
    borderRadius: 16,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: colors.cardShadow,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  accent: { width: 4, backgroundColor: colors.primary },
  cardBody: { flex: 1, paddingHorizontal: 14, paddingVertical: 13 },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 4,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  cardTitle: { fontSize: 14, fontWeight: "700", color: colors.dark, flex: 1 },
  cardTime: { fontSize: 11, color: colors.darkHover, fontWeight: "400" },
  cardMessage: { fontSize: 13, color: colors.neutral, lineHeight: 19 },
  cardImage: { width: "100%", height: 130, borderRadius: 10, marginTop: 10 },

  // Empty state
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.darkHover,
    marginTop: 4,
  },
  emptySub: { fontSize: 13.5, color: colors.darkHover, fontWeight: "400" },
});
