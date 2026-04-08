import { useNotifications } from "@/src/contexts/NotificationContext";
import {
  AlertCircle,
  AlertTriangle,
  BellOff,
  Leaf,
  Trash2,
  X,
} from "lucide-react-native";
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationScreen() {
  const { notifications, removeNotification, clearAll } = useNotifications();

  const getTypeConfig = (title: string) => {
    const t = title.toLowerCase();

    if (
      t.includes("frost") ||
      t.includes("alert") ||
      t.includes("warning") ||
      t.includes("urgent")
    ) {
      return {
        Icon: AlertTriangle,
        iconColor: "#c7611f",
        iconBg: "bg-red-50",
        dot: "bg-red-400",
        tag: "Urgent",
        tagColor: "text-red-700",
        accent: "border-l-red-400",
      };
    }

    if (t.includes("pest") || t.includes("crop") || t.includes("disease")) {
      return {
        Icon: AlertCircle,
        iconColor: "#f5a623",
        iconBg: "bg-amber-50",
        dot: "bg-amber-400",
        tag: "Crop Health",
        tagColor: "text-amber-700",
        accent: "border-l-amber-400",
      };
    }

    return {
      Icon: Leaf,
      iconColor: "#2d6b06",
      iconBg: "bg-emerald-50",
      dot: "bg-emerald-500",
      tag: "Weather",
      tagColor: "text-emerald-700",
      accent: "border-l-emerald-400",
    };
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear all notifications?",
      "This will remove all alerts permanently.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: clearAll },
      ]
    );
  };

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center mt-32 gap-3">
      <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center">
        <BellOff size={28} color="#c7611f" />
      </View>
      <Text className="text-base font-bold text-gray-500">
        No notifications yet
      </Text>
      <Text className="text-sm text-gray-400 text-center px-8">
        You'll see farm alerts and tips here as they arrive.
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-5 pt-14 pb-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Notifications
            </Text>
            <Text className="text-sm text-gray-400 mt-0.5">
              {notifications.length > 0
                ? `${notifications.length} alert${notifications.length > 1 ? "s" : ""}`
                : "All caught up"}
            </Text>
          </View>

          {notifications.length > 0 && (
            <TouchableOpacity
              onPress={handleClearAll}
              className="px-3 py-1.5 rounded-xl bg-red-50 flex-row items-center gap-1"
            >
              <Trash2 size={13} color="#E24B4A" />
              <Text className="text-[12px] font-medium text-red-500">
                Clear all
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 🔥 KEY FIX: spread notifications to force new array reference */}
      <FlatList
        data={[...notifications]}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const cfg = getTypeConfig(item.title);

          return (
            <View
              className={`bg-white rounded-2xl border-l-4 ${cfg.accent}`}
            >
              <View className="flex-row items-start gap-3 px-4 py-3.5">
                <View
                  className={`w-9 h-9 rounded-xl items-center justify-center ${cfg.iconBg}`}
                >
                  <cfg.Icon size={18} color={cfg.iconColor} />
                </View>

                <View className="flex-1">
                  <Text className="text-[13px] font-semibold text-gray-900">
                    {item.title}
                  </Text>
                  <Text className="text-[12px] text-gray-500 mt-0.5">
                    {item.message}
                  </Text>
                  <Text className="text-[11px] text-gray-400 mt-1">
                    {item.time}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => removeNotification(item.id)}>
                  <X size={13} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}