import { colors } from "@/src/constants/colors";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PRODUCT_CATEGORIES } from "../constants/categories";

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (label: string) => void;
}

export default function CategoryTabs({
  activeCategory,
  onSelect,
}: CategoryTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 18 }}
      contentContainerStyle={{ paddingRight: 10 }}
    >
      {PRODUCT_CATEGORIES.map((item, i) => {
        const isActive = activeCategory === item.label;
        return (
          <Pressable
            key={i}
            onPress={() => onSelect(item.label)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 24,
              marginRight: 10,
              backgroundColor: isActive ? colors.primary : colors.light,
              borderWidth: 1,
              borderColor: isActive ? colors.primary : colors.secondary,
              elevation: isActive ? 4 : 2,
            }}
          >
            <View style={{ marginRight: 6 }}>
              <item.icon
                size={14}
                color={isActive ? colors.light : colors.secondary}
              />
            </View>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 13,
                color: isActive ? colors.light : colors.secondary,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
