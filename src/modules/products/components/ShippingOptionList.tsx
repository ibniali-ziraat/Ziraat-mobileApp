import SHIPPING_OPTIONS from "@/src/Data/shippingOptions.json";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function ShippingOptionList({
  selectedOption,
  setSelectedOption,
}) {
  return (
    <FlatList
      data={SHIPPING_OPTIONS}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isSelected = selectedOption?.id === item.id;

        return (
          <TouchableOpacity
            onPress={() => setSelectedOption(item)}
            className="p-4 mb-3 rounded-xl border border-neutral"
          >
            <View className="flex-row justify-between items-center">
          
              <View className="flex-row items-start gap-3">
                <View
                  className={`h-5 w-5 rounded-full border-2 ${
                    isSelected ? "border-secondary" : "border-neutral"
                  } flex items-center justify-center`}
                >
                  {isSelected && (
                    <View className="h-2.5 w-2.5 bg-secondary rounded-full" />
                  )}
                </View>

      
                <View>
                  <Text className="font-bold">{item.title}</Text>
                  <Text className="text-dark">{item.delivery}</Text>
                </View>
              </View>

            
              <Text className="text-secondary font-semibold">
                {item.price}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
