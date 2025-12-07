import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false, // We handle headers per tab
        }}
        // drawerContent={(props) => (
        //   <CustomDrawer {...props} menuGroups={menuGroups} />
        // )}
      >
        {/* Main Tabs */}
        <Drawer.Screen
          name="(drawer)/(tabs)"
          options={{ drawerLabel: "Home" }}
        />

        {/* FARMER PAGES - hidden from drawer */}
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

        {/* VENDOR PAGES - hidden from drawer */}
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
          options={{ drawerLabel: "Settings" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
