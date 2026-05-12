import { colors } from "@/src/constants/colors";
import { useNotification } from "@/src/contexts/NotificationContext";
import { useLocation } from "@/src/hooks/useLocationPermission";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import {
  Bell,
  BellOff,
  Check,
  ChevronRight,
  Copy,
  Trash2,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegisterDeviceToken } from "./hooks/notification.hooks";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DELETE_THRESHOLD = -80;
const SWIPE_FULL = -SCREEN_WIDTH;

// ─── Types ───────────────────────────────────────────────────────────────────
interface StoredNotification {
  id: string;
  title: string;
  body?: string;
  data?: Record<string, any>;
  imageUrl?: string;
  receivedAt: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getNotificationImage(
  notification: FirebaseMessagingTypes.RemoteMessage,
): string | undefined {
  const data = notification?.data as Record<string, any> | undefined;
  const iosImage = data?._richContent?.image;
  if (iosImage) return iosImage;
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

// ─── Swipeable Notification Row ───────────────────────────────────────────────
function SwipeableNotificationRow({
  item,
  onDelete,
}: {
  item: StoredNotification;
  onDelete: (id: string) => void;
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const rowHeight = useRef(new Animated.Value(1)).current;
  const deleteOpacity = useRef(new Animated.Value(0)).current;
  const [swiped, setSwiped] = useState(false);
  let startX = 0;

  const handleTouchStart = (e: any) => {
    startX = e.nativeEvent.pageX;
  };

  const handleTouchMove = (e: any) => {
    const dx = e.nativeEvent.pageX - startX;
    if (dx > 0) return; // only swipe left
    const clamped = Math.max(dx, -120);
    translateX.setValue(clamped);
    deleteOpacity.setValue(Math.min(1, Math.abs(clamped) / 80));
  };

  const handleTouchEnd = (e: any) => {
    const dx = e.nativeEvent.pageX - startX;
    if (dx < DELETE_THRESHOLD) {
      // snap open
      Animated.spring(translateX, {
        toValue: -88,
        useNativeDriver: false,
      }).start(() => setSwiped(true));
    } else {
      // snap close
      Animated.spring(translateX, { toValue: 0, useNativeDriver: false }).start(
        () => setSwiped(false),
      );
      Animated.timing(deleteOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const confirmDelete = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: SWIPE_FULL,
        duration: 220,
        useNativeDriver: false,
      }),
      Animated.timing(rowHeight, {
        toValue: 0,
        duration: 300,
        delay: 180,
        useNativeDriver: false,
      }),
    ]).start(() => onDelete(item.id));
  };

  const animatedHeight = rowHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={{ transform: [{ scaleY: animatedHeight }], overflow: "hidden" }}
    >
      <View style={styles.swipeRow}>
        {/* Delete background */}
        <Animated.View
          style={[styles.deleteBackground, { opacity: deleteOpacity }]}
        >
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={confirmDelete}
            activeOpacity={0.8}
          >
            <Trash2 size={22} color="#fff" />
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Card */}
        <Animated.View
          style={[styles.notifCard, { transform: [{ translateX }] }]}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left accent bar */}
          <View style={styles.accentBar} />

          <View style={styles.notifContent}>
            <View style={styles.notifHeader}>
              <View style={styles.notifDot} />
              <Text style={styles.notifTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.notifTime}>{timeAgo(item.receivedAt)}</Text>
            </View>

            {item.body ? (
              <Text style={styles.notifBody} numberOfLines={2}>
                {item.body}
              </Text>
            ) : null}

            {item.data && Object.keys(item.data).length > 0 && (
              <View style={styles.dataChip}>
                <Text style={styles.dataChipText}>
                  {Object.keys(item.data).length} data fields
                </Text>
              </View>
            )}

            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.notifImage}
                resizeMode="cover"
              />
            ) : null}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

// ─── Token Card ───────────────────────────────────────────────────────────────
function TokenCard({
  value,
  copied,
  onCopy,
}: {
  value: string | null;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <View style={styles.tokenCard}>
      <View style={styles.tokenCardTop}>
        <View style={styles.tokenLabelWrap}>
          <View style={styles.tokenDot} />
          <Text style={styles.tokenLabel}>FCM Device Token</Text>
        </View>
        <Pressable
          onPress={onCopy}
          style={({ pressed }) => [
            styles.copyBtn,
            pressed && { opacity: 0.75 },
          ]}
        >
          {copied ? (
            <Check size={14} color={colors.primary} />
          ) : (
            <Copy size={14} color={colors.primary} />
          )}
          <Text style={styles.copyBtnText}>{copied ? "Copied!" : "Copy"}</Text>
        </Pressable>
      </View>
      <Text style={styles.tokenValue} numberOfLines={2} selectable>
        {value ?? "Generating…"}
      </Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function NotificationsScreen() {
  const { notification, fcmToken, error } = useNotification();
  const { mutate: saveToken } = useRegisterDeviceToken();
  const { coords, loading: locationLoading } = useLocation();
  const [copiedFcm, setCopiedFcm] = useState(false);
  const [storedNotifs, setStoredNotifs] = useState<StoredNotification[]>([]);

  useEffect(() => {
    if (locationLoading) return;
    registerForPush();
  }, [locationLoading]);

  // Accumulate incoming notifications
  useEffect(() => {
    if (!notification) return;
    const next: StoredNotification = {
      id: `${Date.now()}-${Math.random()}`,
      title: notification.notification?.title ?? "Notification",
      body: notification.notification?.body,
      data: notification.data as Record<string, any>,
      imageUrl: getNotificationImage(notification),
      receivedAt: Date.now(),
    };
    setStoredNotifs((prev) => [next, ...prev]);
  }, [notification]);

  const registerForPush = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        saveToken({
          userId: "0",
          fcmToken: token,
          platform: Platform.OS,
          latitude: coords?.lat,
          longitude: coords?.lon,
        });
      }
    } catch (err) {
      console.log("Token error:", err);
    }
  };

  const handleCopy = async () => {
    if (!fcmToken) return;
    await Share.share({ message: fcmToken, title: "FCM Token" });
    setCopiedFcm(true);
    setTimeout(() => setCopiedFcm(false), 2000);
  };

  const deleteOne = (id: string) => {
    setStoredNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteAll = () => {
    Alert.alert(
      "Clear All Notifications",
      "Remove all notifications from this list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => setStoredNotifs([]),
        },
      ],
    );
  };

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <View style={styles.errorBox}>
          <BellOff size={40} color={colors.error} />
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgColor} />

      {/* ── Header ── */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.pageTitle}>Notifications</Text>
          <Text style={styles.pageSubtitle}>
            {storedNotifs.length > 0
              ? `${storedNotifs.length} message${storedNotifs.length > 1 ? "s" : ""}`
              : "All caught up"}
          </Text>
        </View>
        {storedNotifs.length > 0 && (
          <Pressable onPress={deleteAll} style={styles.clearAllBtn}>
            <Trash2 size={15} color={colors.error} />
            <Text style={styles.clearAllText}>Clear all</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── Token ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PUSH TOKEN</Text>
          <TokenCard value={fcmToken} copied={copiedFcm} onCopy={handleCopy} />
        </View>

        {/* ── Hint ── */}
        {storedNotifs.length > 0 && (
          <View style={styles.hintRow}>
            <ChevronRight size={13} color="#aaa" />
            <Text style={styles.hintText}>Swipe left to delete</Text>
          </View>
        )}

        {/* ── Notifications List ── */}
        {storedNotifs.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>RECENT</Text>
            {storedNotifs.map((item) => (
              <SwipeableNotificationRow
                key={item.id}
                item={item}
                onDelete={deleteOne}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Bell size={40} color={colors.primary} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>
              Push notifications will appear here as they arrive
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgColor },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
  },

  // Header
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: colors.bgColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.dark,
    letterSpacing: -0.6,
  },
  pageSubtitle: {
    fontSize: 13,
    color: "#999",
    marginTop: 3,
    fontWeight: "500",
  },
  clearAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FFF0F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#FFD9D9",
  },
  clearAllText: {
    fontSize: 13,
    color: colors.error,
    fontWeight: "600",
  },

  // Sections
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#AAA",
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  // Token Card
  tokenCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tokenCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tokenLabelWrap: { flexDirection: "row", alignItems: "center", gap: 7 },
  tokenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  tokenLabel: { fontSize: 13, fontWeight: "600", color: colors.neutral },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EAF2E6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  copyBtnText: { fontSize: 12, fontWeight: "700", color: colors.primary },
  tokenValue: {
    fontSize: 11.5,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    color: "#666",
    lineHeight: 18,
  },

  // Swipeable row
  swipeRow: {
    marginBottom: 10,
    position: "relative",
  },
  deleteBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 88,
    backgroundColor: colors.error,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  deleteBtnText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Notification card
  notifCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  accentBar: {
    width: 4,
    backgroundColor: colors.primary,
  },
  notifContent: {
    flex: 1,
    padding: 14,
  },
  notifHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  notifTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: colors.dark,
    flex: 1,
  },
  notifTime: {
    fontSize: 11,
    color: "#AAA",
    fontWeight: "500",
  },
  notifBody: {
    fontSize: 13.5,
    color: "#555",
    lineHeight: 20,
    marginBottom: 6,
  },
  dataChip: {
    alignSelf: "flex-start",
    backgroundColor: "#EAF2E6",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  dataChipText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "600",
  },
  notifImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginTop: 10,
  },

  // Hint
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 22,
    marginTop: 14,
    marginBottom: -4,
  },
  hintText: { fontSize: 12, color: "#BBB", fontWeight: "500" },

  // Empty
  emptyState: {
    alignItems: "center",
    paddingTop: 72,
    paddingHorizontal: 48,
  },
  emptyIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#EAF2E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "#C8E0BF",
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13.5,
    color: "#999",
    textAlign: "center",
    lineHeight: 21,
  },

  // Error
  errorBox: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 24,
    gap: 10,
    borderWidth: 1,
    borderColor: "#FFE0E0",
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.dark,
  },
  errorText: {
    fontSize: 13.5,
    color: colors.error,
    textAlign: "center",
  },
});
