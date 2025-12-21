import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";
import ProductCarousel from "../../components/shared/ProductCarousel";
import { colors } from "../../constants/colors";
import { imageMapper } from "../../data/imageMapper";
import products from "../../data/products.json";

export default function ProductScreen() {
  console.log(products, "products...");

  const sections = [
    { title: "Popular pesticide for Crop Production", slice: [0, 8] },
    { title: "Upcoming Pesticide Solution for Next Season", slice: [8, 15] },
    { title: "Herbicide For effective Weed Control", slice: [15, 22] },
    { title: "Fungicide For safeguard Your Crops", slice: [22, 29] },
  ];

  return (
    <ScreenLayout className="py-4 bg-light">
      {sections.map((section, index) => (
        <View key={index}>
          <View className="flex-row items-center mt-6 mb-4">
            <Text className="text-xl font-bold text-dark">{section.title}</Text>
            <ChevronRight size={20} color={colors.dark} className="ml-1" />
          </View>

          <ProductCarousel
            items={products.slice(...section.slice)}
            imageMapper={imageMapper}
          />
        </View>
      ))}
    </ScreenLayout>
  );
}
