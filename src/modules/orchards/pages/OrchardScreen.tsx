import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";

import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "expo-router";
import { TreePalm } from "lucide-react-native";
import { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import OrchardCard from "../components/OrchardCard";
import { useOrchardsByUserQuery } from "../hooks/useOrchardsQuery";

export default function MyOrchardsScreen() {
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();

  const { setOrchardProfileId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!orchardData?.length) {
      setOrchardProfileId(null);
    }
  }, [orchardData]);

  if (isPending) return <Loader />;
  if (isError) return <Loader />;

  const hasNoOrchards = !orchardData || orchardData.length === 0;

  return (
    <ScreenLayout scrollable>
      <View style={{ backgroundColor: colors.light }} className="flex-1">
        {hasNoOrchards ? (
          <View className="flex-1 justify-center items-center px-6">
            <View className="items-center">
              <View className="rounded-3xl items-center justify-center mb-6 shadow-sm">
                <TreePalm style={{ color: colors.primary }} size={40} />
              </View>

              <Text
                style={{ color: colors.dark }}
                className="text-[22px] font-bold text-center mb-2"
              >
                Start Your First Orchard
              </Text>

              <Text
                style={{ color: colors.dark }}
                className="text-[14px] leading-6 text-center mb-7 opacity-70"
              >
                Add your orchard to manage crops, monitor growth, and keep
                everything organized in one place.
              </Text>

              {/* ✅ CREATE MODE */}
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/orchards/basic-info",
                    params: { mode: "create" },
                  })
                }
                style={{ backgroundColor: colors.primary }}
                className="px-6 py-4 rounded-2xl w-full active:scale-95 shadow-md"
              >
                <Text
                  style={{ color: colors.light }}
                  className="font-semibold text-[16px] text-center"
                >
                  + Add Orchard
                </Text>
              </Pressable>

              <Text
                style={{ color: colors.dark }}
                className="text-xs text-center mt-5 opacity-50"
              >
                You can add multiple orchards anytime.
              </Text>
            </View>
          </View>
        ) : (
          <View className="flex-1  pt-3">
            <FlatList
              scrollEnabled={false}
              data={orchardData}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View className="mb-4">
                  <OrchardCard orchard={item} />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
              ListHeaderComponent={
                <View
                  style={{ backgroundColor: colors.light }}
                  className="mb-4 mt-2"
                >
                  <SearchBar />
                </View>
              }
            />

            {/* ✅ CREATE MODE */}
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/orchards/basic-info",
                  params: { mode: "create" },
                })
              }
              className="absolute bottom-6 right-6 rounded-full"
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.94 : 1 }],
              })}
            >
              <View
                className="h-16 w-16 rounded-full items-center justify-center"
                style={{
                  backgroundColor: colors.primary + "20",
                }}
              >
                <View
                  className="h-14 w-14 rounded-full items-center justify-center shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text
                    style={{
                      color: colors.light,
                      lineHeight: 32,
                      transform: [{ translateY: -1 }],
                    }}
                    className="text-3xl font-semibold"
                  >
                    +
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
}
