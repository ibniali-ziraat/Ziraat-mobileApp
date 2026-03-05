import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import BackHeader from "../components/shared/BackHeader";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-light">
      <BackHeader title="Back" />

      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        pointerEvents="box-none"
      >
        <Text onPress={() => router.replace("/")}>
          <Image
            source={require("../../assets/images/logo.jpeg")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
        </Text>

        <Text
          className="text-2xl font-semibold mb-2 text-center"
          style={{ color: colors.primary }}
        >
          We're Working on It
        </Text>

        <Text className="text-base text-center" style={{ color: colors.dark }}>
          This page is under construction. Check back soon!
        </Text>
      </View>
    </View>
  );
}
