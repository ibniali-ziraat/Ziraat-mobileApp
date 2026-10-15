import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { filterArt } from "@/src/constants/iconArt";
import { ROUTES } from "@/src/constants/routes";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

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
      accessibilityRole="button"
      accessibilityLabel="Add orchard"
      style={({ pressed }) => ({
        opacity: pressed ? 0.88 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        position: "absolute",
        right: 24,
        bottom: 130,
        zIndex: 999999,
      })}
    >
      <View
        style={{
          height: 54,
          borderRadius: 27,
          paddingLeft: 7,
          paddingRight: 18,
          flexDirection: "row",
          backgroundColor: colors.primary,
          alignItems: "center",
          elevation: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <SvgXml xml={filterArt.add} width={28} height={28} />
        </View>
        <Text
          style={[
            typography.Poppins_s_semibold,
            { color: "#FFFFFF", fontSize: 14, marginLeft: 10 },
          ]}
        >
          Add orchard
        </Text>
      </View>
    </Pressable>
  );
}
