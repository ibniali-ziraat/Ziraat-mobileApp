import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useRouter } from "expo-router";
import { TreePalm } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function NoOrchardsEmpty() {
  const router = useRouter();

  return (
    <ScreenLayout>
      <ScreenContent>
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center">
            <TreePalm style={{ color: colors.primary }} size={40} />
            <Text className="text-[22px] font-bold mt-4">
              Start Your First Orchard
            </Text>
            <Text
              style={{ color: colors.dark }}
              className="text-[14px] leading-6 text-center mb-7 opacity-70"
            >
              Add your orchard to manage crops, monitor growth, and keep
              everything organized in one place.
            </Text>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO,
                  params: { mode: "create" },
                })
              }
              style={{ backgroundColor: colors.primary }}
              className="px-6 py-4 rounded-2xl w-full"
            >
              <Text
                style={{ color: colors.light }}
                className="text-center font-semibold"
              >
                + Add Orchard
              </Text>
            </Pressable>
          </View>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}
