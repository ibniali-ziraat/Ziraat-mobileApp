import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Check, X } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

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

/* ===================== MAIN ===================== */

export default function FilterBottomSheet({
  visible,
  onClose,
  onApplyFilters,
  filterOptions,
}: Props) {
  const [brand, setBrand] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([
    filterOptions.price.minPrice,
    filterOptions.price.maxPrice,
  ]);
  const [sort, setSort] = useState<string | null>(null);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable onPress={onClose} style={overlay} />

      <View style={sheet}>
        {/* HANDLE */}
        <View style={handle} />

        {/* HEADER */}
        <View style={header}>
          <CsText style={title}>Filters</CsText>
          <Pressable onPress={onClose}>
            <X size={22} />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* BRAND */}
          <Section title="Brand">
            {filterOptions.brands.map((item) => (
              <Item
                key={item.slug}
                label={item.name}
                count={item.count}
                selected={brand.includes(item.slug)}
                onPress={() =>
                  setBrand((prev) =>
                    prev.includes(item.slug)
                      ? prev.filter((b) => b !== item.slug)
                      : [...prev, item.slug]
                  )
                }
              />
            ))}
          </Section>

          {/* CATEGORY */}
          <Section title="Category">
            {filterOptions.categories.map((item) => (
              <Item
                key={item.slug}
                label={item.name}
                count={item.count}
                selected={category.includes(item.slug)}
                onPress={() =>
                  setCategory((prev) =>
                    prev.includes(item.slug)
                      ? prev.filter((c) => c !== item.slug)
                      : [...prev, item.slug]
                  )
                }
              />
            ))}
          </Section>

          {/* PRICE */}
          <Section title="Price Range">
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 10 }}>
              <PricePill label={`₹${priceRange[0]}`} />
              <PricePill label={`₹${priceRange[1]}`} />
            </View>

            <MultiSlider
              values={priceRange}
              min={filterOptions.price.minPrice}
              max={filterOptions.price.maxPrice}
              onValuesChange={setPriceRange}
              sliderLength={width - 64}
              selectedStyle={{ backgroundColor: colors.primary }}
              unselectedStyle={{ backgroundColor: "#E5E5E5" }}
              markerStyle={marker}
            />
          </Section>

          {/* SORT */}
          <Section title="Sort By">
            <Item label="None" selected={!sort} onPress={() => setSort(null)} />
            <Item
              label="Low → High"
              selected={sort === "price-asc"}
              onPress={() => setSort("price-asc")}
            />
            <Item
              label="High → Low"
              selected={sort === "price-desc"}
              onPress={() => setSort("price-desc")}
            />
          </Section>
        </ScrollView>

        {/* FOOTER */}
        <View style={footer}>
          <Pressable
            style={resetBtn}
            onPress={() => {
              setBrand([]);
              setCategory([]);
              setSort(null);
              setPriceRange([
                filterOptions.price.minPrice,
                filterOptions.price.maxPrice,
              ]);
            }}
          >
            <CsText>Reset</CsText>
          </Pressable>

          <Pressable
            style={applyBtn}
            onPress={() => {
              onApplyFilters({
                brand: brand.length ? brand.join(",") : undefined,
                category: category.length ? category.join(",") : undefined,
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                sort: sort || undefined,
              });
              onClose();
            }}
          >
            <CsText style={{ color: "#fff", fontWeight: "700" }}>
              Apply Filters
            </CsText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

/* ================= COMPONENTS ================= */

const Section = ({ title, children }) => (
  <View style={section}>
    <CsText style={sectionTitle}>{title}</CsText>
    {children}
  </View>
);

const Item = ({ label, count, selected, onPress }) => (
  <Pressable onPress={onPress} style={row}>
    <View style={checkbox}>
      {selected && <Check size={14} color={colors.primary} />}
    </View>

    <CsText style={{ flex: 1 }}>{label}</CsText>

    {count !== undefined && (
      <CsText style={{ color: colors.neutral }}>{count}</CsText>
    )}
  </Pressable>
);

const PricePill = ({ label }) => (
  <View style={pill}>
    <CsText style={{ color: colors.primary }}>{label}</CsText>
  </View>
);

/* ================= STYLES ================= */

const overlay = { flex: 1, backgroundColor: "rgba(0,0,0,.4)" };

const sheet = {
  height: height * 0.8,
  backgroundColor: "#fff",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 16,
  elevation: 10,
};

const handle = {
  width: 40,
  height: 4,
  backgroundColor: "#ddd",
  borderRadius: 2,
  alignSelf: "center",
  marginBottom: 10,
};

const header = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 12,
};

const title = { fontSize: 18, fontWeight: "700" };

const section = {
 
  borderRadius: 14,
  padding: 12,
  marginBottom: 8,
};

const sectionTitle = { fontWeight: "700", marginBottom: 8 };

const row = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  paddingVertical: 10,
};

const checkbox = {
  height: 18,
  width: 18,
  borderRadius: 4,
  borderWidth: 1.5,
  borderColor: colors.primary,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
};

const marker = {
  backgroundColor: colors.primary,
  height: 20,
  width: 20,
  borderRadius: 10,
};

const pill = {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
  backgroundColor: colors.primary + "15",
};

const footer = {
  flexDirection: "row",
  gap: 10,
  marginTop: 6,
};

const resetBtn = {
  flex: 1,
  borderWidth: 1,
  borderColor: "#DDD",
  borderRadius: 12,
  padding: 12,
  alignItems: "center",
};

const applyBtn = {
  flex: 1,
  backgroundColor: colors.primary,
  borderRadius: 12,
  padding: 12,
  alignItems: "center",
};
