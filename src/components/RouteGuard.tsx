import { router } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import { View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { scheduleAutoLogout } from "../utils/tokenExpiryCheck";

interface RouteGuardProps {
  children: ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { userToken, userTokenExp, initialized, logoutUser } = useAuth();
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!initialized) return;

    // No token -> immediate logout and redirect
    // if (!userToken) {
    //   logoutUser();
    //   router.replace("/");
    //   return;
    // }

    if (!userToken) {
      router.replace("/");
      return;
    }

    // Clear previous scheduled logout if present
    if (cancelRef.current) {
      cancelRef.current();
      cancelRef.current = null;
    }

    // Schedule auto-logout based on expiry (if parseable)
    cancelRef.current = scheduleAutoLogout(
      userTokenExp,
      () => {
        logoutUser();
      },
      () => {
        router.replace("/auth/user");
      }
    );

    // Cleanup
    return () => {
      if (cancelRef.current) {
        cancelRef.current();
        cancelRef.current = null;
      }
    };
  }, [initialized, userToken, userTokenExp, logoutUser]);

  if (!initialized) return null;

  return <View style={{ flex: 1, backgroundColor: "white" }}>{children}</View>;
}
