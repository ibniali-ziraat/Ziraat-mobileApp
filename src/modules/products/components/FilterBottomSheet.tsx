import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Picker } from "@react-native-picker/picker";
import { X } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

type Filters = {
  query?: string;
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
};

export default function FilterBottomSheet({
  visible,
  onClose,
  onApplyFilters,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sort, setSort] = useState<string | null>(null);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable onPress={onClose} className="flex-1 bg-black/40" />

      {/* Sheet */}
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

        {/* Content */}
        <ScrollView className="mt-4">
          <FilterSection title="Brand">
            {["Bayer", "Syngenta", "UPL"].map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={brand === item}
                onPress={() => setBrand(brand === item ? null : item)}
              />
            ))}
          </FilterSection>

          {/* Category */}
          <FilterSection title="Category">
            {["Pesticide", "Herbicide", "Fungicide"].map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={category === item}
                onPress={() => setCategory(category === item ? null : item)}
              />
            ))}
          </FilterSection>

          {/* Price */}
          <View className="mb-4">
            <CsText style={typography.Poppins_s_semibold}>Price Range</CsText>
            <View className="flex-row items-center gap-2 mt-2">
              <TextInput
                placeholder="Min"
                value={minPrice}
                onChangeText={setMinPrice}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: 40,
                }}
              />
              <TextInput
                placeholder="Max"
                value={maxPrice}
                onChangeText={setMaxPrice}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  height: 40,
                }}
              />
            </View>
          </View>

          {/* Sort */}
          <View className="mb-4">
            <CsText style={typography.Poppins_s_semibold}>Sort By</CsText>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                marginTop: 6,
              }}
            >
              <Picker
                selectedValue={sort}
                onValueChange={(value) => setSort(value)}
                style={{ height: 40, width: "100%" }}
              >
                <Picker.Item label="None" value={null} />
                <Picker.Item label="Price: Low to High" value="price_asc" />
                <Picker.Item label="Price: High to Low" value="price_desc" />
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
                query: searchQuery || undefined,
                brand: brand || undefined,
                category: category || undefined,
                minPrice: minPrice ? parseInt(minPrice) : undefined,
                maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
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

// Reusable UI
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
