// components/home/QuickActions.tsx
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors"; // use your global theme
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Orchard",
      icon: "add-circle-outline",
      color: colors.primary,
      bg: colors.primary + "15",
      onPress: () => router.push("/orchards/orchard-registration"),
    },
    {
      title: "Log Harvest",
      icon: "book-outline",
      color: colors.primary,
      bg: colors.primary + "15",
      onPress: () => router.push("/orchards/orchard-registration"),
    },
    {
      title: "Add Spray",
      icon: "flask-outline",
      color: colors.secondary,
      bg: colors.secondary + "15",
      onPress: () => router.push("/orchards/orchard-registration"),
    },
  ];

  return (
    <View className="mb-8">
      <View className="flex-row justify-between">
        {actions.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={item.onPress}
            style={{
              width: "32%",
              backgroundColor: "#ffffff",
              borderRadius: 18,
              paddingVertical: 16,
              paddingHorizontal: 8,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 3,
              borderWidth: 1,
              borderColor: item.color + "44",
            }}
          >
            {/* Icon Circle */}
            <View
              style={{
                backgroundColor: item.bg,
                padding: 12,
                borderRadius: 50,
                marginBottom: 10,
              
              }}
            >
              <Ionicons name={item.icon} size={24} color={item.color}  />
            </View>

            {/* <Text
              className="text-[13px] font-semibold text-center"
              style={{ color: colors.dark }}
            >
              {item.title}
            </Text> */}

            <CsText className="text-center"variant="title">{item.title}</CsText>

           
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
