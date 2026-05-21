import { colors } from "@/src/constants/colors";
import * as Location from "expo-location";
import { MapPin } from "lucide-react-native";
import { Linking, Platform, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
};

export default function LocationBanner({ visible }: Props) {
  const handleEnableLocation = async () => {
    try {
      // Request app permission
      const permission = await Location.requestForegroundPermissionsAsync();

      // If permission denied → open app settings
      if (permission.status !== "granted") {
        Linking.openSettings();
        return;
      }

      // Check if GPS/location services are enabled
      const isLocationEnabled = await Location.hasServicesEnabledAsync();

      // If GPS is OFF → open location settings
      if (!isLocationEnabled) {
        if (Platform.OS === "android") {
          Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
        } else {
          Linking.openURL("App-Prefs:Privacy&path=LOCATION");
        }

        return;
      }
    } catch (error) {
      console.log("Enable location error:", error);
    }
  };

  if (!visible) return null;

  return (
    <View
      className="flex-row items-center justify-between mb-[14px] py-4 px-3 rounded-[10px]"
      style={{ backgroundColor: colors.warning + "18" }}
    >
      <View className="flex-row items-center gap-[6px] flex-1">
        <MapPin size={16} color={colors.warning} strokeWidth={2.5} />

        <Text
          className="text-[12.5px] font-medium flex-1"
          style={{ color: colors.warning }}
        >
          Location off —{" "}
          <Text className="font-md" style={{ color: colors.warning }}>
            weather alerts may not be accurate
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleEnableLocation}
        className="px-4 py-2 rounded-full ml-2"
        style={{ backgroundColor: colors.warning }}
      >
        <Text className="text-white text-[11px] font-bold">Enable</Text>
      </TouchableOpacity>
    </View>
  );
}
