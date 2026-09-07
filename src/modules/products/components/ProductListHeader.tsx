import DashboardSectionHeader from "../../home/components/dashboard/DashboardSectionHeader";
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
  filterOptions: {
    brands: any[];
    categories: any[];
  };
  categories: any[];
  isFiltering: boolean;
  activeCategory: string;
  setActiveCategory: (val: string) => void;
  filtersReady: boolean;
}

export default function ProductListHeader({
  search,
  setSearch,
  filterOpen,
  setFilterOpen,
  filters,
  setFilters,
  filterOptions,
  categories,
  isFiltering,
  activeCategory,
  setActiveCategory,
  filtersReady,
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

      {!isFiltering && filtersReady && categories.length > 0 && (
        <CategoryTabs
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          categories={categories}
        />
      )}

      <DashboardSectionHeader title="All products" topSpacing={24} />
    </>
  );
}
