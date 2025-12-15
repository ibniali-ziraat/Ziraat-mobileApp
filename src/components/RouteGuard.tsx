import { router } from "expo-router";

import { ReactNode, useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

interface RouteGuardProps {
  children: ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { userToken, initialized } = useAuth();

  useEffect(() => {
    if (!initialized) return;

    if (!userToken) {
      // router.replace("/auth/user");
      router.replace("/");
    }
  }, [initialized, userToken]);

  if (!initialized) return null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {children}
    </View>
  );
}
