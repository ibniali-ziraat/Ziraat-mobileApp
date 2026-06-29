import { Image, View } from "react-native";

export default function HeaderBanner() {
  return (
    <View className="relative mb-6 rounded-lg overflow-hidden">
      <Image
        source={{
          uri: "https://images.pexels.com/photos/6633043/pexels-photo-6633043.jpeg",
        }}
        className="w-full h-48"
      />
    </View>
  );
}
