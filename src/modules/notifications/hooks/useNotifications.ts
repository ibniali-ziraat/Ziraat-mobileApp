import { useNotification } from "@/src/contexts/NotificationContext";

export function useNotifications() {
  return useNotification();
}
