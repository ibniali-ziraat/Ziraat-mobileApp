import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useAuth } from "@/src/contexts/AuthContext";
import { MessageCircleCode, ThumbsUp } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Review({
  reviews = [],
  summary,
  onWriteReviewPress,
}: any) {
  const { userId } = useAuth(); // ✅ GET USER ID

  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const [filter, setFilter] = useState(FILTERS.LATEST);

  // ✅ CHECK IF USER REVIEWED

  const hasUserReviewed = useMemo(() => {
    if (!userId) return false;

    const matched = reviews.some((r: any) => {
      console.log("Comparing:", r.userId, "with", userId);

      return String(r.userId) === String(userId);
    });

    console.log("Has User Reviewed:", matched);

    return matched;
  }, [reviews, userId]);

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];

    switch (filter) {
      case FILTERS.HELPFUL:
        return sorted.sort((a, b) => b.helpful - a.helpful);

      case FILTERS.HIGH_RATING:
        return sorted.sort((a, b) => b.rating - a.rating);

      case FILTERS.LOW_RATING:
        return sorted.sort((a, b) => a.rating - b.rating);

      case FILTERS.LATEST:
      default:
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }
  }, [reviews, filter]);

  return (
    <View className="pt-6 px-1">
      {/* SUMMARY HEADER */}

      <View className="bg-white rounded-[24px] p-6 mb-6">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text
              style={typography.Poppins_l_semibold}
              className="text-neutral-900"
            >
              Reviews
            </Text>

            <Text className="text-neutral-400 text-xs uppercase">
              Community Feedback
            </Text>
          </View>

          <View className="items-end">
            <Text
              style={typography.Poppins_l_semibold}
              className="text-primary text-3xl"
            >
              {Math.round(Number(summary.averageRating))}
              <Text className="text-neutral-300 text-lg">/5</Text>
            </Text>

            <RatingStars rating={Number(summary.averageRating)} size={12} />

            <Text className="text-neutral-400 text-[10px] mt-1">
              Based on {summary.totalReviews} reviews
            </Text>
          </View>
        </View>

        {/* WRITE REVIEW BUTTON */}

        {!hasUserReviewed ? (
          <Pressable
            onPress={onWriteReviewPress}
            // activeOpacity={0.8}
            style={{
              backgroundColor: colors.secondary,
            }}
            className="flex-row items-center justify-center p-4 rounded-2xl"
          >
            <MessageCircleCode size={20} color={colors.light} />

            <Text className="text-light font-bold text-base ml-2">
              Write a Review
            </Text>
          </Pressable>
        ) : (
          <View className="p-4 bg-neutral-100 rounded-2xl items-center">
            <Text className="text-neutral-500 font-medium">
              You have already submitted a review
            </Text>
          </View>
        )}
      </View>

      <ReviewFilters filter={filter} setFilter={setFilter} />

      {/* REVIEWS LIST */}

      <View className="mt-4">
        {sortedReviews.map((r: any, index: number) => (
          <View key={index} className="bg-white rounded-2xl p-5 mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-row items-center">
                <View
                  style={{
                    backgroundColor: `${colors.secondary}15`,
                  }}
                  className="w-11 h-11 rounded-full justify-center items-center mr-3"
                >
                  <Text
                    style={{
                      color: colors.secondary,
                    }}
                    className="font-bold text-sm"
                  >
                    {getInitials(r.user)}
                  </Text>
                </View>

                <View>
                  <Text
                    style={typography.Poppins_m_semibold}
                    className="text-neutral-900"
                  >
                    {r.user}
                  </Text>

                  <Text className="text-neutral-400 text-[11px]">{r.date}</Text>
                </View>
              </View>

              <RatingStars rating={r.rating} size={10} />
            </View>

            <Text
              style={typography.Poppins_s_regular}
              className="text-neutral-700"
            >
              {r.comment}
            </Text>

            <View className="flex-row items-center mt-4 pt-3 border-t border-neutral-50">
              <ThumbsUp size={14} color={colors.secondary} />

              <Text className="text-neutral-500 ml-2">
                {r.helpful} found helpful
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
