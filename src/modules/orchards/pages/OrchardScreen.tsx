import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "expo-router";
import { TreePalm } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import OrchardCard from "../components/OrchardCard";
import { useOrchardsByUserQuery } from "../hooks/useOrchardsQuery";

export default function MyOrchardsScreen() {
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();
  const { setOrchardProfileId } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!orchardData?.length) {
      setOrchardProfileId(null);
    }
  }, [orchardData]);

  if (isPending) return <Loader />;
  if (isError) return <Loader />;

  const hasNoOrchards = !orchardData || orchardData.length === 0;

  const filteredOrchards = useMemo(() => {
    if (!search) return orchardData;
    const text = search.toLowerCase();

    return orchardData.filter(
      (o: any) =>
        o?.orchardName?.toLowerCase().includes(text) ||
        o?.ownershipType?.toLowerCase().includes(text) ||
        o?.plantationPattern?.toLowerCase().includes(text) ||
        String(o?.kanals || "").includes(text) ||
        String(o?.marlas || "").includes(text),
    );
  }, [orchardData, search]);

  return (
    <ScreenLayout scrollable={false}>
      <View
        style={{ flex: 1, backgroundColor: colors.light, position: "relative" }}
      >
        {hasNoOrchards ? (
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
                  className=" text-center font-semibold"
                >
                  + Add Orchard
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            <FlatList
              data={filteredOrchards}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View className="mb-4">
                  <OrchardCard orchard={item} />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 160 }}
              ListHeaderComponent={
                <View className="mb-6 mt-4">
                  <SearchBar search={search} setSearch={setSearch} />
                </View>
              }
            />

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
                bottom: 24,
                zIndex: 999,
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
                }}
              >
                <Text style={{ color: "#fff", fontSize: 28 }}>+</Text>
              </View>
            </Pressable>
          </>
        )}
      </View>
    </ScreenLayout>
  );
}
