import { Image, Text, View } from "react-native";

export default function HeaderBanner() {
  return (
    <View className="relative mb-6">
      <Image
        source={{ uri: "https://images.pexels.com/photos/6633043/pexels-photo-6633043.jpeg" }}
        className="w-full h-48"
      />
      <View className="absolute inset-0" />

      <Text className="absolute bottom-6 left-4 text-dark text-3xl font-extrabold">
        Alerts & Notifications
      </Text>
      <Text className="absolute bottom-2 left-4 text-dark font-medium">
        Real-time warnings • Risk insights • Advisory actions
      </Text>
    </View>
  );
}
