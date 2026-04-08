

import Review from "@/src/components/shared/AllReview";
import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useListReviews } from "../../products/hooks/data/useReview";

export default function AllReview() {
  const { productId } = useLocalSearchParams();
  const { userId } = useAuth();

  const { data, isLoading } = useListReviews({
    entityId: Number(productId),
    entityTypeId: "Product",
    pageNumber: 1,
    pageSize: 50,
  });

  const reviewsRaw = data?.items?.data ?? [];

  const summary = {
    averageRating: data?.ratingAverage ?? 0,
    totalReviews: data?.reviewsCount ?? 0,
  };

  const reviews = reviewsRaw.map((r: any) => ({
    id: r.id,
    user: r.reviewerName,
    userId: r.userId,
    rating: r.rating,
    comment: r.comment,
    title: r.title,
    date: new Date(r.createdOn).toLocaleDateString(),
    helpful: 0,
  }));

  const hasUserReviewed = reviews.some(
    (r: any) => String(r.userId) === String(userId)
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
  <ScreenLayout>
   <BackHeader title="All Reviews"
     desc="See what other users are saying"
   />  
      <View
     style={{ backgroundColor: colors.light }}
      className="flex-1 px-2 ">
     

      <Review
        reviews={reviews}
        summary={summary}
        hasUserReviewed={hasUserReviewed}
        onSubmitReview={() => {}}
        loading={false}
        showAll={true}       
        hideHeader={true}    
      />
    </View>
  </ScreenLayout>
  );
}