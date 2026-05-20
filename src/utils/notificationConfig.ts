import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notifications to use system UI when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Show system alert
    shouldPlaySound: true, // Play sound
    shouldSetBadge: true, // Update badge count
  }),
});

// Android notification channel configuration (required for Android 8.0+)
if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "Default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
    sound: "default",
    enableVibrate: true,
    showBadge: true,
  });
}

export default Notifications;
