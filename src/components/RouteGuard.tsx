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

export default function RouteGuard({ children }: RouteGuardProps) {
  const { userToken, userTokenExp, initialized, logoutUser } = useAuth();
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!initialized) return;

    if (!userToken) {
      logoutUser();
<<<<<<< HEAD
      // router.replace(ROUTES.AUTH.LOGIN);
=======
      router.replace(ROUTES.AUTH.LOGIN);
>>>>>>> 0d5fbc02629764616a337be3fd6a4b736aace586
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
        router.replace(ROUTES.AUTH.LOGIN);
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
