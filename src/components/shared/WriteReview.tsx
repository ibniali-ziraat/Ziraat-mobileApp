import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useAuth } from "@/src/contexts/AuthContext";
import { WriteReviewProps } from "@/src/types/write-review.type";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function WriteReview({ onSubmit, loading }: WriteReviewProps) {
  const { userId } = useAuth();

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [title, setTitle] = useState("");

  const [error, setError] = useState("");

  // ✅ MAX LIMIT
  const MAX_CHARACTERS = 500;

  // ✅ ALLOWED CHARACTERS ONLY
  const sanitizeInput = (text: string) => {
    return text.replace(/[^a-zA-Z0-9\s\-\(\)=_]/g, "");
  };

  const handleCommentChange = (text: string) => {
    // ✅ REMOVE INVALID CHARACTERS
    const cleanedText = sanitizeInput(text);

    // ✅ LIMIT TO 500 CHARACTERS
    const limitedText = cleanedText.slice(0, MAX_CHARACTERS);

    setComment(limitedText);

    if (error) {
      setError("");
    }
  };

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

      userId,

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
    <View className="px-0 bg-light rounded-2xl">
      <Text style={typography.Poppins_l_semibold} className="mb-3">
        Write a Review
      </Text>

      <View>
        <TextInput
          style={typography.Poppins_s_regular}
          className="border border-dark rounded-xl p-3 text-dark h-28"
          placeholder="Share your experience..."
          placeholderTextColor={colors.dark}
          multiline
          textAlignVertical="top"
          value={comment}
          onChangeText={handleCommentChange}
          maxLength={MAX_CHARACTERS}
        />

        {/* ✅ CHARACTER COUNTER */}
        <Text
          style={typography.Poppins_xs_regular}
          className="text-neutral-500 text-right mt-2"
        >
          {comment.length}/{MAX_CHARACTERS} characters
        </Text>
      </View>

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
