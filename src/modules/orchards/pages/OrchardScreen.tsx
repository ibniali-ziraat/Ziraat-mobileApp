import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";
import orchardsData from "@/src/data/myOrchardsData.json";
import { useState } from "react";
import { FlatList, View } from "react-native";
import OrchardCard from "../components/OrchardCard";

export default function MyOrchardsScreen() {
  const [orchards] = useState(orchardsData);

  return (
    <ScreenLayout scrollable={true}>
      <View className="bg-light">
        <FlatList
          data={orchards}
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
