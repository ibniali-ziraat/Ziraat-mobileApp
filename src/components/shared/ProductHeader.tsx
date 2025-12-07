import { colors } from "@/src/constants/colors";
import { Heart, ShoppingCart } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProductHeader() {
  return (
    <View className="flex-row items-center justify-between h-16 bg-white">
      {/* Title & Subtitle */}
      <View>
        <Text className="text-lg font-bold" style={{ color: colors.dark }}>
          Products
        </Text>

        <Text className="text-sm" style={{ color: colors.neutral }}>
          Shop Seeds, Tools & Supplies
        </Text>
      </View>

      {/* Actions */}
      <View className="flex-row items-center space-x-3">
        {/* Search */}
        {/* <TouchableOpacity
          className="p-2 rounded-full bg-white border"
          style={{ borderColor: colors.neutral }}
        >
          <Search color={colors.primary} size={20} />
        </TouchableOpacity> */}

        {/* Wishlist */}
        <TouchableOpacity
          className="p-2 rounded-full bg-white border mr-2"
          style={{ borderColor: colors.neutral }}
        >
          <Heart color={colors.secondary} size={20} />
        </TouchableOpacity>

        {/* Cart */}
        <TouchableOpacity
          className="p-2 rounded-full bg-white border"
          style={{ borderColor: colors.neutral }}
        >
          <ShoppingCart color={colors.primary} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
