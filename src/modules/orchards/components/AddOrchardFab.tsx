import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AddOrchardFAB() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO,
          params: { mode: "create" },
        })
      }
      style={{
        position: "absolute",
        right: 24,
        bottom: 130,
        zIndex: 999999,
      }}
    >
      <View
        style={{
          height: 56,
          width: 56,
          borderRadius: 28,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
          elevation: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 28, lineHeight: 32 }}>+</Text>
      </View>
    </Pressable>
  );
}
