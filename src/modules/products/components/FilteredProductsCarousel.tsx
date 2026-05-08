import CsText from "@/src/components/shared/CsText";
import RatingStars from "@/src/components/shared/RatingStars";
import { typography } from "@/src/constants/fonts/typography";
import { router } from "expo-router";
import { Dimensions, FlatList, Image, Pressable, View } from "react-native";

type Props = {
  items: any[];
  onAddToWishlist?: (id: string | number) => void;
};

export default function FilteredProductsCarousel({
  items,
  onAddToWishlist,
}: Props) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.42;

  console.log(items, "filtered carousel");

  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item.id?.toString()} // use id instead of _id
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/products/single-product-details",
              params: { productId: item.id },
            })
          }
        >
          <View style={{ width: cardWidth }} className="mr-3">
            <Image
              source={{
                uri: item.thumbnailUrl ?? "https://via.placeholder.com/150",
              }}
              className="rounded-2xl"
              style={{ width: "100%", height: cardWidth }}
            />

            <CsText
              style={typography.Poppins_m_semibold}
              numberOfLines={1}
              className="mt-2"
            >
              {item.name}
            </CsText>

            <CsText style={typography.Poppins_s_medium}>₹{item.price}</CsText>

            <RatingStars rating={item.ratingAverage ?? 0} />
          </View>
        </Pressable>
      )}
    />
  );
}
