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
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 0,
          paddingTop: 12,
          backgroundColor: colors.light,
          borderTopWidth: 0,
          shadowColor: colors.overlay,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 5,
          elevation: 10, // Android shadow
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon icon={<Home size={22} color={color} />} label="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="orchards"
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon icon={<Trees size={22} color={color} />} label="Crops" />
          ),
        }}
      />

      <Tabs.Screen
        name="Product"
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={<ShoppingBag size={22} color={color} />}
              label="Products"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon icon={<Menu size={22} color={color} />} label="Menu" />
          ),
        }}
      />
    </Tabs>
  );
}
