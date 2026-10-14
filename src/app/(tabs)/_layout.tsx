import { Tabs } from "expo-router";
import { Home, Menu, ShoppingBag, Trees } from "lucide-react-native";
import { useState } from "react";
import { Platform } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppHeader from "@/src/components/app-header";
import TabIcon from "@/src/components/shared/TabIcon";
import { colors } from "@/src/constants/colors";
import { HomeScrollProvider } from "@/src/contexts/HomeScrollContext";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const [pressKey, setPressKey] = useState(0);

  const isIOS = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";
  const hasAndroidNavBar = isAndroid && insets.bottom > 0;
  const isGestureNav = isAndroid && insets.bottom === 0;

  return (
    <HomeScrollProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.dark,
          tabBarHideOnKeyboard: true,

          tabBarStyle: {
            position: "absolute",
            bottom: 0,

            height: 66 + insets.bottom,

            backgroundColor: colors.bgColor,
            borderTopWidth: 0,

            shadowColor: colors.dark,
            shadowOpacity: 0.08,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 18,

            paddingHorizontal: 10,

            paddingTop: isGestureNav ? 14 : 0,

            paddingBottom: isIOS
              ? Math.max(insets.bottom, 6)
              : hasAndroidNavBar
                ? insets.bottom
                : isGestureNav
                  ? 16
                  : 10,
          },

          tabBarItemStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            header: () => <AppHeader variant="home" />,
            tabBarButton: ({ onPress, children }) => (
              <Pressable
                onPress={(e) => {
                  setPressKey((prev) => prev + 1);
                  onPress?.(e);
                }}
                style={({ pressed }) => ({
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                {children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                pressKey={pressKey}
                icon={
                  <Home
                    size={23}
                    color={focused ? colors.primary : "#8C8C8C"}
                    strokeWidth={1.9}
                  />
                }
                label="Home"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="orchards"
          options={{
            title: "Orchards",
            header: () => <AppHeader variant="orchards" />,
            tabBarButton: ({ onPress, children }) => (
              <Pressable
                onPress={(e) => {
                  setPressKey((prev) => prev + 1);
                  onPress?.(e);
                }}
                style={({ pressed }) => ({
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                {children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                pressKey={pressKey}
                icon={
                  <Trees
                    size={23}
                    color={focused ? colors.primary : "#8C8C8C"}
                    strokeWidth={1.9}
                  />
                }
                label="Orchards"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="products"
          options={{
            title: "Shop",
            header: () => <AppHeader variant="products" />,
            tabBarButton: ({ onPress, children }) => (
              <Pressable
                onPress={(e) => {
                  setPressKey((prev) => prev + 1);
                  onPress?.(e);
                }}
                style={({ pressed }) => ({
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                {children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                pressKey={pressKey}
                icon={
                  <ShoppingBag
                    size={23}
                    color={focused ? colors.primary : "#8C8C8C"}
                    strokeWidth={1.9}
                  />
                }
                label="Shop"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="more"
          options={{
            title: "Menu",
            header: () => <AppHeader variant="menu" />,
            tabBarButton: ({ onPress, children }) => (
              <Pressable
                onPress={(e) => {
                  setPressKey((prev) => prev + 1);
                  onPress?.(e);
                }}
                style={({ pressed }) => ({
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                {children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                pressKey={pressKey}
                icon={
                  <Menu
                    size={23}
                    color={focused ? colors.primary : "#8C8C8C"}
                    strokeWidth={1.9}
                  />
                }
                label="Menu"
              />
            ),
          }}
        />
      </Tabs>
    </HomeScrollProvider>
  );
}
