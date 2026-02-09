import CsText from "@/src/components/shared/CsText";
import RatingStars from "@/src/components/shared/RatingStars";
import { typography } from "@/src/constants/fonts/typography";
import { NormalizedProduct } from "@/src/domain/product/product.types";
import { router } from "expo-router";
import { Dimensions, FlatList, Image, Pressable, View } from "react-native";

type Props = {
  items: NormalizedProduct[];
  onAddToWishlist?: (id: string) => void;
};

export default function AllProductsCarousal({ items, onAddToWishlist }: Props) {
  console.log(items, "items in p carousal");

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.42;

  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item._id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/products/single-product-details",
              params: { productId: item._id },
            })
          }
        >
          <View style={{ width: cardWidth }} className="mr-3">
            <Image
              source={{
                uri:
                  item.photos && item.photos.length > 0
                    ? item.photos[0]
                    : "https://via.placeholder.com/150", // fallback image
              }}
              className="rounded-2xl"
              style={{ width: "100%", height: cardWidth }}
            />

            <CsText
              style={typography.Poppins_m_semibold}
              numberOfLines={1}
              className="mt-2"
            >
              {item.title}
            </CsText>

            <CsText style={typography.Poppins_s_medium}>
              ₹{item.discountPrice ?? item.price}
            </CsText>

            <RatingStars rating={item.rating} />
          </View>
        </Pressable>
      )}
    />
  );
}
