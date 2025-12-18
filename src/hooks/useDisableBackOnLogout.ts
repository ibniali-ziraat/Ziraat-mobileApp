// import { useEffect } from "react";
// import { BackHandler } from "react-native";
// import { useAuth } from "@/src/contexts/AuthContext";

// export function useDisableBackOnLogout() {
//   const { userToken } = useAuth();

//   useEffect(() => {
//     const onBackPress = () => {
//       if (!userToken) return true; // disable back if logged out
//       return false; // allow back if logged in
//     };

//     const subscription = BackHandler.addEventListener(
//       "hardwareBackPress",
//       onBackPress
//     );
//     return () => subscription.remove();
//   }, [userToken]);
// }
import { useEffect, useRef } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import { useAuth } from "@/src/contexts/AuthContext";

export function useDisableBackOnLogout() {
  const { userToken } = useAuth();
  const lastBackPress = useRef<number>(0);

  useEffect(() => {
    const onBackPress = () => {
      // If user is logged in, allow normal back behavior
      if (userToken) {
        return false;
      }

      const now = Date.now();

      // First back press
      if (now - lastBackPress.current > 2000) {
        lastBackPress.current = now;
        ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
        return true; // prevent exit
      }

      // Second back press within 2 seconds → exit app
      BackHandler.exitApp();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscription.remove();
  }, [userToken]);
}
