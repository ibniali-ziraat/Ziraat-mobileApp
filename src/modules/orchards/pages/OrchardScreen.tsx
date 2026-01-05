import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";
import { FlatList, Text, View } from "react-native";
import OrchardCard from "../components/OrchardCard";
import { useOrchardsByUserQuery } from "../hooks/useOrchardsQuery";

export default function MyOrchardsScreen() {
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();

  console.log("ORCHARD API RESPONSE ");
  console.log(JSON.stringify(orchardData, null, 2));

  if (isPending) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading orchards</Text>;

  return (
    <ScreenLayout scrollable>
      <View className="bg-light">
        <FlatList
          data={orchardData ?? []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <OrchardCard orchard={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="my-4 mx-1">
              <SearchBar />
            </View>
          }
        />
      </View>
    </ScreenLayout>
  );
}
