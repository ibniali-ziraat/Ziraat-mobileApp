// components/home/WeatherCard.tsx
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function WeatherCard() {
  return (
    <View
      className="rounded-3xl p-6 mb-6"
      style={{
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: colors.neutral,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      {/* Header */}
      <Text
        className="text-[17px] font-semibold mb-4"
        style={{ color: colors.dark }}
      >
        Today
      </Text>

      {/* Main Weather Row */}
      <View className="flex-row justify-between items-center">
        {/* LEFT SIDE */}
        <View>
          {/* Temperature */}
          <Text
            className="text-[48px] font-extrabold leading-none"
            style={{ color: colors.primary }}
          >
            28°
          </Text>

          {/* Condition */}
          <Text
            className="text-[16px] mt-1 font-medium"
            style={{ color: colors.secondary }}
          >
            Sunny
          </Text>

          {/* Min / Max Temperature */}
          <Text
            className="text-[13px] mt-1"
            style={{ color: colors.dark + "99" }}
          >
            H: 32° / L: 15°
          </Text>

          {/* Details */}
          <View className="mt-4 space-y-2">
            <View className="flex-row items-center">
              <Ionicons
                name="water-outline"
                size={20}
                color={colors.secondary}
              />
              <Text className="text-sm ml-2" style={{ color: colors.dark }}>
                Humidity: 65%
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons
                name="rainy-outline"
                size={20}
                color={colors.secondary}
              />
              <Text className="text-sm ml-2" style={{ color: colors.dark }}>
                Rain: 0mm
              </Text>
            </View>
          </View>
        </View>

        {/* RIGHT SIDE ICON */}
        <View className="items-center">
          <View
            style={{
              padding: 18,
              borderRadius: 70,
            
              shadowColor: colors.secondary,
              shadowOpacity: 0.35,
              shadowRadius: 14,
            }}
          >
            <Ionicons
              name="sunny-outline"
              size={62}
              color={colors.secondary}
            />
          </View>

          <Text
            className="text-xs mt-3"
            style={{ color: colors.dark + "CC" }}
          >
            Clear Sky
          </Text>
        </View>
      </View>

      {/* Bottom Stats */}
      <View className="flex-row justify-between mt-6 px-1">

        {/* Rain Chance */}
        <View className="flex-row items-center">
          <View
            style={{
              paddingVertical: 4,
              paddingHorizontal: 10,
              backgroundColor: colors.primary + "22",
              borderRadius: 12,
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="water-outline" size={18} color={colors.primary} />
              <Text
                className="text-sm ml-2"
                style={{ color: colors.primary, fontWeight: "600" }}
              >
                40% • 5mm
              </Text>
            </View>
          </View>
        </View>

        {/* Wind */}
        <View className="flex-row items-center">
          <Ionicons name="navigate-outline" size={18} color={colors.secondary} />
          <Text className="text-sm ml-2" style={{ color: colors.dark }}>
            15 kph NNE
          </Text>
        </View>

        {/* Sunrise */}
        <View className="flex-row items-center">
          <Ionicons name="sunny-outline" size={18} color={colors.primary} />
          <Text className="text-sm ml-2" style={{ color: colors.dark }}>
            6:30 AM
          </Text>
        </View>
      </View>
    </View>
  );
}
