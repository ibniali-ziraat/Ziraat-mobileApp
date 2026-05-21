import Review from "@/src/components/shared/AllReview";
import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";

import { useAuth } from "@/src/contexts/AuthContext";

import { useLocalSearchParams } from "expo-router";

import { useMemo, useState } from "react";

import { RefreshControl, ScrollView, Text, View } from "react-native";

import { MessageSquareText } from "lucide-react-native";

import { useListReviews } from "../../products/hooks/data/useReview";

export default function AllReview() {
  const { productId } = useLocalSearchParams();

  const { userId } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, refetch } = useListReviews({
    entityId: Number(productId),

    entityTypeId: "Product",

    pageNumber: 1,

    pageSize: 50,
  });

  // ✅ SAFE FALLBACK
  const reviewsRaw = data?.items?.data ?? [];

  console.log(reviewsRaw, "reviews raw");

  // ✅ SUMMARY
  const summary = {
    averageRating: data?.ratingAverage ?? 0,

    totalReviews: data?.reviewsCount ?? 0,
  };

  // ✅ SAFE MAPPING
  const reviews = useMemo(() => {
    return reviewsRaw.map((r: any) => ({
      id: r.id,

      user: r.reviewerName || "Anonymous",

      userId: r.userId || r.customerId || "",

      rating: Number(r.rating || 0),

      comment: r.comment || "",

      title: r.title || "",

      date: r.createdOn
        ? new Date(r.createdOn).toLocaleDateString()
        : new Date().toLocaleDateString(),

      helpful: 0,
    }));
  }, [reviewsRaw]);

  // ✅ CHECK USER REVIEW
  const hasUserReviewed = useMemo(() => {
    if (!userId) return false;

    return reviews.some((r: any) => String(r.userId) === String(userId));
  }, [reviews, userId]);

  // ✅ PULL TO REFRESH
  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ LOADER
  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <BackHeader title="All Reviews" desc="See what customers are saying" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 120,
          backgroundColor: colors.light,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* EMPTY STATE */}
        {reviews.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6 py-20">
            <View
              style={{
                backgroundColor: `${colors.secondary}15`,
              }}
              className="w-24 h-24 rounded-full items-center justify-center mb-5"
            >
              <MessageSquareText size={42} color={colors.secondary} />
            </View>

            <Text
              style={typography.Poppins_l_semibold}
              className="text-neutral-900 mb-2 text-center"
            >
              No Reviews Yet
            </Text>

            <Text
              style={typography.Poppins_s_regular}
              className="text-neutral-500 text-center leading-6"
            >
              Be the first person to share your experience about this product.
            </Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: colors.light,
            }}
            className="px-3 pt-2"
          >
            <Review
              reviews={reviews}
              summary={summary}
              hasUserReviewed={hasUserReviewed}
              onSubmitReview={() => {}}
              loading={false}
              showAll={true}
              hideHeader={false}
            />
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}
