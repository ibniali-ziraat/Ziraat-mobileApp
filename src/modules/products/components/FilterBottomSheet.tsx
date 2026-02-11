import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Picker } from "@react-native-picker/picker";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView, View } from "react-native";

const { height } = Dimensions.get("window");

/* ===================== TYPES ===================== */

type Filters = {
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
};

type FilterOptions = {
  brands: {
    id: number;
    name: string;
    slug: string;
    count: number;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
    count: number;
    parentId?: number | null;
  }[];
  price: {
    minPrice: number;
    maxPrice: number;
  };
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
  filterOptions: FilterOptions;
};

/* ===================== COMPONENT ===================== */

export default function FilterBottomSheet({
  visible,
  onClose,
  onApplyFilters,
  filterOptions,
}: Props) {
  const [brand, setBrand] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([
    filterOptions.price.minPrice,
    filterOptions.price.maxPrice,
  ]);
  const [sort, setSort] = useState<string | null>(null);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable onPress={onClose} className="flex-1 bg-black/40" />

      <View
        className="bg-white rounded-t-2xl px-4"
        style={{ height: height * 0.65 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <CsText style={typography.Poppins_m_semibold}>Filters</CsText>
          <Pressable onPress={onClose}>
            <X size={22} color={colors.dark} />
          </Pressable>
        </View>

        <ScrollView className="mt-4">
          {/* ================= BRAND ================= */}
          <FilterSection title="Brand">
            {filterOptions.brands.map((item) => (
              <FilterChip
                key={item.id}
                label={`${item.name} (${item.count})`}
                selected={brand === item.slug}
                onPress={() => setBrand(brand === item.slug ? null : item.slug)}
              />
            ))}
          </FilterSection>

          {/* ================= CATEGORY ================= */}
          <FilterSection title="Category">
            {filterOptions.categories.map((item) => (
              <FilterChip
                key={item.id}
                label={`${item.name} (${item.count})`}
                selected={category === item.slug}
                onPress={() =>
                  setCategory(category === item.slug ? null : item.slug)
                }
              />
            ))}
          </FilterSection>

          {/* ================= PRICE RANGE ================= */}
          <View className="mb-6">
            <CsText style={typography.Poppins_s_semibold}>Price Range</CsText>

            <View className="flex-row justify-between mt-2">
              <CsText>₹{priceRange[0]}</CsText>
              <CsText>₹{priceRange[1]}</CsText>
            </View>

            <MultiSlider
              values={priceRange}
              min={filterOptions.price.minPrice}
              max={filterOptions.price.maxPrice}
              step={500}
              onValuesChange={setPriceRange}
              selectedStyle={{ backgroundColor: colors.primary }}
              unselectedStyle={{ backgroundColor: "#ddd" }}
              markerStyle={{ backgroundColor: colors.primary }}
              containerStyle={{ marginTop: 10 }}
            />
          </View>

          {/* ================= SORT ================= */}
          <View className="mb-4">
            <CsText style={typography.Poppins_s_semibold}>Sort By</CsText>
            <View style={pickerWrapperStyle}>
              <Picker
                selectedValue={sort}
                onValueChange={(value) => setSort(value)}
              >
                <Picker.Item label="None" value={null} />
                <Picker.Item label="Price: Low to High" value="price-asc" />
                <Picker.Item label="Price: High to Low" value="price-desc" />
              </Picker>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View className="py-4 border-t border-gray-200">
          <Pressable
            className="bg-primary py-3 rounded-xl items-center"
            onPress={() => {
              onApplyFilters({
                brand: brand || undefined,
                category: category || undefined,
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                sort: sort || undefined,
                page: 1,
              });
              onClose();
            }}
          >
            <CsText className="text-white">Apply Filters</CsText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

/* ===================== REUSABLE ===================== */

const FilterSection = ({ title, children }) => (
  <View className="mb-6">
    <CsText style={typography.Poppins_s_semibold} className="mb-3">
      {title}
    </CsText>
    <View className="flex-row flex-wrap gap-2">{children}</View>
  </View>
);

const FilterChip = ({ label, selected, onPress }) => (
  <Pressable
    onPress={onPress}
    className={`px-4 py-2 rounded-full border ${
      selected ? "bg-primary border-primary" : "border-gray-300"
    }`}
  >
    <CsText className={selected ? "text-white" : "text-dark"}>{label}</CsText>
  </Pressable>
);

const pickerWrapperStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  marginTop: 6,
};
