import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Orchard",
      icon: "add-circle-outline",
      color: colors.primary,
      bg: colors.primary + "15",
      onPress: () => router.push(ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO),
    },
    {
      title: "Log Harvest",
      icon: "book-outline",
      color: colors.primary,
      bg: colors.primary + "15",
      // onPress: () => router.push("/harvest-screen"),
    },
  ];

  return (
    <View style={{ marginBottom: 20, marginTop: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {actions.map((item, idx) => (
          <Pressable
            key={idx}
            onPress={item.onPress}
            style={{
              width: "48%",
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
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>

            <CsText style={[typography.Poppins_s_regular]}>{item.title}</CsText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
