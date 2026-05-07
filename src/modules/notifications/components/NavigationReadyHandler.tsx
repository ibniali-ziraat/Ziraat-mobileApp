// src/components/NavigationReadyHandler.tsx
import { useNotificationNavigation } from "@/src/modules/notifications/hooks/useNotificationNavigation";

export default function NavigationReadyHandler() {
  useNotificationNavigation();
  return null;
}
