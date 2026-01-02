import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { WriteReviewProps } from "@/src/types/write-review.type";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import CsText from "./CsText";

export default function WriteReview({ onSubmit }:WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!rating || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      user: "Anonymous",
      date: new Date().toLocaleDateString(),
      rating,
      comment,
      helpful: 0,
    };

    onSubmit(newReview);
    setRating(0);
    setComment("");
  };

  return (
    <View className="p-4 mt-4 bg-light rounded-2xl shadow border border-neutral">

      <CsText
      style={[typography.Poppins_l_semibold]}
      className=" mb-2">Write a Review</CsText>

      <TextInput
      style={[typography.Poppins_s_regular]}

        className="border border-dark rounded-xl p-3 text-dark h-28"
        placeholder="Share your experience..."
        placeholderTextColor={colors.dark}
        multiline
        value={comment}
        onChangeText={setComment}
      />
   
      <View className="flex-row items-center my-4">
        <CsText 
        style={[typography.Poppins_s_medium]}
        
        className="text-lg mr-1">Your Rating:</CsText>
 
        <RatingStars
          rating={rating}
          size={22}
          editable={true}
          onChange={(value) => setRating(value)}
        />
      </View>
    
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-secondary mt-1 p-3 rounded-xl"
      >
        <CsText 
        style={[typography.Poppins_s_semibold]}
        
        className="text-center text-light font-semibold">
          Submit Review
       </CsText>
      </TouchableOpacity>
    </View>
  );
}
