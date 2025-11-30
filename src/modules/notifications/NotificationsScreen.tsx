import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { Bell, Droplet, Leaf } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function NotificationScreen() {
  const router = useRouter();

  // Sample notifications
  const notifications = [
    {
      id: 1,
      icon: <Leaf color={colors.secondary} size={28} />,
      message: "Apple trees need watering today.",
      time: "2 hours ago",
    },
    {
      id: 2,
      icon: <Droplet color={colors.secondary} size={28} />,
      message: "Irrigation system completed cycle.",
      time: "5 hours ago",
    },
    {
      id: 3,
      icon: <Bell color={colors.secondary} size={28} />,
      message: "Harvest is ready for 12 trees.",
      time: "1 day ago",
    },
  ];

  return (
    <ScrollView
      className="flex-1 p-5"
      style={{ backgroundColor: colors.light }}
    >
      {/* Header */}
      <BackHeader>Notifications</BackHeader>

      {/* Notifications List */}
      <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 20 }}>
        {notifications.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Bell color={colors.gray} size={48} />
            <Text
              className="mt-4 text-lg font-medium"
              style={{ color: colors.gray }}
            >
              No new notifications
            </Text>
          </View>
        ) : (
          notifications.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center py-2 mb-3 rounded-xl"
              style={{ backgroundColor: colors.blackHover }}
            >
              <View className="mr-4">{item.icon}</View>
              <View className="flex-1">
                <Text
                  className="text-base font-medium"
                  style={{ color: colors.black }}
                >
                  {item.message}
                </Text>
                <Text className="text-sm mt-1" style={{ color: colors.gray }}>
                  {item.time}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </ScrollView>
  );
}
