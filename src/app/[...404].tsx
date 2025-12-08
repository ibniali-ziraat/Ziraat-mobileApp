import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import BackHeader from "../components/shared/BackHeader"; // import your BackHeader

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-light">
      <BackHeader title="Back" />

      {/* Content */}
      <View className="flex-1 justify-center items-center">
        {/* Logo */}
        <Text className="mb-6" onPress={() => router.replace("/")}>
          <Image
            source={require("../../assets/images/logo.jpeg")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain", // fits image without stretching
            }}
          />
        </Text>

        {/* Title */}
        <Text
          className="text-2xl font-semibold mb-2 text-center"
          style={{ color: colors.primary }}
        >
          We're Working on It
        </Text>

        {/* Description */}
        <Text className="text-base text-center" style={{ color: colors.dark }}>
          This page is under construction. Check back soon!
        </Text>
      </View>
    </View>
  );
}
