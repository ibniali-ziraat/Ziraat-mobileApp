import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { useLocationContext } from "@/src/contexts/LocationContext";
import { RefreshControl, ScrollView, StatusBar, View } from "react-native";
import EmptyState from "./components/EmptyState";
import LocationBanner from "./components/LocationBanner";
import NotificationHeader from "./components/NotificationHeader";
import NotificationList from "./components/NotificationList";
import { useNotifications } from "./hooks/useNotifications";

export default function NotificationsScreen() {
  const { status: locationStatus } = useLocationContext();

  const { items, refreshing, deleteOne, deleteAll, onRefresh } =
    useNotifications();

  const locationOff =
    locationStatus === "denied" || locationStatus === "disabled";

  return (
    <View className="flex-1 bg-bgColor">
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

      <BackHeader
        title="Notifications"
        desc="See what's new and get notified about important updates"
      />

      <ScrollView
        className="flex-1 bg-bgColor"
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <ScreenContent>
          <View className="flex-1 bg-light pt-2">
            <LocationBanner visible={locationOff} />
            <NotificationHeader count={items.length} onClearAll={deleteAll} />

            {items.length > 0 ? (
              <NotificationList items={items} onDelete={deleteOne} />
            ) : (
              <EmptyState />
            )}
          </View>
        </ScreenContent>
      </ScrollView>
    </View>
  );
}
