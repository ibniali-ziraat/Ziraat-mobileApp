import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useVendorProfileQuery } from "@/src/modules/auth/vendor/hooks/vendorQueryHooks";
import { router } from "expo-router";
import { BarChart2, PhoneCall, Store, User } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";

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
        <CsText style={[typography.Poppins_l_semibold

          ,{color: colors.dark}
        ] }>
          Menu
        </CsText>

        <CsText style={[typography.Poppins_s_regular

          ,{ color: colors.neutral }]}>
          {role === "supplier" ? "Supplier Dashboard" : "Farmer Dashboard"}
        </CsText>
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
                  pathname: "/dashboards",
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
              onPress={() => router.push(ROUTES.VENDOR.PROFILE)}
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
            <CsText
              style={{
                color: colors.primary,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Become a Supplier
            </CsText>
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
                  pathname: "/dashboards",
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
