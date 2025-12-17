import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface BackHeaderProps {
  title: string;
  desc?: string;
  onPress?: () => void;
}

export default function BackHeader({ title, desc, onPress }: BackHeaderProps) {
  const router = useRouter();

  return (
    <View className="bg-bgColor py-4 mb-4">
      {/* Row */}
      <View className="flex-row items-center">
        {/* Back Button */}
        <TouchableOpacity
          onPress={onPress ? onPress : () => router.back()}
          className="p-2 mr-3 rounded-full"
          activeOpacity={0.7}
        >
          <ArrowLeft size={26} color={colors.dark} />
        </TouchableOpacity>

        {/* Title + Description */}
        <View className="flex-1">
          <Text className="text-dark font-bold text-2xl" numberOfLines={1}>
            {title}
          </Text>

          {desc && (
            <Text className="text-neutral text-md mt-0.5" numberOfLines={2}>
              {desc}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
