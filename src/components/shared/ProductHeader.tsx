import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { Heart, ShoppingCart } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProductHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between h-16 bg-white px-4">
      {/* Title */}
      <View>
        <Text className="text-lg font-bold text-dark">
          Products
        </Text>

        <Text className="text-sm text-neutral">
          Shop fertilizers, Tools & Supplies
        </Text>
      </View>

      <View className="flex-row items-center space-x-3">

          <TouchableOpacity
          onPress={() => router.push("/wishlist")}
          className="p-2 me-2 rounded-full bg-white border"
          style={{ borderColor: colors.neutral }}
        >
          <Heart size={20} color={colors.secondary} />
        </TouchableOpacity>

      
        <TouchableOpacity
        onPress={() => router.push("/cartlist")}
          className="p-2 rounded-full bg-white border"
          style={{ borderColor: colors.neutral }}
        >
          <ShoppingCart size={20} color={colors.primary} />
        </TouchableOpacity>

      </View>
    </View>
  );
}
