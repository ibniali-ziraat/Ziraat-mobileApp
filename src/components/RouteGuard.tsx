import { router } from "expo-router";

import { ReactNode, useEffect } from "react";
import { View } from "react-native";
import { useGlobalData } from "../contexts/GlobalDataContext";

interface RouteGuardProps {
  children: ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { userData, initialized } = useGlobalData();

  useEffect(() => {
    if (!initialized) return;

    if (!userData?.id) {
      router.replace("/auth/user");
    }
  }, [initialized, userData?.id]);

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
