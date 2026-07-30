import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
import RatingStars from "@/src/components/shared/RatingStars";
import WriteReview from "@/src/components/shared/WriteReview";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ArrowRight, ThumbsUp } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Platform, Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";
import { ScreenContent } from "./ScreenContent";
import ScreenLayout from "./ScreenLayout";

interface ReviewItem {
  user: string;
  date: string;
  rating: number;
  comment: string;
  helpful: number;
}

interface ReviewSummary {
  averageRating: string | number;
  totalReviews: string | number;
}

interface ReviewProps {
  reviews?: ReviewItem[];
  summary?: ReviewSummary;
  hasUserReviewed?: boolean;
  onSubmitReview?: () => void;
  loading?: boolean;
  onViewAllPress?: () => void;
  showAll?: boolean;
  hideHeader?: boolean;
}

export default function Review({
  reviews = [],
  summary,
  hasUserReviewed = false,
  onSubmitReview,
  loading = false,
  onViewAllPress,
  showAll = false,
  hideHeader = false,
}: ReviewProps) {
  const [filter, setFilter] = useState(FILTERS.LATEST);

  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];

    switch (filter) {
      case FILTERS.HELPFUL:
        return sorted.sort((a, b) => b.helpful - a.helpful);
      case FILTERS.HIGH_RATING:
        return sorted.sort((a, b) => b.rating - a.rating);
      case FILTERS.LOW_RATING:
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }
  }, [reviews, filter]);

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 2);

  return (
    <ScreenLayout scrollable={false}>
      <ScreenContent className="px-0">
        <View className="">
          {/* HEADER SECTION */}
          {!hideHeader && (
            <View className="py-5 mb-2">
              <View className="flex-row">
                <View className="flex-1 pr-4">
                  <Text
                    style={typography.Poppins_l_semibold}
                    className="text-neutral-900 text-xl leading-tight"
                  >
                    Reviews
                  </Text>
                  <Text className="text-neutral-400 text-xs uppercase tracking-wider mt-0.5">
                    Community Feedback
                  </Text>
                </View>

                <View className="items-end bg-neutral-50 p-3 rounded-xl min-w-[100px]">
                  <Text
                    style={typography.Poppins_l_semibold}
                    className="text-primary text-2xl font-bold"
                  >
                    {Math.round(Number(summary?.averageRating || 0))}
                    <Text className="text-neutral-400 text-sm font-normal">
                      /5
                    </Text>
                  </Text>

                  <View className="my-1">
                    <RatingStars
                      rating={Number(summary?.averageRating || 0)}
                      size={12}
                    />
                  </View>

                  <Text
                    className="text-neutral-400 text-[10px] text-right"
                    numberOfLines={1}
                  >
                    {summary?.totalReviews || 0} reviews
                  </Text>
                </View>
              </View>

              {/* WRITE REVIEW CTA */}
              <View className="mt-5">
                {!hasUserReviewed ? (
                  <WriteReview onSubmit={onSubmitReview} loading={loading} />
                ) : (
                  <View
                    style={{
                      backgroundColor: `${colors.secondary}10`,
                      borderColor: `${colors.secondary}20`,
                      borderWidth: 1,
                    }}
                    className="p-4 rounded-lg items-center justify-center"
                  >
                    <Text
                      style={{ color: colors.secondary }}
                      className="font-medium text-sm text-center"
                    >
                      You have already submitted a review
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* FILTERS CONTAINER */}
          <View className="mb-4 "></View>

          {reviews.length > 1 && (
            <ReviewFilters filter={filter} setFilter={setFilter} />
          )}

          {/* REVIEWS LIST */}
          <View className="flex-1">
            {(showAll ? displayedReviews : displayedReviews.slice(0, 5)).map(
              (r, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#FFFFFF",
                    ...Platform.select({
                      ios: {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.04,
                        shadowRadius: 3,
                      },
                      android: {
                        elevation: 1,
                      },
                    }),
                  }}
                  className="rounded-lg p-4 mb-4 border border-n"
                >
                  {/* User Info Header */}
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center flex-1 pr-2">
                      <View
                        style={{ backgroundColor: `${colors.secondary}15` }}
                        className="w-10 h-10 rounded-full justify-center items-center mr-3"
                      >
                        <Text
                          style={{ color: colors.secondary }}
                          className="font-bold text-xs"
                        >
                          {getInitials(r.user)}
                        </Text>
                      </View>

                      <View className="flex-1">
                        <Text
                          style={typography.Poppins_m_semibold}
                          className="text-neutral-900 text-sm"
                          numberOfLines={1}
                        >
                          {r.user}
                        </Text>
                        <Text className="text-neutral-400 text-[11px] mt-0.5">
                          {r.date}
                        </Text>
                      </View>
                    </View>

                    <View className="bg-neutral-50 px-2 py-1 rounded-md">
                      <RatingStars rating={r.rating} size={10} />
                    </View>
                  </View>

                  {/* Review Body */}
                  <Text
                    style={typography.Poppins_s_regular}
                    className="text-neutral-700 text-sm leading-relaxed"
                  >
                    {r.comment}
                  </Text>

                  {/* Footer Feedback */}
                  <View className="flex-row items-center mt-4 pt-3 border-t border-neutral-100/50">
                    <ThumbsUp size={13} color={colors.secondary} />
                    <Text className="text-neutral-500 text-xs ml-2 font-medium">
                      {r.helpful} found this helpful
                    </Text>
                  </View>
                </View>
              ),
            )}

            {/* VIEW ALL BUTTON */}
            {!showAll && reviews.length > 2 && (
              <Pressable
                onPress={onViewAllPress}
                style={({ pressed }) => ({
                  backgroundColor: `${colors.secondary}15`,
                  opacity: pressed ? 0.8 : 1,
                })}
                className="mt-2 p-4 rounded-lg flex-row items-center justify-center gap-2 active:opacity-70"
              >
                <Text
                  style={{ color: colors.secondary }}
                  className="font-semibold text-sm"
                >
                  View All Reviews
                </Text>
                <ArrowRight size={16} color={colors.secondary} />
              </Pressable>
            )}
          </View>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}
