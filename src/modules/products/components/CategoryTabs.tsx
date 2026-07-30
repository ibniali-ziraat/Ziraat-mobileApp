import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Pressable, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (slug: string) => void;
  categories: CategoryItem[];
}

export default function CategoryTabs({
  activeCategory,
  onSelect,
  categories,
}: CategoryTabsProps) {
  const allCategories = [
    {
      id: 0,
      name: "All",
      slug: "All",
      count: 0,
    },

    ...categories,
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 18 }}
      contentContainerStyle={{ paddingRight: 10 }}
    >
      {allCategories.map((item, i) => {
        const isActive = activeCategory === item.slug;

        return (
          <Pressable
            key={i}
            onPress={() => onSelect(item.slug)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 999,
              marginRight: 10,
              backgroundColor: isActive
                ? chartTokens.current
                : cardTokens.mutedSurface,
            }}
          >
            <Text
              style={[
                typography.Poppins_xs_semibold,
                {
                  fontSize: 13,
                  color: isActive ? "#FFFFFF" : cardTokens.inkSecondary,
                },
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
