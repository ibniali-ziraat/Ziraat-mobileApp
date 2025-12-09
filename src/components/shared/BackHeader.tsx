import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface BackHeaderProps {
  title: string; // main title
  desc?: string; // optional description
}

export default function BackHeader({ title, desc }: BackHeaderProps) {
  const router = useRouter();

  return (
      <View className="py-5 px-2" style={{ borderBottomColor: colors.neutral }}>
        <View className="flex-row">
          {/* Arrow */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-1 rounded-full mr-3"
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={colors.dark} />
          </TouchableOpacity>

          {/* Title + Description */}
          <View className="flex-1">
            <Text
              className="text-xl font-bold"
              style={{ color: colors.dark }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>

            {desc && (
              <Text
                className="text-sm mt-1"
                style={{ color: colors.dark }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {desc}
              </Text>
            )}
          </View>
        </View>
      </View>
  );
}
