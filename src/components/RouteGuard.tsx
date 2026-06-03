import { router } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import { View } from "react-native";
import { colors } from "../constants/colors";
import { ROUTES } from "../constants/routes";

import { useAuth } from "../contexts/AuthContext";
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
    <View style={{ flex: 1, backgroundColor: colors.light }}>{children}</View>
  );
}
