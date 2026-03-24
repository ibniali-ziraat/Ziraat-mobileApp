import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { Bell, Droplet, Leaf } from "lucide-react-native";
import { View } from "react-native";

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
    <ScreenLayout>
      <BackHeader title="Notifications" />
      <ScreenContent>
        {notifications.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Bell color={colors.dark} size={48} />
            <CsText
              className="mt-4 text-lg font-medium"
              style={{ color: colors.dark }}
            >
              No new notifications
            </CsText>
          </View>
        ) : (
          notifications.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center py-2 mb-3 rounded-xl"
              style={{ backgroundColor: colors.light }}
            >
              <View className="mr-4">{item.icon}</View>
              <View className="flex-1">
                <CsText
                  className="text-base font-medium"
                  style={{ color: colors.dark }}
                >
                  {item.message}
                </CsText>
                <CsText className="text-sm mt-1" style={{ color: colors.dark }}>
                  {item.time}
                </CsText>
              </View>
            </View>
          ))
        )}
      </ScreenContent>
    </ScreenLayout>
  );
}
