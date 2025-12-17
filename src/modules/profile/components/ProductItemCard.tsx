// components/ProductItemCard.tsx

import { Text, View } from "react-native";

export default function ProductItemCard({ name, stock, unit }) {
  return (
    <View className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
      {/* Product Name */}
      <Text className="text-gray-900 text-base font-semibold mb-1">{name}</Text>

      {/* Stock Row */}
      <View className="flex-row justify-between mt-1">
        <Text className="text-gray-500 text-sm">Stock</Text>
        <Text className="text-gray-700 font-medium text-sm">
          {stock || "Not Provided"}
        </Text>
      </View>

      {/* Unit Row */}
      {unit ? (
        <View className="flex-row justify-between mt-1">
          <Text className="text-gray-500 text-sm">Unit</Text>
          <Text className="text-gray-700 font-medium text-sm">{unit}</Text>
        </View>
      ) : null}
    </View>
  );
}
