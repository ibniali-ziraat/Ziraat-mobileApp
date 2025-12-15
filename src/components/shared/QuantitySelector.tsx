import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function QuantitySelector({ quantity, setQuantity }) {
  return (
    <View className="flex-row items-center rounded-xl border border-dark bg-white">
      <TouchableOpacity
        onPress={() => quantity > 1 && setQuantity(quantity - 1)}
        className="px-4 py-1"
      >
        <Text className="text-dark text-lg font-bold">-</Text>
      </TouchableOpacity>

      <Text className="mx-4 text-xl font-bold text-dark">{quantity}</Text>

    
      <TouchableOpacity
        onPress={() => setQuantity(quantity + 1)}
        className="px-4 py-1"
      >
        <Text className="text-dark text-lg font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
}
