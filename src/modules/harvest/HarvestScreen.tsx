import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import harvestData from "@/src/data/harvest.json";
import {
  BadgeCheck,
  Calendar,
  MapPin,
  Package,
  Sprout,
  User2,
  Wheat,
} from "lucide-react-native";
import { Text, View } from "react-native";

export default function HarvestScreen() {
  return (
    <ScreenLayout scrollable={true}>
      <View className="flex-1">
        <BackHeader title="Harvest Details" desc="All harvest records" />

        <ScreenContent>
          <View
            style={{ backgroundColor: colors.bgColor }}
            className="rounded-3xl p-5 mb-5"
          >
            <Text className="text-dark text-lg font-bold">
              Harvest Overview
            </Text>

            <Text className="text-dark text-sm mt-1">
              Track all completed and pending harvest activities.
            </Text>

            <View className="flex-row justify-between mt-5">
              <View>
                <Text
                  style={{ color: colors.secondary }}
                  className=" text-2xl font-bold"
                >
                  {harvestData.length}
                </Text>

                <Text style={{ color: colors.secondary }} className="text-xs">
                  Total Harvests
                </Text>
              </View>

              <View>
                <Text
                  style={{ color: colors.primary }}
                  className=" text-2xl font-bold"
                >
                  {
                    harvestData.filter((item) => item.status === "Completed")
                      .length
                  }
                </Text>

                <Text style={{ color: colors.primary }} className=" text-xs">
                  Completed
                </Text>
              </View>

              <View>
                <Text
                  style={{ color: colors.error }}
                  className=" text-2xl font-bold"
                >
                  {
                    harvestData.filter((item) => item.status !== "Completed")
                      .length
                  }
                </Text>

                <Text style={{ color: colors.error }} className=" text-xs">
                  Pending
                </Text>
              </View>
            </View>
          </View>

          {harvestData.map((item) => (
            <View
              style={{ borderBlockColor: colors.cardBorder }}
              key={item.id}
              className="bg-white rounded-3xl p-5 mb-5  shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 pr-3">
                  <View className="flex-row items-center">
                    <View className=" p-2 rounded-xl mr-3">
                      <Wheat size={18} color={colors.primary} />
                    </View>

                    <View>
                      <Text
                        style={{ color: colors.dark }}
                        className="text-lg font-bold"
                      >
                        {item.cropName}
                      </Text>

                      <Text
                        style={{ color: colors.dark }}
                        className="text-sm mt-0.5"
                      >
                        Harvest Batch #{item.id}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{ backgroundColor: colors.bgColor }}
                    className="flex-row items-center mt-4  px-3 py-2 rounded-xl"
                  >
                    <Package size={16} color={colors.primary} />

                    <Text className="text-sm text-dark font-semibold ml-2">
                      Quantity: {item.quantity}
                    </Text>
                  </View>
                </View>

                <View
                  style={{ backgroundColor: colors.primary }}
                  className={`px-4 py-2 rounded-full ${
                    item.status === "Completed" ? "text-white" : "text-warning"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold tesxt-white ${
                      item.status === "Completed"
                        ? "text-white"
                        : "text-warning"
                    }`}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View
                style={{ backgroundColor: colors.bgColor }}
                className="flex-row items-center rounded-2xl px-4 py-3 mb-4"
              >
                <View
                  style={{ backgroundColor: colors.primary }}
                  className=" p-2 rounded-full"
                >
                  <User2 size={18} color={colors.light} />
                </View>

                <View className="ml-3">
                  <Text className="text-xs text-dark ">Harvested By</Text>

                  <Text className="text-sm font-semibold text-dark">
                    {item.farmerName}
                  </Text>
                </View>
              </View>

              <View className="h-[1px] bg-gray-200 mb-4" />

              <View className="flex-row justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-4">
                    <View className=" p-2 rounded-lg">
                      <Calendar size={16} color={colors.secondary} />
                    </View>

                    <View className="ml-3">
                      <Text className="text-[12.5px] text-dark">
                        Harvest Date
                      </Text>

                      <Text className="text-sm font-medium text-primary">
                        {item.harvestDate}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <View className="p-2 rounded-lg">
                      <Sprout size={16} color={colors.secondary} />
                    </View>

                    <View className="ml-3">
                      <Text className="text-[12.5px] text-dark">
                        Crop Quality
                      </Text>

                      <Text className="text-sm font-medium text-primary">
                        {item.quality}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Right */}
                <View className="flex-1 items-end">
                  <View className="flex-row items-center mb-4">
                    <View className="p-2 rounded-lg">
                      <MapPin size={16} color={colors.secondary} />
                    </View>

                    <View className="ml-3 items-end">
                      <Text className="text-[12.5px] text-dark">Location</Text>

                      <Text className="text-sm font-medium text-dark">
                        {item.location}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <View className=" p-2 rounded-lg">
                      <BadgeCheck size={18} color={colors.primary} />
                    </View>

                    <View className="ml-3 items-end">
                      <Text className="text-[12.5px] text-dark">Record ID</Text>

                      <Text className="text-sm font-semibold text-dark">
                        #{item.id}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScreenContent>
      </View>
    </ScreenLayout>
  );
}
