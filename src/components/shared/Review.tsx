import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
import RatingStars from "@/src/components/shared/RatingStars";
import WriteReview from "@/src/components/shared/WriteReview";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ThumbsUp, User, X } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import data from "../../data/Review.json";
import CsText from "./CsText";
import ZiraatCard from "./ZiraatProfileCard";

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

      case FILTERS.LATEST:
      default:
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return sorted;
  }, [reviews, filter]);

  return (
     <View className=" pt-6" >
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-secondary p-3 rounded-xl "
      >
        <CsText className="text-light text-center font-semibold text-lg">
          Write a Review
       </CsText>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-light rounded-2xl p-5 w-11/12 shadow-lg">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="self-end mb-2"
            >
              <X size={26} color="black"/>
            </TouchableOpacity>

            <WriteReview onSubmit={addReview} />
          </View>
        </View>
      </Modal>

      <CsText 
      style={[typography.Poppins_l_semibold]}
      
      className="mt-8 ">
        Customer Reviews
     </CsText>

      <View className="mb-2">
        <CsText 
        style={[typography.Poppins_m_semibold]}
        
        className=" flex-row items-center">
          {summary.averageRating}{" "}
          <RatingStars rating={summary.averageRating} size={14} />
       </CsText>

        <CsText 
        style={[typography.Poppins_s_regular]}
        
        className="text-dark ">{summary.totalReviews} Reviews</CsText>
      </View>

      <ReviewFilters filter={filter} setFilter={setFilter} />

      {sortedReviews.map((r) => (
        <ZiraatCard
        
        width="100%"
        paddingHorizontal={1}
        paddingVertical={1}
        
        marginBottom={1}>

          <View
          key={r.id}
          
        >
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full justify-center items-center mr-3 border border-secondary">
                <User size={20} color={colors.secondary} />
              </View>

              <View>
                <CsText 
                
                style={[typography.Poppins_m_semibold]}
                >{r.user}
                </CsText>
                <CsText 
                
                style={[typography.Poppins_s_regular]}
                
                className=" text-dark">{r.date}</CsText>
              </View>
            </View>

            <RatingStars rating={r.rating} size={16} />
          </View>

          <CsText 
          style={[typography.Poppins_s_regular]}
          
          className="text-dark mt-1">{r.comment}</CsText>

          <View className="flex-row items-center mt-3 mb-1">
            <ThumbsUp
              size={17}
              color={colors.secondary}
              fill={colors.secondary}
            />
            <CsText 
            
            style={[typography.Poppins_xs_regular]}
            
            className="text-dark ml-1 text-sm">
              {r.helpful} People found it helpful
           </CsText>
          </View>
        </View>
        </ZiraatCard>
      ))}
    </View>
  );
}
