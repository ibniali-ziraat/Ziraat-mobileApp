// components/notifications/NotificationHeader.jsx
import CsText from "@/src/components/shared/CsText";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function NotificationHeader({ colors }) {
  return (
    <View
      className="px-4 py-4 flex-row items-center justify-between"
      style={{ backgroundColor: colors.primary }}
    >
      <Ionicons name="arrow-back" size={24} color="#fff" />
      <CsText className="text-white font-semibold text-lg">Notifications</CsText>
      <Ionicons name="notifications-circle" size={30} color="#fff" />
    </View>
  );
}
