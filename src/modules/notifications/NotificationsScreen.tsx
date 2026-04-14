import { colors } from "@/src/constants/colors";
import { useNotification } from "@/src/contexts/NotificationContext";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getNotificationImage(
  notification: Notifications.Notification,
): string | undefined {
  const data = notification.request.content.data as
    | Record<string, any>
    | undefined;
  const iosImage = data?._richContent?.image;
  if (iosImage) return iosImage;

  const trigger = notification.request.trigger as {
    remoteMessage?: { notification?: { imageUrl?: string } };
  };
  return trigger?.remoteMessage?.notification?.imageUrl;
}

export default function NotificationsScreen() {
  const { notification, expoPushToken, devicePushToken, error } =
    useNotification();
  const [copied, setCopied] = useState(false);

  const copyToken = async () => {
    try {
      if (!expoPushToken) return;
      await Share.share({
        message: expoPushToken,
        title: "Expo Push Token",
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy token:", err);
    }
  };

  const copyDeviceToken = async () => {
    try {
      if (!devicePushToken) return;
      await Share.share({
        message: devicePushToken,
        title: "Device Push Token",
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy device token:", err);
    }
  };

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <SafeAreaView>
          <Text style={{ fontSize: 16, color: "#FF3B30" }}>
            Error: {error.message}
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 28, fontWeight: "700" }}>
          Expo Notifications
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 4,
          }}
        >
          Push token for this device
        </Text>

        <Pressable
          onPress={copyToken}
          style={{
            marginTop: 20,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
              color: colors.dark,
            }}
            selectable
            numberOfLines={2}
          >
            {expoPushToken || "Generating token..."}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: copied ? "#34C759" : "#8E8E93",
              marginTop: 8,
            }}
          >
            {copied ? "Copied!" : "Tap to copy"}
          </Text>
        </Pressable>

        <Pressable
          onPress={copyDeviceToken}
          style={{
            marginTop: 20,
            borderRadius: 12,
            padding: 16,
            backgroundColor: "#00000005",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
              color: colors.dark,
            }}
            selectable
            numberOfLines={2}
          >
            {devicePushToken || "Generating device token..."}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: copied ? "#34C759" : "#8E8E93",
              marginTop: 8,
            }}
          >
            {copied ? "Copied!" : "Tap to copy"}
          </Text>
        </Pressable>

        {notification && (
          <View style={{ marginTop: 32 }}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "#000" }}>
              Latest Notification
            </Text>
            {notification.request.content.title && (
              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 8 }}>
                {notification.request.content.title}
              </Text>
            )}
            {notification.request.content.body && (
              <Text style={{ fontSize: 15, color: "#3C3C43", marginTop: 4 }}>
                {notification.request.content.body}
              </Text>
            )}
            {getNotificationImage(notification) && (
              <Image
                source={{ uri: getNotificationImage(notification) }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                  marginTop: 12,
                }}
                resizeMode="cover"
              />
            )}
          </View>
        )}
      </View>

      <View
        style={{
          paddingBottom: 20,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "#E5E5EA",
          paddingTop: 16,
          gap: 12,
        }}
      ></View>
    </SafeAreaView>
  );
}
