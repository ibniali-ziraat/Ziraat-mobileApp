import { ProductCarouselProps } from "@/src/types/product-carousel.type";
import { Heart } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  View
} from "react-native";
import RatingStars from "../../components/shared/RatingStars";
import { colors } from "../../constants/colors";
 
import { typography } from "@/src/constants/fonts/typography";
import { router } from "expo-router";
import CsText from "./CsText";
 
export default function ProductCarousel({
  items,
  imageMapper,
}: ProductCarouselProps) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.42;
  const imageSize = screenWidth * 0.4;
 
  const getDiscountPercent = (price: number, discountPrice: number) => {
    if (!discountPrice || !price) return null;
    return Math.round(((price - discountPrice) / price) * 100);
  };
 
  const [refresh, setRefresh] = useState(false);
 
 
 
  return (
    <View className="mb-6">
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const discountPercent = getDiscountPercent(
            item.price,
            item.discountPrice
          );
 
          return (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/products/single-product-details",
                  params: { productId: item._id },
                })
              }
            >
              <View className="mr-2 items-center" style={{ width: cardWidth }}>
                <View className="relative">
                  <Image
                    source={imageMapper[item.photos[0]]}
                    className="rounded-2xl"
                    style={{ width: imageSize, height: imageSize }}
                  />
 
                  {item.label && (
                    <View className="absolute top-2 left-2 bg-primary px-2 py-1  rounded-lg">
                      <CsText style= {[typography.Poppins_xs_regular]} className="text-light ">
                        {item.label}
                     </CsText>
                    </View>
                  )}
 
                  <Pressable
                    className="absolute top-2 right-2 p-1"
                    onPress={(event) => {
                      event.stopPropagation();
                     
                    }}
                  >
                    <Heart
                      size={20}
                      // color={colors.bgColor}
 
                      color={ colors.overlay}
 
                      
                         
                      
                    />
                  </Pressable>
                </View>
 
                <CsText
                style ={[typography.Poppins_m_semibold]}
                  className="mt-2 w-full px-2"
                  numberOfLines={1}
                >
                  {item.title}
               </CsText>
 
                {item.category && (
                  <CsText
                  style ={[typography.Poppins_s_regular]}
                    className="text-dark  w-full px-2 mt-1"
                    numberOfLines={1}
                  >
                    {item.category}
                 </CsText>
                )}
 
                <View className="flex-row items-center pt-2 w-full px-2"
               
                >
                  {item.discountPrice ? (
                    <>
                      <CsText
                      style ={[typography.Poppins_s_regular]}
                     
                      className="text-dark line-through pr-3">
                        ₹{item.price}
                     </CsText>
 
                      <CsText
                      style ={[typography.Poppins_s_medium]}
                     
                      className="text-primary pr-3 ">
                        ₹{item.discountPrice}
                     </CsText>
 
                      {discountPercent && (
                        <CsText
                        style ={[typography.Poppins_xs_regular]}
                       
                        className="text-secondary">
                          {discountPercent}% OFF
                       </CsText>
                      )}
                    </>
                  ) : (
                    <CsText
                      style ={[typography.Poppins_s_medium]}
                   
                    className="text-primary">
                      ₹{item.price}
                   </CsText>
                  )}
                </View>
 
                <View className="flex-row items-center justify-between w-full px-2 mt-2">
                  <RatingStars rating={item.rating} />
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
 
 