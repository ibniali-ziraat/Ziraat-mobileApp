import { ScreenContent } from "@/src/components/shared/ScreenContent";
import SearchBar from "@/src/components/shared/SearchBar";
import { FlatList, View } from "react-native";
import OrchardCard from "./OrchardCard";

type Props = {
  orchards: any[];
  search: string;
  setSearch: (val: string) => void;
};

export default function OrchardList({ orchards, search, setSearch }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orchards}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <OrchardCard orchard={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <View className="mb-6 mt-4 bg-light">
            <ScreenContent>
              <SearchBar search={search} setSearch={setSearch} />
            </ScreenContent>
          </View>
        }
      />
    </View>
  );
}
