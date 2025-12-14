import CropHeader from "@/src/components/shared/CropHeader";
import HomeHeader from "@/src/components/shared/HomeHeader";
import Loader from "@/src/components/shared/Loader";
import MenuHeader from "@/src/components/shared/MenuHeader";
import ProductHeader from "@/src/components/shared/ProductHeader";
import TabIcon from "@/src/components/shared/TabIcon";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { Tabs } from "expo-router";
import { Home, Menu, ShoppingBag, Trees } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  // const { roleMode, userData } = useGlobalData();
  const { userId, roleMode } = useAuth();

  const { data } = useProfileQuery(userId);
  console.log(userId, data);

  console.log("user profile data...");

  if (!userId || !data) {
    return <Loader />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.dark,
        tabBarStyle: {
          paddingTop: 12,
          shadowColor: colors.overlay,
          shadowOpacity: 0.1,
          shadowRadius: 5,
          paddingBottom: insets.bottom + 50,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <HomeHeader title={data?.fullName} />,
          tabBarIcon: ({ size, color }) => (
            <TabIcon icon={<Home size={size} color={color} />} label="Home" />
          ),
        }}
      />

      {/* Crops Tab */}
      <Tabs.Screen
        name="orchards"
        options={{
          title: "Orchards",
          headerShown: false,
          header: () => <CropHeader />,
          tabBarIcon: ({ size, color }) => (
            <TabIcon
              icon={<Trees size={size} color={color} />}
              label="Orchards"
            />
          ),
        }}
      />

      {/* Products Tab */}
      <Tabs.Screen
        name="Product"
        options={{
          title: "Products",
          headerShown: false,

          header: () => <ProductHeader />,
          tabBarIcon: ({ size, color }) => (
            <TabIcon
              icon={<ShoppingBag size={size} color={color} />}
              label="Products"
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

          tabBarIcon: ({ size, color }) => (
            <TabIcon icon={<Menu size={size} color={color} />} label="Menu" />
          ),
        }}
      />
    </Tabs>
  );
}
