import { router } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import { View } from "react-native";
import { colors } from "../constants/colors";
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

    if (!userToken) {
      // logoutUser();
      // router.replace("/auth/user");
      router.replace("/");
      return;
    }

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
        router.replace("/auth/user");
      }
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
