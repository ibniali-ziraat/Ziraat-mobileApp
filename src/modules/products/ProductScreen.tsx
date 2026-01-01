import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { useSaveWishlist } from "@/src/hooks/useWishList";
import { ChevronRight } from "lucide-react-native";
import { View } from "react-native";
import ProductCarousel from "../../components/shared/ProductCarousel";
import { colors } from "../../constants/colors";
import { imageMapper } from "../../data/imageMapper";
import products from "../../data/products.json";

export default function ProductScreen() {
  console.log("PRODUCTS:", products);

  const sections = [
    { title: "Popular pesticide for Crop Production", slice: [0, 8] },
    { title: "Upcoming Pesticide Solution for Next Season", slice: [8, 15] },
    { title: "Herbicide For effective Weed Control", slice: [15, 22] },
    { title: "Fungicide For safeguard Your Crops", slice: [22, 29] },
  ];

  const { mutate, error } = useSaveWishlist();

  const handleAddToWishlist = (productId: number) => {
    console.log("ADDING PRODUCT ID:", productId);
    console.log("TYPE:", typeof productId); 

    mutate({
      productId,
      quantity: 1,
    });
  };

  if (error) {
    console.log("Wishlist error:", error);
  }

  return (
    <ScreenLayout>
      {sections.map((section, index) => (
        <View key={index}>
          <View className="flex-row items-center mt-6 mb-4">
            <CsText
              style={[typography.Poppins_m_semibold]}
              className="text-dark"
            >
              {section.title}
            </CsText>
            <ChevronRight size={20} color={colors.dark} className="ml-1" />
          </View>

          <ProductCarousel
            items={products.slice(...section.slice)}
            imageMapper={imageMapper}
            onAddToWishlist={handleAddToWishlist}
          />
        </View>
      ))}
    </ScreenLayout>
  );
}
