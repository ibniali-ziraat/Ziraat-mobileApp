import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useAuth } from "@/src/contexts/AuthContext";
import { WriteReviewProps } from "@/src/types/write-review.type";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function WriteReview({ onSubmit, loading }: WriteReviewProps) {
  const { userId } = useAuth(); // ✅ GET USER ID

  console.log(userId, "userId.....");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!rating) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please write your review");
      return;
    }

    if (!userId) {
      setError("User not logged in");
      return;
    }

    setError("");

    const newReview = {
      id: Date.now(),

      // ✅ IMPORTANT
      userId: userId,

      user: "Anonymous",
      date: new Date().toISOString(),

      rating,
      comment,
      title,
      helpful: 0,
    };

    onSubmit(newReview);

    setRating(0);
    setComment("");
    setTitle("");
  };

  return (
    <View className="px-0 bg-light rounded-2xl mt-6">
      <Text style={typography.Poppins_l_semibold} className="mb-3">
        Write a Review
      </Text>

      <TextInput
        style={typography.Poppins_s_regular}
        className="border border-dark rounded-xl p-3 text-dark h-24"
        placeholder="Share your experience..."
        placeholderTextColor={colors.dark}
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <View className="flex-row items-center my-4">
        <Text style={typography.Poppins_s_medium} className="text-lg mr-2">
          Your Rating:
        </Text>

        <RatingStars rating={rating} size={24} editable onChange={setRating} />
      </View>

      {error ? (
        <Text
          style={typography.Poppins_xs_regular}
          className="text-red-500 mb-2"
        >
          {error}
        </Text>
      ) : null}

      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        className={`p-3 rounded-xl ${loading ? "bg-gray-400" : "bg-secondary"}`}
      >
        <Text
          style={typography.Poppins_s_semibold}
          className="text-center text-light"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Text>
      </Pressable>
    </View>
  );
}
