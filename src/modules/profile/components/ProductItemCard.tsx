// components/ProductItemCard.tsx

import CsText from "@/src/components/shared/CsText";
import { View } from "react-native";

export default function ProductItemCard({ name, stock, unit }) {
  return (
    <View className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
      {/* Product Name */}
      <CsText className="text-gray-900 text-base font-semibold mb-1">{name}</CsText>

      {/* Stock Row */}
      <View className="flex-row justify-between mt-1">
        <CsText className="text-gray-500 text-sm">Stock</CsText>
        <CsText className="text-gray-700 font-medium text-sm">
          {stock || "Not Provided"}
       </CsText>
      </View>

      {/* Unit Row */}
      {unit ? (
        <View className="flex-row justify-between mt-1">
          <CsText className="text-gray-500 text-sm">Unit</CsText>
          <CsText className="text-gray-700 font-medium text-sm">{unit}</CsText>
        </View>
      ) : null}
    </View>
  );
}
