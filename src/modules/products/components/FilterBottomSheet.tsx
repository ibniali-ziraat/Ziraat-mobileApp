import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Check, X } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

const FIXED_MIN_PRICE = 0;
const FIXED_MAX_PRICE = 10000;

type Filters = {
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  minRating?: string;
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
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
  filterOptions: FilterOptions;
};

export default function FilterBottomSheet({
  visible,
  onClose,
  onApplyFilters,
  filterOptions,
}: Props) {
  const insets = useSafeAreaInsets();

  const [brand, setBrand] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([
    FIXED_MIN_PRICE,
    FIXED_MAX_PRICE,
  ]);

  const [sort, setSort] = useState<string | null>(null);
  const [rating, setRating] = useState<number[]>([]);

  const resetHandler = () => {
    setBrand([]);
    setCategory(null);
    setSort(null);
    setRating([]);
    setPriceRange([FIXED_MIN_PRICE, FIXED_MAX_PRICE]);
  };

  const applyHandler = () => {
    onApplyFilters({
      brand: brand.length ? brand.join(",") : undefined,
      category: category || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sort: sort || undefined,
      minRating: rating.length ? rating.join(",") : undefined,
    });

    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end bg-black/40">
        <Pressable onPress={onClose} className="flex-1" />

        <View
          className="rounded-t-3xl p-4"
          style={{ height: height * 0.8, backgroundColor: cardTokens.surface }}
        >
          <View
            className="w-10 h-1 rounded self-center mb-2.5"
            style={{ backgroundColor: cardTokens.hairline }}
          />

          <View className="flex-row justify-between items-center mb-3">
            <Text
              style={[
                typography.Poppins_m_semibold,
                { color: cardTokens.inkPrimary, fontSize: 17 },
              ]}
            >
              Filters
            </Text>

            <Pressable onPress={onClose} hitSlop={10}>
              <X size={22} color={cardTokens.inkSecondary} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          >
            {!!filterOptions?.brands?.length && (
              <Section title="Brand">
                {filterOptions?.brands?.map((item) => (
                  <Item
                    key={item.slug}
                    label={item.name}
                    count={item.count}
                    selected={brand.includes(item.slug)}
                    onPress={() =>
                      setBrand((prev) =>
                        prev.includes(item.slug)
                          ? prev.filter((b) => b !== item.slug)
                          : [...prev, item.slug],
                      )
                    }
                  />
                ))}
              </Section>
            )}

            {filterOptions?.categories.length > 0 && (
              <Section title="Category">
                {filterOptions?.categories?.map((item) => (
                  <RadioItem
                    key={item.slug}
                    label={item.name}
                    count={item.count}
                    selected={category === item.slug}
                    onPress={() =>
                      setCategory((prev) =>
                        prev === item.slug ? null : item.slug,
                      )
                    }
                  />
                ))}
              </Section>
            )}
            <Section title="Price Range">
              <View className="flex-row gap-2 mb-2.5">
                <PricePill label={`₹${priceRange[0]}`} />
                <PricePill label={`₹${priceRange[1]}`} />
              </View>

              <MultiSlider
                values={priceRange}
                min={FIXED_MIN_PRICE}
                max={FIXED_MAX_PRICE}
                step={100}
                onValuesChange={setPriceRange}
                sliderLength={width - 64}
                selectedStyle={{
                  backgroundColor: chartTokens.current,
                }}
                unselectedStyle={{
                  backgroundColor: chartTokens.track,
                }}
                markerStyle={{
                  backgroundColor: chartTokens.current,
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                }}
              />
            </Section>

            <Section title="Sort By Price">
              <Item
                label="None"
                selected={!sort}
                onPress={() => setSort(null)}
              />

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

            <Section title="Sort By Rating">
              {[5, 4, 3, 2, 1].map((r) => (
                <Item
                  key={r}
                  label={"★".repeat(r)}
                  selected={rating.includes(r)}
                  onPress={() =>
                    setRating((prev) =>
                      prev.includes(r)
                        ? prev.filter((val) => val !== r)
                        : [...prev, r],
                    )
                  }
                />
              ))}
            </Section>
          </ScrollView>

          <View
            className="flex-row gap-2 mt-2"
            style={{
              paddingBottom:
                Platform.OS === "android" && insets.bottom > 0
                  ? insets.bottom
                  : 0,
            }}
          >
            <Pressable
              className="flex-1 rounded-2xl p-3 items-center"
              style={{ borderWidth: 1, borderColor: cardTokens.border }}
              onPress={resetHandler}
            >
              <Text
                style={[
                  typography.Poppins_s_medium,
                  { color: cardTokens.inkPrimary },
                ]}
              >
                Reset
              </Text>
            </Pressable>

            <Pressable
              className="flex-1 rounded-2xl p-3 items-center"
              style={{ backgroundColor: chartTokens.current }}
              onPress={applyHandler}
            >
              <Text
                style={[
                  typography.Poppins_s_semibold,
                  { color: "#FFFFFF" },
                ]}
              >
                Apply Filters
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const Section = ({ title, children }: any) => (
  <View className="mb-2 p-3">
    <Text
      style={[
        typography.Poppins_xs_semibold,
        { color: cardTokens.inkSecondary, fontSize: 12, marginBottom: 6 },
      ]}
    >
      {title.toUpperCase()}
    </Text>
    {children}
  </View>
);

const Item = ({ label, count, selected, onPress }: any) => (
  <Pressable onPress={onPress} className="flex-row items-center py-2.5 gap-3">
    <View
      className="h-[18px] w-[18px] rounded items-center justify-center"
      style={{
        borderWidth: 1.5,
        borderColor: selected ? chartTokens.current : cardTokens.hairline,
        backgroundColor: selected ? chartTokens.current : "transparent",
      }}
    >
      {selected && <Check size={13} color="#FFFFFF" />}
    </View>

    <Text
      style={[
        typography.Poppins_xs_regular,
        { flex: 1, color: cardTokens.inkPrimary, fontSize: 13.5 },
      ]}
    >
      {label}
    </Text>

    {count !== undefined && (
      <Text
        style={[
          typography.Poppins_xs_regular,
          { color: cardTokens.inkMuted, fontSize: 12 },
        ]}
      >
        {count}
      </Text>
    )}
  </Pressable>
);

const RadioItem = ({ label, count, selected, onPress }: any) => (
  <Pressable onPress={onPress} className="flex-row items-center py-2.5 gap-3">
    <View
      className="h-[18px] w-[18px] rounded-full items-center justify-center"
      style={{
        borderWidth: 1.5,
        borderColor: selected ? chartTokens.current : cardTokens.hairline,
      }}
    >
      {selected && (
        <View
          className="h-[10px] w-[10px] rounded-full"
          style={{ backgroundColor: chartTokens.current }}
        />
      )}
    </View>

    <Text
      style={[
        typography.Poppins_xs_regular,
        { flex: 1, color: cardTokens.inkPrimary, fontSize: 13.5 },
      ]}
    >
      {label}
    </Text>

    {count !== undefined && (
      <Text
        style={[
          typography.Poppins_xs_regular,
          { color: cardTokens.inkMuted, fontSize: 12 },
        ]}
      >
        {count}
      </Text>
    )}
  </Pressable>
);

const PricePill = ({ label }: any) => (
  <View
    className="px-2.5 py-1 rounded-full"
    style={{ backgroundColor: cardTokens.mutedSurface }}
  >
    <Text
      style={[
        typography.Poppins_xs_semibold,
        { color: chartTokens.current, fontSize: 12 },
      ]}
    >
      {label}
    </Text>
  </View>
);
