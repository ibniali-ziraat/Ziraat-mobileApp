import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { useLocationContext } from "@/src/contexts/LocationContext";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
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
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
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
          <View style={styles.inner}>
            <NotificationHeader count={items.length} onClearAll={deleteAll} />

            <LocationBanner visible={locationOff} />

            {items.length > 0 ? (
              <NotificationList items={items} onDelete={deleteOne} />
            ) : (
              <EmptyState />
            )}
          </View>
        </ScreenContent>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  content: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: colors.light,
    paddingTop: 16,
  },
});
