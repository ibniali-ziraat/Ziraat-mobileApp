import { ROUTES } from "@/src/constants/routes";
import { useNotification } from "@/src/contexts/NotificationContext";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useInAppBanner } from "../hooks/useInAppBanner";
import InAppNotificationBanner from "./InAppNotificationBanner";

async function triggerSystemNotification() {
  try {
    if (Platform.OS === "ios") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  } catch {}
}

export default function GlobalBanner() {
  const { onForegroundMessage } = useNotification();
  const { active, push, dismiss } = useInAppBanner();
  const router = useRouter();

  useEffect(() => {
    const unsub = onForegroundMessage((msg) => {
      const title = msg.notification?.title ?? "New notification";
      const body = msg.notification?.body;

      triggerSystemNotification();

      push({ title, body });
    });

    return unsub;
  }, [onForegroundMessage, push]);

  if (!active) return null;

  return (
    <InAppNotificationBanner
      key={active.id}
      title={active.title}
      body={active.body}
      onDismiss={dismiss}
      onPress={() => {
        dismiss();
        router.push(ROUTES.NOTIFICATIONS);
      }}
      duration={50000}
    />
  );
}
