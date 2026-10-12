import type { AdvisoryNotificationLink } from "@/src/modules/notifications/types/Notification.types";

type NotificationData = Record<string, unknown> | undefined;

const ADVISORY_ALERT_TYPES = ["advisory-published"];
const ADVISORY_NOTIFICATION_NAME = "Farm.Advisory";

/**
 * Reads the advisory link from a SignalR notification, e.g.
 * detail.notificationName "Farm.Advisory" with properties
 * { AlertType: "advisory-published", orchardProfileId: "40", recipientId: "…" }.
 * Returns undefined for every other kind of notification.
 */
export const getAdvisoryLinkFromSignalR = (
  notificationName: unknown,
  properties: NotificationData,
): AdvisoryNotificationLink | undefined => {
  const alertType = String(properties?.AlertType ?? "").toLowerCase();
  const type = String(properties?.type ?? "").toLowerCase();
  const isAdvisory =
    notificationName === ADVISORY_NOTIFICATION_NAME ||
    ADVISORY_ALERT_TYPES.includes(alertType) ||
    type.includes("advisor");
  if (!isAdvisory) return undefined;

  const orchardProfileId = Number(properties?.orchardProfileId);
  if (!Number.isFinite(orchardProfileId) || orchardProfileId <= 0) return undefined;

  const recipientId = properties?.recipientId;
  return {
    orchardProfileId,
    ...(typeof recipientId === "string" && recipientId ? { recipientId } : {}),
  };
};

// same fields as SignalR, but flat in the FCM "data" block
export const getAdvisoryLinkFromPushData = (data: NotificationData) =>
  getAdvisoryLinkFromSignalR(data?.notificationName, data);

// keys the backend may use for the advisory recipient in the push "data" block
const RECIPIENT_KEYS = ["recipientId", "RecipientId", "advisoryRecipientId"];

/**
 * Returns the advisory recipientId from a push notification's data,
 * or null when the notification is not an advisory.
 */
export const getAdvisoryRecipientId = (data: NotificationData): string | null => {
  if (!data) return null;

  const type = String(data.type ?? data.Type ?? "").toLowerCase();
  if (type && !type.includes("advisor")) return null;

  for (const key of RECIPIENT_KEYS) {
    const value = data[key];
    if (typeof value === "string" && value.length > 0) return value;
  }

  return null;
};
