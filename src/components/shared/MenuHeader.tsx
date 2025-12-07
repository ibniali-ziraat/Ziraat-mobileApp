import { colors } from "@/src/constants/colors";
import { router } from "expo-router";
import { BarChart2, PhoneCall, Store, User } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuHeaderProps {
  role: "farmer" | "supplier";
  onToggleRole: () => void; // parent controls role state
}

export default function MenuHeader({ role, onToggleRole }: MenuHeaderProps) {
  return (
    <View className="flex-row items-center justify-between h-16 px-4 bg-white">
      {/* Title & Subtitle */}
      <View>
        <Text className="text-lg font-bold" style={{ color: colors.dark }}>
          Menu
        </Text>

        <Text className="text-sm" style={{ color: colors.neutral }}>
          {role === "supplier" ? "Supplier Dashboard" : "Farmer Dashboard"}
        </Text>
      </View>

      {/* Right Actions */}
      <View className="flex-row items-center space-x-3">
        {/* ROLE SWITCH BUTTON */}

        {/* Action Buttons Based on Role */}
        {role === "supplier" ? (
          <>
            {/* Supplier Dashboard */}
            <TouchableOpacity
              className="p-2 rounded-full bg-white border"
              style={{ borderColor: colors.neutral }}
              onPress={() =>
                router.push({
                  pathname: "/DashboardPage",
                  params: { role: "supplier" },
                })
              }
            >
              <Store color={colors.primary} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              className="p-2 rounded-full bg-white border"
              style={{ borderColor: colors.neutral }}
              onPress={() => router.push("/auth/vendor/vendor-profile-screen")}
            >
              <User color={colors.secondary} size={20} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Expert Call */}
            <TouchableOpacity
              className="p-2 rounded-full bg-white border"
              style={{ borderColor: colors.neutral }}
              onPress={() => console.log("Call Expert")}
            >
              <PhoneCall color={colors.primary} size={20} />
            </TouchableOpacity>

            {/* Analytics */}
            <TouchableOpacity
              className="p-2 rounded-full bg-white border"
              style={{ borderColor: colors.neutral }}
              onPress={() =>
                router.push({
                  pathname: "/DashboardPage",
                  params: { role: "farmer" },
                })
              }
            >
              <BarChart2 color={colors.secondary} size={20} />
            </TouchableOpacity>

            {/* Weather Alerts */}
            {/* <TouchableOpacity
              className="p-2 rounded-full bg-white border"
              style={{ borderColor: colors.neutral }}
              onPress={() => console.log("Weather Alerts")}
            >
              <CloudRain color={colors.primary} size={20} />
            </TouchableOpacity> */}
          </>
        )}
      </View>
    </View>
  );
}
