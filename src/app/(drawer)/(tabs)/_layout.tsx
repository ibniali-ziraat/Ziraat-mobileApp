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
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 50 + insets.bottom,
          height: insets.bottom,
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 0.5,
          shadowColor: colors.blackHover,
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
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="orchards"
        options={{
          title: "Crops",
          tabBarIcon: ({ color, size }) => <Trees color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="Product"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => <Menu color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
