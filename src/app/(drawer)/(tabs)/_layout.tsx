import CropHeader from "@/src/components/shared/CropHeader";
import HomeHeader from "@/src/components/shared/HomeHeader";
import Loader from "@/src/components/shared/Loader";
import MenuHeader from "@/src/components/shared/MenuHeader";
import ProductHeader from "@/src/components/shared/ProductHeader";
import TabIcon from "@/src/components/shared/TabIcon";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { Tabs } from "expo-router";
import { getItem } from "expo-secure-store";
import { Home, Menu, ShoppingBag, Trees } from "lucide-react-native";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  // const { roleMode, userData } = useGlobalData();
  const { userId, roleMode } = useAuth();

  const { data } = useProfileQuery(userId);

  console.log(data, "user profile data...");

  // if (!userId || !data) {
  //   return <Loader />

  // }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.dark,

        tabBarStyle: {
          elevation: 0.5,
          height: 0,
          paddingBottom: insets.bottom + 50,
          shadowColor: colors.overlay,
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        lazy: true, // load screens only when they are focused
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <HomeHeader title={data?.fullName} />,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={<Home size={22} color={color} />}
              label="Home"
              color={color}
            />
          ),
        }}
      />

      {/* Crops Tab */}
      <Tabs.Screen
        name="orchards"
        options={{
          title: "Crops",
          header: () => <CropHeader />,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={<Trees size={22} color={color} />}
              label="Crops"
              color={color}
            />
          ),
        }}
      />

      {/* Products Tab */}
      <Tabs.Screen
        name="Product"
        options={{
          title: "Products",
          header: () => <ProductHeader />,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={<ShoppingBag size={22} color={color} />}
              label="Products"
              color={color}
            />
          ),
        }}
      />

      {/* Menu Tab */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          header: () => <MenuHeader role={roleMode} />,

          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={<Menu size={22} color={color} />}
              label="Menu"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
