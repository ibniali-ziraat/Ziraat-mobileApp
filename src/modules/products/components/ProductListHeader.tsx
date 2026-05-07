import { colors } from "@/src/constants/colors";
import { Package } from "lucide-react-native";
import { View } from "react-native";
import SectionTitle from "../../home/components/SectionTitle";
import { ProductFilters } from "../types/productlist.types";
import CategoryTabs from "./CategoryTabs";
import FilterBottomSheet from "./FilterBottomSheet";
import ProductSearchBar from "./ProductSearchBar";

interface ProductListHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  filterOpen: boolean;
  setFilterOpen: (val: boolean) => void;
  filters: ProductFilters;
  setFilters: (val: ProductFilters) => void;
  filterOptions: any[];
  isFiltering: boolean;
  activeCategory: string;
  setActiveCategory: (val: string) => void;
}

export default function ProductListHeader({
  search,
  setSearch,
  filterOpen,
  setFilterOpen,
  filters,
  setFilters,
  filterOptions,
  isFiltering,
  activeCategory,
  setActiveCategory,
}: ProductListHeaderProps) {
  return (
    <>
      <ProductSearchBar
        search={search}
        setSearch={setSearch}
        onFilterPress={() => setFilterOpen(true)}
      />

      <FilterBottomSheet
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApplyFilters={setFilters}
        filterOptions={filterOptions}
      />

      {!isFiltering && (
        <CategoryTabs
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      )}

      <View style={{ marginTop: 24, marginBottom: 12 }}>
        <SectionTitle
          title="All Products"
          icon={<Package size={20} color={colors.secondary} />}
        />
      </View>
    </>
  );
}
