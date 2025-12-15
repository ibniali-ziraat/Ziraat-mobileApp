import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useAuth } from "@/src/contexts/AuthContext";

export function useDisableBackOnLogout() {
  const { userToken } = useAuth();

  useEffect(() => {
    const onBackPress = () => {
      if (!userToken) return true; // disable back if logged out
      return false; // allow back if logged in
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  }, [userToken]);
}
