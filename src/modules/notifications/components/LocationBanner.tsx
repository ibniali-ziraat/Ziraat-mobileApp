// import { colors } from "@/src/constants/colors";
// import { MapPin } from "lucide-react-native";
// import { Text, View } from "react-native";

// interface Props {
//   visible: boolean;
// }

// export default function LocationBanner({ visible }: Props) {
//   if (!visible) return null;

//   return (
//     <View
//       className="flex-row items-center gap-[6px] mb-[14px] py-2 px-3 rounded-[10px]"
//       style={{ backgroundColor: colors.warning + "18" }}
//     >
//       <MapPin size={12} color={colors.warning} />

//       <Text
//         className="text-[12.5px] font-medium flex-1"
//         style={{ color: colors.warning }}
//       >
//         Location off —{" "}
//         <Text className="font-bold" style={{ color: colors.warning }}>
//           weather alerts may not be accurate
//         </Text>
//       </Text>
//     </View>
//   );
// }

import { colors } from "@/src/constants/colors";
import * as Location from "expo-location";
import { MapPin } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  AppState,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LocationBanner() {
  const [visible, setVisible] = useState(false);

  const checkLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      const servicesEnabled = await Location.hasServicesEnabledAsync();

      setVisible(status !== "granted" || !servicesEnabled);
    } catch (error) {
      console.log("Permission check error:", error);
    }
  }, []);

  useEffect(() => {
    checkLocationPermission();

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        checkLocationPermission();
      }
    });

    // Detect manual GPS ON/OFF changes
    const interval = setInterval(() => {
      checkLocationPermission();
    }, 2000);

    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, [checkLocationPermission]);

  const handleEnableLocation = async () => {
    try {
      // Request app permission
      const permission = await Location.requestForegroundPermissionsAsync();

      // If permission denied → open app settings
      if (permission.status !== "granted") {
        Linking.openSettings();
        return;
      }

      // Check if phone GPS/location is enabled
      const isLocationEnabled = await Location.hasServicesEnabledAsync();

      // If phone location is OFF → open device location settings
      if (!isLocationEnabled) {
        if (Platform.OS === "android") {
          Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
        } else {
          Linking.openURL("App-Prefs:Privacy&path=LOCATION");
        }

        return;
      }

      // Refresh state
      checkLocationPermission();
    } catch (error) {
      console.log("Enable location error:", error);
    }
  };

  // Hide component if permission granted
  // AND GPS/location service enabled
  if (!visible) return null;

  return (
    <View
      className="flex-row items-center justify-between mb-[14px] py-2 px-3 rounded-[10px]"
      style={{ backgroundColor: colors.warning + "18" }}
    >
      <View className="flex-row items-center gap-[6px] flex-1">
        <MapPin size={12} color={colors.warning} />

        <Text
          className="text-[12.5px] font-medium flex-1"
          style={{ color: colors.warning }}
        >
          Location off —{" "}
          <Text className="font-bold" style={{ color: colors.warning }}>
            weather alerts may not be accurate
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleEnableLocation}
        className="px-3 py-1 rounded-full ml-2"
        style={{ backgroundColor: colors.warning }}
      >
        <Text className="text-white text-[11px] font-bold">Enable</Text>
      </TouchableOpacity>
    </View>
  );
}
