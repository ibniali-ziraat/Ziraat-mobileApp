import TabIcon from "@/src/components/shared/TabIcon";
import { colors } from "@/src/constants/colors";
import { Tabs } from "expo-router";
import { Home, Menu, ShoppingBag, Trees } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.dark,

        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 50 + insets.bottom,
          // height: 90 + insets.bottom,
          backgroundColor: colors.light,
          borderTopWidth: 0,
          shadowColor: colors.overlay,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={<Home size={22} color={color} />}
              label="Home"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orchards"
        options={{
          title: "Crops",
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={<Trees size={22} color={color} />}
              label="Crops"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Product"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={<ShoppingBag size={22} color={color} />}
              label="Products"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
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
