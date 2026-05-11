import { useNotification } from "@/src/contexts/NotificationContext";
import { useLocation } from "@/src/hooks/useLocationPermission";
import messaging from '@react-native-firebase/messaging';
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegisterDeviceToken } from "./hooks/notification.hooks";

function getNotificationImage(
  notification: Notifications.Notification,
): string | undefined {
  const data = notification.request.content.data as
    | Record<string, any>
    | undefined;
  const iosImage = data?._richContent?.image;
  if (iosImage) return iosImage;
  const trigger = notification.request.trigger as any;
  return trigger?.remoteMessage?.notification?.imageUrl;
}

function TokenCard({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string | null;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <View style={styles.tokenCard}>
      <View style={styles.tokenCardHeader}>
        <View style={styles.tokenBadge}>
          <Text style={styles.tokenBadgeText}>{label}</Text>
        </View>
        <Pressable
          onPress={onCopy}
          style={({ pressed }) => [
            styles.copyButton,
            pressed && styles.copyButtonPressed,
          ]}
        >
          <Text style={styles.copyButtonText}>
            {copied ? "✓ Copied" : "Copy"}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.tokenText} numberOfLines={3} selectable>
        {value || "Generating token..."}
      </Text>
    </View>
  );
}

export default function NotificationsScreen() {
  const { notification, expoPushToken, devicePushToken, error } =
    useNotification();

  const { mutate: saveToken } = useRegisterDeviceToken();
  const { coords, loading: locationLoading } = useLocation();

  const [copiedExpo, setCopiedExpo] = useState(false);
  const [copiedDevice, setCopiedDevice] = useState(false);

  // ✅ Single effect — fires once when location resolves (loading flips to false)
  useEffect(() => {
    if (locationLoading) return;
    registerForPush();
  }, [locationLoading]);

  const registerForPush = async () => {
    try {
      const token = await Notifications.getDevicePushTokenAsync();
      let tokenValue = token.data;

      if (Platform.OS === "ios") {
        const expoPushToken = await Notifications.getExpoPushTokenAsync({
          projectId:
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId,
        });
        tokenValue = expoPushToken.data;
      }

      const fcmToken = await messaging().getToken();
      console.log("FCM Token:", fcmToken);

      if (tokenValue) {
        saveToken({
          userId: 0,
          token: tokenValue,
          type: token.type,
          lat: coords?.lat,
          lon: coords?.lon,
        });
      }
    } catch (err) {
      console.log("Token error:", err);
    }
  };

  const copy = async (
    value: string | null,
    title: string,
    setCopied: (v: boolean) => void,
  ) => {
    if (!value) return;
    await Share.share({ message: value, title });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <View style={styles.errorBox}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            Device push tokens & recent alerts
          </Text>
        </View>

        {/* Tokens */}
        <Text style={styles.sectionLabel}>PUSH TOKENS</Text>

        <TokenCard
          label="Expo Token"
          value={expoPushToken}
          copied={copiedExpo}
          onCopy={() => copy(expoPushToken, "Expo Push Token", setCopiedExpo)}
        />

        <TokenCard
          label="Device Token"
          value={devicePushToken}
          copied={copiedDevice}
          onCopy={() => copy(devicePushToken, "Device Token", setCopiedDevice)}
        />

        {/* Notification UI */}
        {notification ? (
          <View style={styles.notificationSection}>
            <Text style={styles.sectionLabel}>LATEST NOTIFICATION</Text>

            <View style={styles.notificationCard}>
              <View style={styles.notificationTitleRow}>
                <View style={styles.dot} />
                <Text style={styles.notificationTitle}>
                  {notification.request.content.title || "No title"}
                </Text>
              </View>

              {notification.request.content.body && (
                <View style={styles.messageBox}>
                  <Text style={styles.messageLabel}>Message</Text>
                  <Text style={styles.messageText}>
                    {notification.request.content.body}
                  </Text>
                </View>
              )}

              {notification.request.content.data &&
                Object.keys(notification.request.content.data).length > 0 && (
                  <View style={styles.dataBox}>
                    <Text style={styles.messageLabel}>Data Payload</Text>
                    <Text style={styles.dataText}>
                      {JSON.stringify(
                        notification.request.content.data,
                        null,
                        2,
                      )}
                    </Text>
                  </View>
                )}

              {getNotificationImage(notification) && (
                <Image
                  source={{ uri: getNotificationImage(notification) }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap a push notification to see it here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#000",
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#8E8E93",
    marginTop: 4,
  },

  // Section label
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: 0.8,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  // Token card
  tokenCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tokenCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tokenBadge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tokenBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4F46E5",
  },
  copyButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  copyButtonPressed: {
    opacity: 0.75,
  },
  copyButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  tokenText: {
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    color: "#3C3C43",
    lineHeight: 18,
  },

  // Notification section
  notificationSection: {
    marginTop: 28,
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4F46E5",
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    flex: 1,
  },
  messageBox: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  messageLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: 0.6,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  messageText: {
    fontSize: 15,
    color: "#3C3C43",
    lineHeight: 22,
  },
  dataBox: {
    padding: 16,
    backgroundColor: "#F9F9FB",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  dataText: {
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    color: "#3C3C43",
    lineHeight: 18,
  },
  image: {
    width: "100%",
    height: 200,
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
  },

  // Error
  errorBox: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 24,
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#FF3B30",
    textAlign: "center",
  },
});
