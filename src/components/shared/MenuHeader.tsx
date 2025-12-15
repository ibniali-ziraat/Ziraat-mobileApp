import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useVendorProfileQuery } from "@/src/hooks/vendorQueryHooks";
import { router } from "expo-router";
import { BarChart2, PhoneCall, Store, User } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuHeaderProps {
  role: "farmer" | "supplier";
  onToggleRole: () => void; // parent controls role state
}

const MenuHeader = ({ role, onToggleRole }: MenuHeaderProps) => {
  const { userId } = useAuth();
  const { data: profileData, isPending: loadingVendorProfile } =
    useVendorProfileQuery(userId);

  const showBecomeSupplier = role === "supplier" && !profileData; // Show button if no vendor profile

  return (
    <View className="flex-row items-center justify-between bg-light py-4">
      {/* Title & Subtitle */}
      <View>
        <Text className="text-xl font-bold" style={{ color: colors.dark }}>
          Menu
        </Text>

        <Text className="text-md" style={{ color: colors.neutral }}>
          {role === "supplier" ? "Supplier Dashboard" : "Farmer Dashboard"}
        </Text>
      </View>

      {/* Right Actions */}
      <View className="flex-row items-center space-x-3">
        {role === "supplier" && profileData ? (
          <>
            {/* Supplier Dashboard */}
            <TouchableOpacity
              className="p-2 rounded-full bg-white border mr-2"
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

            {/* Supplier Profile */}
            <TouchableOpacity
              className="p-2 rounded-full bg-white border"
              style={{ borderColor: colors.neutral }}
              onPress={() => router.push("/auth/vendor/vendor-profile-screen")}
            >
              <User color={colors.secondary} size={20} />
            </TouchableOpacity>
          </>
        ) : showBecomeSupplier ? (
          // Show Become a Supplier button if no vendor data
          <TouchableOpacity
            onPress={() => router.push(ROUTES.AUTH.VENDOR_ONBOARD)}
            activeOpacity={0.85}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              borderRadius: 999, // pill style (Airbnb-like)
              backgroundColor: colors.light,
              borderWidth: 1,
              borderColor: colors.neutral,
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Become a Supplier
            </Text>
          </TouchableOpacity>
        ) : role === "farmer" ? (
          <>
            {/* Farmer Actions */}
            <TouchableOpacity
              className="p-2 rounded-full bg-white border mr-2"
              style={{ borderColor: colors.neutral }}
              onPress={() => console.log("Call Expert")}
            >
              <PhoneCall color={colors.primary} size={20} />
            </TouchableOpacity>

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
          </>
        ) : null}
      </View>
    </View>
  );
};

export default React.memo(MenuHeader);
