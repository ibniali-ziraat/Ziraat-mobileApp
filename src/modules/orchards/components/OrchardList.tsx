import { ScreenContent } from "@/src/components/shared/ScreenContent";
import SearchBar from "@/src/components/shared/SearchBar";
import { FlatList, View } from "react-native";
import OrchardCard from "./OrchardCard";

type Props = {
  orchards: any[];
  search: string;
  setSearch: (val: string) => void;
  onRefresh: () => void;
  refreshing: any;
};

export default function OrchardList({
  orchards,
  search,
  setSearch,
  onRefresh,
  refreshing,
}: Props) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orchards}
        keyExtractor={(item) => String(item.id)}
        onRefresh={onRefresh}
        refreshing={refreshing}
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
