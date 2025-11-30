import AppHeader from "@/src/components/shared/AppHeader";
import { CustomDrawer } from "@/src/navigation/CustomDrawer";
import { menuGroups } from "@/src/navigation/menuGroups";
import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const segments = useSegments();
  const isMenu = segments.includes("menu"); // 🔥 detects /menu tab

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          header: isMenu ? undefined : () => <AppHeader />, // hide header for menu
          headerShown: !isMenu,
          headerLeft: () => null,
        }}
        drawerContent={(props) => (
          <CustomDrawer {...props} menuGroups={menuGroups} />
        )}
      >
        <Drawer.Screen
          name="(drawer)/(tabs)"
          options={{
            drawerLabel: "Home",
            headerShown: false,
          }}
        />

        {/* FARMER PAGES */}
        <Drawer.Screen
          name="(drawer)/(farmer)/OrchardScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(farmer)/WeatherScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(farmer)/NutrientScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(farmer)/PestDiseaseScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(farmer)/ResourcesScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(farmer)/FinancialScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(farmer)/AdvisoryScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(farmer)/AlertScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />

        {/* VENDOR PAGES */}
        <Drawer.Screen
          name="(drawer)/(vendor)/ProfileScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/ReportsScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/CreditScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/FinancialScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/NotificationScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/OffersScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/PlatformScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/ProductsScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/SalesScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="(drawer)/(vendor)/UserScreen"
          options={{ drawerItemStyle: { height: 0 } }}
        />

        {/* SETTINGS */}
        <Drawer.Screen
          name="(drawer)/settings"
          options={{
            drawerLabel: "Settings",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
