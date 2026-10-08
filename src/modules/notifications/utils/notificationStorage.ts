import { getAdvisoryLinkFromPushData } from "@/src/modules/farmer-advisories/utils/advisoryNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import type { StoredNotification } from "../types/Notification.types";

export const NOTIFICATIONS_STORAGE_KEY = "APP_NOTIFICATIONS";

const MAX_STORED = 200;

type PushData = Record<string, unknown> | undefined;

const readText = (data: PushData, ...keys: string[]) => {
  for (const key of keys) {
    const value = data?.[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return undefined;
};

/**
 * Turns an FCM message into a list entry. The FCM messageId is used as the id,
 * so the same push saved by the background handler and again on tap/foreground
 * only shows once. Returns null for silent data-only messages with no text.
 */
export const mapRemoteMessageToStoredNotification = (
  msg: FirebaseMessagingTypes.RemoteMessage,
): StoredNotification | null => {
  const data = msg.data as PushData;
  const title =
    msg.notification?.title ?? readText(data, "title", "Title");
  const body = msg.notification?.body ?? readText(data, "body", "Message", "message");
  if (!title && !body) return null;

  const advisory = getAdvisoryLinkFromPushData(data);
  const imageUrl =
    msg.notification?.android?.imageUrl ?? readText(data, "imageUrl", "image");

  return {
    id: msg.messageId ?? `${Date.now()}-${Math.random()}`,
    title: title ?? "Notification",
    body,
    ...(imageUrl ? { imageUrl } : {}),
    receivedAt: msg.sentTime ?? Date.now(),
    isRead: false,
    ...(advisory ? { advisory } : {}),
  };
};

export const readStoredNotifications = async (): Promise<StoredNotification[]> => {
  try {
    const stored = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const writeStoredNotifications = (items: StoredNotification[]) =>
  AsyncStorage.setItem(
    NOTIFICATIONS_STORAGE_KEY,
    JSON.stringify(items.slice(0, MAX_STORED)),
  );

// union by id, newest first; entries already in `primary` win
export const mergeNotifications = (
  primary: StoredNotification[],
  secondary: StoredNotification[],
) => {
  const seen = new Set(primary.map((n) => n.id));
  return [...primary, ...secondary.filter((n) => !seen.has(n.id))].sort(
    (a, b) => b.receivedAt - a.receivedAt,
  );
};

/**
 * Used by the FCM background handler (app in background or closed), where the
 * React tree and NotificationContext aren't available.
 */
export const saveRemoteMessageToStorage = async (
  msg: FirebaseMessagingTypes.RemoteMessage,
) => {
  const entry = mapRemoteMessageToStoredNotification(msg);
  if (!entry) return;

  const current = await readStoredNotifications();
  if (current.some((n) => n.id === entry.id)) return;

  await writeStoredNotifications([entry, ...current]);
};
