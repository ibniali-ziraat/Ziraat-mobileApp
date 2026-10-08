import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNotification } from "@/src/contexts/NotificationContext";
import { advisoryRoutes } from "@/src/modules/farmer-advisories/routes/advisoryRoutes";
import {
  getAdvisoryLinkFromPushData,
  getAdvisoryRecipientId,
} from "@/src/modules/farmer-advisories/utils/advisoryNotification";
import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";

/**
 * Handles a tapped system push (app was in the background or closed):
 * advisory pushes open that advisory, every other push opens the
 * notifications screen. Mounted once in the root layout; renders nothing.
 */
export default function NotificationTapHandler() {
  const { openedNotification, clearOpenedNotification } = useNotification();
  const { initialized, userToken } = useAuth();
  const navigationReady = !!useRootNavigationState()?.key;

  useEffect(() => {
    if (!openedNotification) return;

    // wait for the navigator and a logged-in session; RouteGuard handles logged-out users
    if (!navigationReady || !initialized || !userToken) return;

    const data = openedNotification.data;
    const recipientId = getAdvisoryRecipientId(data);
    const advisoryLink = getAdvisoryLinkFromPushData(data);

    const target = recipientId
      ? advisoryRoutes.details(recipientId)
      : advisoryLink
        ? advisoryRoutes.list(advisoryLink.orchardProfileId)
        : ROUTES.NOTIFICATIONS;

    // let RouteGuard's own startup navigation settle first; clearing inside the
    // timeout so the re-render it causes can't cancel the push
    const timeout = setTimeout(() => {
      clearOpenedNotification();
      router.push(target);
    }, 300);
    return () => clearTimeout(timeout);
  }, [
    openedNotification,
    clearOpenedNotification,
    navigationReady,
    initialized,
    userToken,
  ]);

  return null;
}
