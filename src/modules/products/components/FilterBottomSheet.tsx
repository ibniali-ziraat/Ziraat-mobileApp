// import { colors } from "@/src/constants/colors";
// import MultiSlider from "@ptomasroos/react-native-multi-slider";
// import { Check, X } from "lucide-react-native";
// import { useState } from "react";
// import {
//   Dimensions,
//   Modal,
//   Pressable,
//   ScrollView,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { height, width } = Dimensions.get("window");

// const FIXED_MIN_PRICE = 0;
// const FIXED_MAX_PRICE = 10000;

// type Filters = {
//   brand?: string;
//   category?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   sort?: string;
//   minRating?: string;
//   page?: number;
// };

// type FilterOptions = {
//   brands: {
//     id: number;
//     name: string;
//     slug: string;
//     count: number;
//   }[];
//   categories: {
//     id: number;
//     name: string;
//     slug: string;
//     count: number;
//   }[];
// };

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   onApplyFilters: (filters: Filters) => void;
//   filterOptions: FilterOptions;
// };

// export default function FilterBottomSheet({
//   visible,
//   onClose,
//   onApplyFilters,
//   filterOptions,
// }: Props) {
//   const [brand, setBrand] = useState<string[]>([]);
//   const [category, setCategory] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState<number[]>([
//     FIXED_MIN_PRICE,
//     FIXED_MAX_PRICE,
//   ]);

//   // console.log(filterOptions, "ALL CATEGORIES");

//   const [sort, setSort] = useState<string | null>(null);
//   const [rating, setRating] = useState<number[]>([]);

//   const resetHandler = () => {
//     setBrand([]);
//     setCategory([]);
//     setSort(null);
//     setRating([]);
//     setPriceRange([FIXED_MIN_PRICE, FIXED_MAX_PRICE]);
//   };

//   const applyHandler = () => {
//     onApplyFilters({
//       brand: brand.length ? brand.join(",") : undefined,
//       category: category.length ? category.join(",") : undefined,
//       minPrice: priceRange[0],
//       maxPrice: priceRange[1],
//       sort: sort || undefined,
//       minRating: rating.length ? rating.join(",") : undefined,
//     });
//     onClose();
//   };

//   return (
//     <SafeAreaView edges={["bottom"]}>
//       <Modal
//         visible={visible}
//         animationType="slide"
//         transparent
//         onRequestClose={onClose}
//       >
//         <Pressable onPress={onClose} className="flex-1 bg-black/40" />

//         <View
//           className="bg-white rounded-t-3xl p-4"
//           style={{ height: height * 0.8 }}
//         >
//           <View className="w-10 h-1 bg-gray-300 rounded self-center mb-2.5" />

//           <View className="flex-row justify-between mb-3">
//             <Text className="text-lg font-bold text-black">Filters</Text>
//             <Pressable onPress={onClose}>
//               <X size={22} />
//             </Pressable>
//           </View>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             {filterOptions.brands.length && (
//               <Section title="Brand">
//                 {filterOptions.brands.map((item) => (
//                   <Item
//                     key={item.slug}
//                     label={item.name}
//                     count={item.count}
//                     selected={brand.includes(item.slug)}
//                     onPress={() =>
//                       setBrand((prev) =>
//                         prev.includes(item.slug)
//                           ? prev.filter((b) => b !== item.slug)
//                           : [...prev, item.slug],
//                       )
//                     }
//                   />
//                 ))}
//               </Section>
//             )}

//             <Section title="Category">
//               {filterOptions.categories.map((item) => (
//                 <Item
//                   key={item.slug}
//                   label={item.name}
//                   count={item.count}
//                   selected={category.includes(item.slug)}
//                   onPress={() =>
//                     setCategory((prev) =>
//                       prev.includes(item.slug)
//                         ? prev.filter((c) => c !== item.slug)
//                         : [...prev, item.slug],
//                     )
//                   }
//                 />
//               ))}
//             </Section>

//             <Section title="Price Range">
//               <View className="flex-row gap-2 mb-2.5">
//                 <PricePill label={`₹${priceRange[0]}`} />
//                 <PricePill label={`₹${priceRange[1]}`} />
//               </View>

//               <MultiSlider
//                 values={priceRange}
//                 min={FIXED_MIN_PRICE}
//                 max={FIXED_MAX_PRICE}
//                 step={100}
//                 onValuesChange={setPriceRange}
//                 sliderLength={width - 64}
//                 selectedStyle={{ backgroundColor: colors.primary }}
//                 unselectedStyle={{ backgroundColor: "#E5E5E5" }}
//                 markerStyle={{
//                   backgroundColor: colors.primary,
//                   height: 20,
//                   width: 20,
//                   borderRadius: 10,
//                 }}
//               />
//             </Section>

//             <Section title="Sort By Price">
//               <Item
//                 label="None"
//                 selected={!sort}
//                 onPress={() => setSort(null)}
//               />
//               <Item
//                 label="Low → High"
//                 selected={sort === "price-asc"}
//                 onPress={() => setSort("price-asc")}
//               />
//               <Item
//                 label="High → Low"
//                 selected={sort === "price-desc"}
//                 onPress={() => setSort("price-desc")}
//               />
//             </Section>

//             <Section title="Sort By Rating">
//               {[5, 4, 3, 2, 1].map((r) => (
//                 <Item
//                   key={r}
//                   label={"★".repeat(r)}
//                   selected={rating.includes(r)}
//                   onPress={() =>
//                     setRating((prev) =>
//                       prev.includes(r)
//                         ? prev.filter((val) => val !== r)
//                         : [...prev, r],
//                     )
//                   }
//                 />
//               ))}
//             </Section>
//           </ScrollView>

//           <View className="flex-row gap-2 mt-2">
//             <Pressable
//               className="flex-1 border border-gray-300 rounded-xl p-3 items-center"
//               onPress={resetHandler}
//             >
//               <Text className="text-black">Reset</Text>
//             </Pressable>

//             <Pressable
//               className="flex-1 rounded-xl p-3 items-center"
//               style={{ backgroundColor: colors.primary }}
//               onPress={applyHandler}
//             >
//               <Text className="text-white font-bold">Apply Filters</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const Section = ({ title, children }: any) => (
//   <View className="mb-2 rounded-xl p-3">
//     <Text className="font-bold mb-2 text-black">{title}</Text>
//     {children}
//   </View>
// );

// const Item = ({ label, count, selected, onPress }: any) => (
//   <Pressable onPress={onPress} className="flex-row items-center py-2.5 gap-3">
//     <View
//       className="h-[18px] w-[18px] rounded border items-center justify-center"
//       style={{ borderColor: colors.primary }}
//     >
//       {selected && <Check size={14} color={colors.primary} />}
//     </View>

//     <Text className="flex-1 text-black">{label}</Text>

//     {count !== undefined && <Text className="text-gray-500">{count}</Text>}
//   </Pressable>
// );

// const PricePill = ({ label }: any) => (
//   <View
//     className="px-2.5 py-1 rounded-lg"
//     style={{ backgroundColor: colors.primary + "15" }}
//   >
//     <Text style={{ color: colors.primary }}>{label}</Text>
//   </View>
// );

import { colors } from "@/src/constants/colors";
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
  const [category, setCategory] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([
    FIXED_MIN_PRICE,
    FIXED_MAX_PRICE,
  ]);

  const [sort, setSort] = useState<string | null>(null);
  const [rating, setRating] = useState<number[]>([]);

  const resetHandler = () => {
    setBrand([]);
    setCategory([]);
    setSort(null);
    setRating([]);
    setPriceRange([FIXED_MIN_PRICE, FIXED_MAX_PRICE]);
  };

  const applyHandler = () => {
    onApplyFilters({
      brand: brand.length ? brand.join(",") : undefined,
      category: category.length ? category.join(",") : undefined,
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
          className="bg-white rounded-t-3xl p-4"
          style={{
            height: height * 0.8,
          }}
        >
          <View className="w-10 h-1 bg-gray-300 rounded self-center mb-2.5" />

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-black">Filters</Text>

            <Pressable onPress={onClose}>
              <X size={22} color="black" />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          >
            {!!filterOptions.brands.length && (
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
                          : [...prev, item.slug],
                      )
                    }
                  />
                ))}
              </Section>
            )}

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
                        : [...prev, item.slug],
                    )
                  }
                />
              ))}
            </Section>

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
                  backgroundColor: colors.primary,
                }}
                unselectedStyle={{
                  backgroundColor: "#E5E5E5",
                }}
                markerStyle={{
                  backgroundColor: colors.primary,
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
              className="flex-1 border border-gray-300 rounded-xl p-3 items-center"
              onPress={resetHandler}
            >
              <Text className="text-black font-medium">Reset</Text>
            </Pressable>

            <Pressable
              className="flex-1 rounded-xl p-3 items-center"
              style={{
                backgroundColor: colors.primary,
              }}
              onPress={applyHandler}
            >
              <Text className="text-white font-bold">Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const Section = ({ title, children }: any) => (
  <View className="mb-2 rounded-xl p-3">
    <Text className="font-bold mb-2 text-black">{title}</Text>
    {children}
  </View>
);

const Item = ({ label, count, selected, onPress }: any) => (
  <Pressable onPress={onPress} className="flex-row items-center py-2.5 gap-3">
    <View
      className="h-[18px] w-[18px] rounded border items-center justify-center"
      style={{
        borderColor: colors.primary,
      }}
    >
      {selected && <Check size={14} color={colors.primary} />}
    </View>

    <Text className="flex-1 text-black">{label}</Text>

    {count !== undefined && <Text className="text-gray-500">{count}</Text>}
  </Pressable>
);

const PricePill = ({ label }: any) => (
  <View
    className="px-2.5 py-1 rounded-lg"
    style={{
      backgroundColor: colors.primary + "15",
    }}
  >
    <Text style={{ color: colors.primary }}>{label}</Text>
  </View>
);
