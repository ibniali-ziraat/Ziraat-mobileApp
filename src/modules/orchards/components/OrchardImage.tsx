import { colors } from "@/src/constants/colors";
import { MoreVertical } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

interface OrchardImageProps {
  source?: any;
}

export default function OrchardImage({ source }: OrchardImageProps) {
  if (!source) return null;

  return (
    <View className="w-full relative">
      <Image
        source={source}
        className="w-full h-56 rounded-xl"
        resizeMode="cover"
      />

      <Pressable className="absolute top-3 right-0 bg-light p-2 mr-4 mt-2 rounded-full shadow z-50">
        <MoreVertical size={20} color={colors.dark} />
      </Pressable>
    </View>
  );
}
