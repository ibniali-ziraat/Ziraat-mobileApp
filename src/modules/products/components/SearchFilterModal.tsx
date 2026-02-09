import { X } from "lucide-react-native";
import { useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

import CsText from "@/src/components/shared/CsText";
import SearchBar from "@/src/components/shared/SearchBar";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { FilterChip } from "./FilterChip";
import { FilterSection } from "./FilterSection";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SearchFilterModal({ visible, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
          <CsText style={typography.Poppins_m_semibold}>
            Search & Filters
          </CsText>

          <TouchableOpacity onPress={onClose}>
            <X size={22} color={colors.dark} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="px-4 mt-3">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search products, crops, brands"
            autoFocus
          />
        </View>

        {/* Filters */}
        <ScrollView className="flex-1 px-4 mt-6">
          {/* Brand */}
          <FilterSection title="Brand">
            {["Bayer", "Syngenta", "UPL"].map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={brand === item}
                onPress={() => setBrand(item)}
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
                onPress={() => setCategory(item)}
              />
            ))}
          </FilterSection>

          {/* Sort */}
          <FilterSection title="Sort By">
            {["Price: Low to High", "Price: High to Low"].map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={sort === item}
                onPress={() => setSort(item)}
              />
            ))}
          </FilterSection>
        </ScrollView>

        {/* Footer */}
        <View className="p-4 border-t border-gray-200">
          <TouchableOpacity
            className="bg-primary py-3 rounded-xl items-center"
            onPress={() => {
              console.log({ search, brand, category, sort });
              onClose();
            }}
          >
            <CsText className="text-white">Apply Filters</CsText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
