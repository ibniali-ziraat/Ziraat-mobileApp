import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
import RatingStars from "@/src/components/shared/RatingStars";
import WriteReview from "@/src/components/shared/WriteReview";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ThumbsUp, User, X } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import data from "../../data/Review.json";

export default function Review() {
  const { summary, reviews: initialReviews } = data;
  const [reviews, setReviews] = useState(initialReviews);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState(FILTERS.LATEST);

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
    setModalVisible(false);
  };

  const sortedReviews = React.useMemo(() => {
    let sorted = [...reviews];
    switch (filter) {
      case FILTERS.HELPFUL:
        sorted.sort((a, b) => b.helpful - a.helpful);
        break;
      case FILTERS.HIGH_RATING:
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case FILTERS.LOW_RATING:
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return sorted;
  }, [reviews, filter]);

  return (
    <View className="mt-6 ">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text style={typography.Poppins_l_semibold}>Customer Reviews</Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: colors.secondary }}
        >
          <Text style={{ color: colors.light }} className=" text-sm">
            Write Review
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View className="mb-4">
        <View className="flex-row items-center">
          <Text style={typography.Poppins_xl_semibold}>
            {summary.averageRating}
          </Text>

          <View className="ml-3">
            <RatingStars rating={summary.averageRating} size={14} />
            <Text
              style={[
                typography.Poppins_s_regular,
                { color: colors.dark, opacity: 0.6 },
              ]}
            >
              {summary.totalReviews} Reviews
            </Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <ReviewFilters filter={filter} setFilter={setFilter} />

      {/* Reviews */}
      <View className="mt-4">
        {sortedReviews.map((r, idx) => (
          <View key={r.id} className="py-4">
            {/* User Row */}
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <View
                  className="w-9 h-9 rounded-full justify-center items-center mr-3"
                  style={{ backgroundColor: colors.secondary + "15" }}
                >
                  <User size={18} color={colors.secondary} />
                </View>

                <View>
                  <Text style={typography.Poppins_m_semibold}>{r.user}</Text>
                  <Text
                    style={[
                      typography.Poppins_xs_regular,
                      { color: colors.dark, opacity: 0.5 },
                    ]}
                  >
                    {r.date}
                  </Text>
                </View>
              </View>

              <RatingStars rating={r.rating} size={14} />
            </View>

            {/* Comment */}
            <Text
              style={[
                typography.Poppins_s_regular,
                { color: colors.dark, opacity: 0.8 },
              ]}
            >
              {r.comment}
            </Text>

            {/* Helpful */}
            <View className="flex-row items-center mt-3">
              <ThumbsUp size={14} color={colors.secondary} />
              <Text
                style={[
                  typography.Poppins_xs_regular,
                  { color: colors.dark, opacity: 0.6 },
                ]}
                className="ml-2"
              >
                {r.helpful} found this helpful
              </Text>
            </View>

            {/* Divider */}
            {idx !== sortedReviews.length - 1 && (
              <View
                className="mt-4"
                style={{
                  height: 1,
                  backgroundColor: colors.dark,
                  opacity: 0.08,
                }}
              />
            )}
          </View>
        ))}
      </View>

      {/* Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-black/40">
          <View
            style={{ backgroundColor: colors.light }}
            className=" rounded-2xl p-5 w-11/12"
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="self-end mb-2"
            >
              <X size={24} color={colors.dark} />
            </TouchableOpacity>

            <WriteReview onSubmit={addReview} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
