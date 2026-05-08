import CsText from "@/src/components/shared/CsText";
import RatingStars from "@/src/components/shared/RatingStars";
import { View } from "react-native";

export default function ProductMeta({ product }: any) {
  return (
    <View className="px-4 mt-3 flex-row items-center">
      <RatingStars rating={product.ratingAverage ?? 0} />
      <CsText className="ml-2 text-secondary">
        ({product.reviewsCount ?? 0} reviews)
      </CsText>
    </View>
  );
}
