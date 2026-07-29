import SearchBar from "@/src/components/shared/SearchBar";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Trees } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OrchardCard from "./OrchardCard";

type Props = {
  orchards: any[];
  search: string;
  setSearch: (val: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
};

export default function OrchardList({
  orchards,
  search,
  setSearch,
  onRefresh,
  refreshing,
}: Props) {
  const insets = useSafeAreaInsets();
  const footerHeight = Math.max(96, insets.bottom + 76);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={orchards}
      keyExtractor={(item) => String(item.id)}
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderItem={({ item }) => <OrchardCard orchard={item} />}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      alwaysBounceVertical
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal: 20,
        flexGrow: 1,
      }}
      ListFooterComponent={<View style={{ height: footerHeight }} />}
      ListHeaderComponent={
        <View className="pb-5 pt-6">
          <View className="mb-5 flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text
                style={[
                  typography.Poppins_xl_semibold,
                  { color: colors.dark, fontSize: 28, lineHeight: 36 },
                ]}
              >
                My Orchards
              </Text>
              <Text
                style={[
                  typography.Poppins_s_regular,
                  { color: colors.darkHover, marginTop: 3 },
                ]}
              >
                Manage and monitor your growing spaces
              </Text>
            </View>

            <View
              className="h-14 min-w-14 items-center justify-center rounded-2xl px-3"
              style={{ backgroundColor: colors.primary + "12" }}
            >
              <Trees size={20} color={colors.primary} />
              <Text
                style={[
                  typography.Poppins_s_semibold,
                  { color: colors.primary, fontSize: 11, marginTop: 1 },
                ]}
              >
                {orchards.length}
              </Text>
            </View>
          </View>

          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Search your orchards"
          />
        </View>
      }
      ListEmptyComponent={
        <View className="items-center rounded-3xl bg-white px-6 py-12">
          <Trees size={34} color={colors.primary} />
          <Text
            style={[
              typography.Poppins_m_semibold,
              { color: colors.dark, marginTop: 12 },
            ]}
          >
            No matching orchards
          </Text>
          <Text
            style={[
              typography.Poppins_s_regular,
              { color: colors.darkHover, marginTop: 4, textAlign: "center" },
            ]}
          >
            Try a different orchard name or ownership type.
          </Text>
        </View>
      }
    />
  );
}
