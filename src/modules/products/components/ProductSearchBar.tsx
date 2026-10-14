import { Pressable } from "@/src/components/shared/Pressable";
import SearchBar from "@/src/components/shared/SearchBar";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { SlidersHorizontal } from "lucide-react-native";

type Props = {
  search: string;
  setSearch: (text: string) => void;
  onFilterPress: () => void;
};

/**
 * Filter lives inside the bar, as on the Orchards tab — one full-width
 * control that lines up with the banner above, instead of a bar plus a
 * separate tinted box beside it.
 */
export default function ProductSearchBar({
  search,
  setSearch,
  onFilterPress,
}: Props) {
  return (
    <SearchBar
      search={search}
      setSearch={setSearch}
      placeholder="Search products"
      rightAccessory={
        <Pressable
          onPress={onFilterPress}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Filters"
          style={({ pressed }) => ({
            width: 32,
            height: 32,
            borderRadius: 16,
            marginLeft: 6,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: cardTokens.mutedSurface,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <SlidersHorizontal
            size={17}
            strokeWidth={2}
            color={cardTokens.inkSecondary}
          />
        </Pressable>
      }
    />
  );
}
