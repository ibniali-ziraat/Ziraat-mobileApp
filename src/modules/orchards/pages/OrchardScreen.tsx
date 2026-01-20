import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import OrchardCard from "../components/OrchardCard";
import { useOrchardsByUserQuery } from "../hooks/useOrchardsQuery";

export default function MyOrchardsScreen() {
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();

  const { setOrchardProfileId, orchardProfileId } = useAuth();
  useEffect(() => {
    setOrchardProfileId(orchardData?.id ?? null);
  }, [orchardData]);
  const router = useRouter();

  if (isPending) return <Loader />;
  if (isError) return <Loader />;

  const hasNoOrchards = !orchardData || orchardData.length === 0;

  return (
    <ScreenLayout scrollable>
      <View className="bg-light flex-1">
        {hasNoOrchards ? (
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-xl font-semibold text-center mb-2">
              🌱 No Orchards Added Yet
            </Text>

            <Text className="text-base text-gray-600 text-center mb-6">
              Start by adding your orchard to track crops, manage activities,
              and grow smarter.
            </Text>

            <Pressable
              onPress={() => router.push("/orchards/basic-info")}
              className="bg-primary px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold text-base">
                Add Your First Orchard
              </Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={orchardData}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <OrchardCard orchard={item} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View className="my-4 mx-1">
                <SearchBar />
              </View>
            }
          />
        )}
      </View>
    </ScreenLayout>
  );
}
