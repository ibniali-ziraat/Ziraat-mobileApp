// components/home/FarmerTipsCard.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const tips = [
  {
    icon: "shield-checkmark-outline",
    title: "Always Wear Protective Gear",
    desc: "Use gloves, masks, and eyewear while spraying pesticides.",
  },
  {
    icon: "water-outline",
    title: "Irrigate During Early Hours",
    desc: "Reduces evaporation & improves water efficiency.",
  },
  {
    icon: "leaf-outline",
    title: "Use Organic Fertilizers",
    desc: "Improves soil health naturally.",
  },
  {
    icon: "sunny-outline",
    title: "Check Weather Before Spraying",
    desc: "Avoid windy or rainy days.",
  },
];

export default function FarmerTipsCard() {
  return (
    <View className="rounded-2xl overflow-hidden border border-[#e1f1dd] bg-[#f6faf4] mb-12">
      <LinearGradient
        colors={["#4da82d", "#e57b3a"]}
        className="p-4 flex-row items-center"
      >
        <Ionicons name="bulb-outline" size={26} color="#fff" />
        <Text className="text-white font-semibold text-lg ml-2">
          Smart Farming Tips
        </Text>
      </LinearGradient>

      <View className="p-4 space-y-4">
        {tips.map((tip, i) => (
          <View key={i} className="flex-row items-start">
            <Ionicons name={tip.icon} size={20} color="#2d6b06" />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">{tip.title}</Text>
              <Text className="text-xs text-gray-600 mt-1">{tip.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
