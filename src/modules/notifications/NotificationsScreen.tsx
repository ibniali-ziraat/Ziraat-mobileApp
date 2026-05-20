import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { useLocationContext } from "@/src/contexts/LocationContext";
import { EllipsisVertical } from "lucide-react-native";
import { useState } from "react";
import {
  Modal,
  Pressable,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ScreenLayout from "@/src/components/shared/ScreenLayout";
import EmptyState from "./components/EmptyState";
import LocationBanner from "./components/LocationBanner";
import NotificationList from "./components/NotificationList";
import { useNotifications } from "./hooks/useNotifications";

export default function NotificationsScreen() {
  const { status: locationStatus } = useLocationContext();

  const { items, refreshing, deleteOne, deleteAll, onRefresh } =
    useNotifications();

  const [menuVisible, setMenuVisible] = useState(false);

  const locationOff =
    locationStatus === "denied" || locationStatus === "disabled";

  return (
    <View className="flex-1 bg-bgColor">
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

      <BackHeader
        title="Notifications"
        desc="See what's new and get notified about important updates"
        rightIcon={<EllipsisVertical size={22} color={colors.dark} />}
        onRightIconPress={() => setMenuVisible(true)}
      />

      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/10"
          onPress={() => setMenuVisible(false)}
        >
          <View className="absolute top-24 right-5 w-48 bg-white rounded-xl py-1 shadow-lg">
            <TouchableOpacity
              className="px-4 py-3"
              onPress={() => {
                console.log("All Notifications");
                setMenuVisible(false);
              }}
            >
              <Text className="text-[14px] text-gray-800">
                All Notifications
              </Text>
            </TouchableOpacity>

            <View className="h-[1px] bg-gray-100" />

            <TouchableOpacity
              className="px-4 py-3"
              onPress={() => {
                console.log("Unread Notifications");
                setMenuVisible(false);
              }}
            >
              <Text className="text-[14px] text-gray-800">
                Unread Notifications
              </Text>
            </TouchableOpacity>

            <View className="h-[1px] bg-gray-100" />

            <TouchableOpacity
              className="px-4 py-3"
              onPress={() => {
                console.log("Mark All as Read");
                setMenuVisible(false);
              }}
            >
              <Text className="text-[14px] text-gray-800">
                Mark All as Read
              </Text>
            </TouchableOpacity>

            <View className="h-[1px] bg-gray-100" />

            <TouchableOpacity
              className="px-4 py-3"
              onPress={() => {
                deleteAll();
                setMenuVisible(false);
              }}
            >
              <Text className="text-[14px] text-red-500">
                Clear All Notifications
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <ScreenLayout scrollable>
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />

        <ScreenContent className="flex-1">
          <View className="flex-1 bg-light">
            <LocationBanner visible={locationOff} />

            {items.length > 0 ? (
              <NotificationList
                items={items}
                onDelete={deleteOne}
                onClearAll={deleteAll}
              />
            ) : (
              <View className="flex-1">
                <EmptyState />
              </View>
            )}
          </View>
        </ScreenContent>
      </ScreenLayout>
    </View>
  );
}
