import { router } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import { View } from "react-native";
import { colors } from "../constants/colors";
import { ROUTES } from "../constants/routes";
// import { LocationPermissionModal } from "./shared/modals/LocationPermissionModal";

import { useAuth } from "../contexts/AuthContext";
import { useLocationContext } from "../contexts/LocationContext";
import { scheduleAutoLogout } from "../utils/tokenExpiryCheck";

interface RouteGuardProps {
  children: ReactNode;
}

const navigateToLogin = () => {
  try {
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace(ROUTES.AUTH.LOGIN);
  } catch (error) {
    router.replace(ROUTES.AUTH.LOGIN);
  }
};

export default function RouteGuard({ children }: RouteGuardProps) {
  const { userToken, userTokenExp, initialized, logoutUser } = useAuth();
  // Already-running watcher (mounted app-wide via LocationProvider): its
  // AppState listener rechecks on every foreground resume, so gating on
  // its live status here is enough to re-trigger the mandatory prompt on
  // every subsequent app open, not just the first login.
  const { status: locationStatus, recheck: recheckLocation } =
    useLocationContext();
  const cancelRef = useRef<(() => void) | null>(null);
  const isNavigating = useRef(false);

  useEffect(() => {
    if (!initialized) return;

    if (!userToken) {
      if (isNavigating.current) return;
      isNavigating.current = true;

      logoutUser();

      // Small delay to ensure navigator is mounted
      const timeout = setTimeout(() => {
        navigateToLogin();
        isNavigating.current = false;
      }, 50);

      return () => clearTimeout(timeout);
    }

    // Reset navigation flag when user is logged in
    isNavigating.current = false;

    if (cancelRef.current) {
      cancelRef.current();
      cancelRef.current = null;
    }

    cancelRef.current = scheduleAutoLogout(
      userTokenExp,
      () => {
        logoutUser();
      },
      () => {
        if (isNavigating.current) return;
        isNavigating.current = true;
        navigateToLogin();
      },
    );

    return () => {
      if (cancelRef.current) {
        cancelRef.current();
        cancelRef.current = null;
      }
    };
  }, [initialized, userToken, userTokenExp, logoutUser]);

  if (!initialized) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      {children}
      {/* Only gate once logged in — the login/signup screens themselves
          shouldn't be blocked by this. */}
      {/* {!!userToken && (
        <LocationPermissionModal
          status={locationStatus}
          recheck={recheckLocation}
        /> 
      )} */}
    </View>
  );
}
