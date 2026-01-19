
import { Tabs } from "expo-router";
import {
  Home,
  LucideDroplets,
  Menu,
  ShoppingBag,
  Trees,
} from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CropHeader from "@/src/components/shared/CropHeader";
import HomeHeader from "@/src/components/shared/HomeHeader";
import MenuHeader from "@/src/components/shared/MenuHeader";
import ProductHeader from "@/src/components/shared/ProductHeader";
import SprayHeader from "@/src/components/shared/SprayHeader";
import TabIcon from "@/src/components/shared/TabIcon";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { roleMode, userId, userToken } = useAuth();
  const { data } = useProfileQuery(userId);

  const [pressKey, setPressKey] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("index");

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.dark,

        //your earlier changes what you were  doing earlier here i replaced that to ensure working for all devices
        // tabBarStyle: {
        //   paddingTop: 12,
        //   shadowColor: colors.overlay,
        //   shadowOpacity: 0.1,
        //   shadowRadius: 5,
        //   paddingBottom: insets.bottom + 50,
        // },

       
        tabBarStyle: {
          position: "absolute",
         

          // Floating spacing from bottom
          bottom: Platform.OS === "ios" ? Math.max(insets.bottom, 10) : 12,

          height: 72,
        

          backgroundColor: colors.bgColor,
          borderTopWidth: 0,

          // Premium shadow
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 18,

          // Smooth inner spacing
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
        },

        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <HomeHeader title={data?.fullName} />,
          tabBarButton: ({ onPress, children }) => (
            <Pressable
              onPress={(e) => {
                setActiveTab("index");
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
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              pressKey={pressKey}
              icon={<Home size={22} color={color} strokeWidth={2.2} />}
              label="Home"
            />
          ),
        }}
      />

      {/* Orchards */}
      <Tabs.Screen
        name="orchards"
        options={{
          title: "Orchards",
          header: () => <CropHeader />,
          tabBarButton: ({ onPress, children }) => (
            <Pressable
              onPress={(e) => {
                setActiveTab("orchards");
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
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              pressKey={pressKey}
              icon={<Trees size={22} color={color} strokeWidth={2.2} />}
              label="Orchards"
            />
          ),
        }}
      />

      {/* Spray */}
      <Tabs.Screen
        name="spray"
        options={{
          title: "Spray",
          header: () => <SprayHeader />,
          tabBarButton: ({ onPress, children }) => (
            <Pressable
              onPress={(e) => {
                setActiveTab("spray");
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
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              pressKey={pressKey}
              icon={
                <LucideDroplets size={22} color={color} strokeWidth={2.2} />
              }
              label="Spray"
            />
          ),
        }}
      />

      {/* Products */}
      <Tabs.Screen
        name="Product"
        options={{
          title: "Products",
          header: () => <ProductHeader />,
          tabBarButton: ({ onPress, children }) => (
            <Pressable
              onPress={(e) => {
                setActiveTab("Product");
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
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              pressKey={pressKey}
              icon={<ShoppingBag size={22} color={color} strokeWidth={2.2} />}
              label="Products"
            />
          ),
        }}
      />

      {/* Menu */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          header: () => <MenuHeader role={roleMode} />,
          tabBarButton: ({ onPress, children }) => (
            <Pressable
              onPress={(e) => {
                setActiveTab("menu");
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
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              pressKey={pressKey}
              icon={<Menu size={22} color={color} strokeWidth={2.2} />}
              label="Menu"
            />
          ),
        }}
      />
    </Tabs>
  );
}
