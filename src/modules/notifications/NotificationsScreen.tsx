import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { useLocationContext } from "@/src/contexts/LocationContext";
import { useFocusEffect } from "@react-navigation/native";
import { EllipsisVertical } from "lucide-react-native";
import { useCallback, useState } from "react";
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

  const { items, removeNotification, clearNotifications, markAllAsRead } =
    useNotifications();

  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmClearVisible, setConfirmClearVisible] = useState(false);

  // Viewing the list is what clears the bell badge — matches standard app
  // behavior instead of only clearing on delete.
  useFocusEffect(
    useCallback(() => {
      markAllAsRead();
    }, [markAllAsRead]),
  );

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

      {/* MENU MODAL */}
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
          <View
            style={{
              position: "absolute",
              top: 100,
              right: 40,
            }}
            className="w-52 bg-white rounded-xl py-1 shadow-lg"
          >
            <TouchableOpacity
              className="px-4 py-2"
              onPress={() => {
                setMenuVisible(false);
                setConfirmClearVisible(true);
              }}
            >
              <Text className="text-[16px] text-error font-medium">
                Clear All Notifications
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* CONFIRM CLEAR MODAL */}
      <Modal
        transparent
        visible={confirmClearVisible}
        animationType="fade"
        onRequestClose={() => setConfirmClearVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-center items-center"
          onPress={() => setConfirmClearVisible(false)}
        >
          <View className="w-80 bg-white rounded-xl p-4">
            <Text className="text-[17px] font-semibold text-dark mb-2">
              Clear all notifications?
            </Text>

            <Text className="text-[15px] text-gray-500 mb-4">
              This action cannot be undone.
            </Text>

            <View className="flex-row justify-end gap-3">
              <TouchableOpacity onPress={() => setConfirmClearVisible(false)}>
                <Text className="text-dark font-medium">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  clearNotifications();
                  setConfirmClearVisible(false);
                }}
              >
                <Text className="text-error font-semibold">Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      <ScreenLayout scrollable>
        <RefreshControl tintColor={colors.primary} colors={[colors.primary]} />

        <ScreenContent className="flex-1">
          <View className="flex-1 bg-light">
            <LocationBanner visible={locationOff} />

            {items.length > 0 ? (
              <NotificationList
                items={items}
                onDelete={removeNotification}
                onClearAll={clearNotifications}
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
