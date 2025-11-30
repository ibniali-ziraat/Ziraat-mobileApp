import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function BackHeader({ children }) {
  const router = useRouter();

  return (
    <View
      className="flex-row items-center py-5 border-b"
      style={{ borderBottomColor: colors.neutral }}
    >
      <TouchableOpacity onPress={() => router.back()} className="mr-4">
        <ArrowLeft color={colors.dark} size={28} />
      </TouchableOpacity>

      <View className="flex-1">
        {typeof children === "string" ? (
          <Text className="text-2xl font-bold" style={{ color: colors.dark }}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
