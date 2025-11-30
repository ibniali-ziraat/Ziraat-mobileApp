import { View } from "react-native";
import { Text } from "react-native-paper";

export default function PrecipitationMap() {
  const camera = {
    coordinates: {
      latitude: 34.083656,
      longitude: 74.797371,
    },
    zoom: 8,
  };

  // if (Platform.OS === "ios") {
  //   return (
  //     <View className="h-44 w-full rounded-xl overflow-hidden border border-gray-300">
  //       <AppleMaps.View style={{ flex: 1 }} cameraPosition={camera} />
  //     </View>
  //   );
  // }

  // if (Platform.OS === "android") {
  //   return (
  //     <View className="h-44 w-full rounded-xl overflow-hidden border border-gray-300">
  //       <GoogleMaps.View style={{ flex: 1 }} cameraPosition={camera} />
  //     </View>
  //   );
  // }

  // fallback for web
  return (
    <View>
      <Text>maps not supported with web</Text>
    </View>
  );
}
