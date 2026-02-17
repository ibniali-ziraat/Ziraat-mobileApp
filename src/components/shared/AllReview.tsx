import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ThumbsUp } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ZiraatCard from "./ZiraatProfileCard";

export default function Review({
  reviews = [],
  summary,
  onWriteReviewPress,
}: any) {
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };
  // console.log(reviews, "reviews");

  const [filter, setFilter] = useState(FILTERS.LATEST);

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
    <View className="pt-6">
      <TouchableOpacity
        onPress={onWriteReviewPress}
        className="bg-secondary p-3 rounded-xl"
      >
        <Text className="text-light text-center font-semibold text-lg">
          Write a Review
        </Text>
      </TouchableOpacity>

      <Text style={typography.Poppins_l_semibold} className="mt-8">
        Customer Reviews
      </Text>

      <View className="mb-2">
        <Text style={typography.Poppins_m_semibold}>
          {summary.averageRating}{" "}
          <RatingStars rating={Number(summary.averageRating)} size={14} />
        </Text>

        <Text style={typography.Poppins_s_regular} className="text-dark">
          {summary.totalReviews} Reviews
        </Text>
      </View>

      <ReviewFilters filter={filter} setFilter={setFilter} />

      {sortedReviews.map((r) => (
        <ZiraatCard key={r.id} width="100%" marginBottom={1}>
          <View>
            <View className="flex-row justify-between mb-2">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-secondary justify-center items-center mr-3">
                  <Text
                    style={typography.Poppins_s_semibold}
                    className="text-light"
                  >
                    {getInitials(r.user)}
                  </Text>
                </View>

                <View>
                  <Text style={typography.Poppins_m_semibold}>{r.user}</Text>
                  <Text style={typography.Poppins_xs_regular}>{r.date}</Text>
                </View>
              </View>

              <RatingStars rating={r.rating} size={16} />
            </View>

            {/* {r.title ? (
              <Text style={typography.Poppins_s_semibold}>{r.title}</Text>
            ) : null} */}

            <Text style={typography.Poppins_s_regular}>{r.comment}</Text>

            <View className="flex-row items-center mt-3">
              <ThumbsUp size={16} color={colors.secondary} />
              <Text style={typography.Poppins_xs_regular} className="ml-1">
                {r.helpful} found helpful
              </Text>
            </View>
          </View>
        </ZiraatCard>
      ))}
    </View>
  );
}
