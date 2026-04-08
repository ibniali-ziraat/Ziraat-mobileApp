// // // import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
// // // import RatingStars from "@/src/components/shared/RatingStars";
// // // import WriteReview from "@/src/components/shared/WriteReview";
// // // import { colors } from "@/src/constants/colors";
// // // import { typography } from "@/src/constants/fonts/typography";
// // // import { ThumbsUp, User, X } from "lucide-react-native";
// // // import React, { useState } from "react";
// // // import { Text, TouchableOpacity, View } from "react-native";
// // // import data from "../../data/Review.json";

// // // export default function Review() {
// // //   const { summary, reviews: initialReviews } = data;
// // //   const [reviews, setReviews] = useState(initialReviews);
// // //   const [modalVisible, setModalVisible] = useState(false);
// // //   const [filter, setFilter] = useState(FILTERS.LATEST);

// // //   const addReview = (newReview) => {
// // //     setReviews([newReview, ...reviews]);
// // //     setModalVisible(false);
// // //   };

// // //   const sortedReviews = React.useMemo(() => {
// // //     let sorted = [...reviews];
// // //     switch (filter) {
// // //       case FILTERS.HELPFUL:
// // //         sorted.sort((a, b) => b.helpful - a.helpful);
// // //         break;
// // //       case FILTERS.HIGH_RATING:
// // //         sorted.sort((a, b) => b.rating - a.rating);
// // //         break;
// // //       case FILTERS.LOW_RATING:
// // //         sorted.sort((a, b) => a.rating - b.rating);
// // //         break;
// // //       default:
// // //         sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
// // //     }
// // //     return sorted;
// // //   }, [reviews, filter]);

// // //   return (
// // //     <View className="mt-6 ">
// // //       {/* Header */}
// // //       <View className="flex-row justify-between items-center mb-4">
// // //         <Text style={typography.Poppins_l_semibold}>Customer Reviews</Text>

// // //         <TouchableOpacity
// // //           onPress={() => setModalVisible(true)}
// // //           className="px-4 py-2 rounded-full"
// // //           style={{ backgroundColor: colors.secondary }}
// // //         >
// // //           <Text style={{ color: colors.light }} className=" text-sm">
// // //             Write Review
// // //           </Text>
// // //         </TouchableOpacity>
// // //       </View>

// // //       {/* Summary */}
// // //       <View className="mb-4">
// // //         <View className="flex-row items-center">
// // //           <Text style={typography.Poppins_xl_semibold}>
// // //             {summary.averageRating}
// // //           </Text>

// // //           <View className="ml-3">
// // //             <RatingStars rating={summary.averageRating} size={14} />
// // //             <Text
// // //               style={[
// // //                 typography.Poppins_s_regular,
// // //                 { color: colors.dark, opacity: 0.6 },
// // //               ]}
// // //             >
// // //               {summary.totalReviews} Reviews
// // //             </Text>
// // //           </View>
// // //         </View>
// // //       </View>

// // //       {/* Filters */}
// // //       <ReviewFilters filter={filter} setFilter={setFilter} />

// // //       {/* Reviews */}
// // //       <View className="mt-4">
// // //         {sortedReviews.map((r, idx) => (
// // //           <View key={r.id} className="py-4">
// // //             {/* User Row */}
// // //             <View className="flex-row items-center justify-between mb-2">
// // //               <View className="flex-row items-center">
// // //                 <View
// // //                   className="w-9 h-9 rounded-full justify-center items-center mr-3"
// // //                   style={{ backgroundColor: colors.secondary + "15" }}
// // //                 >
// // //                   <User size={18} color={colors.secondary} />
// // //                 </View>

// // //                 <View>
// // //                   <Text style={typography.Poppins_m_semibold}>{r.user}</Text>
// // //                   <Text
// // //                     style={[
// // //                       typography.Poppins_xs_regular,
// // //                       { color: colors.dark, opacity: 0.5 },
// // //                     ]}
// // //                   >
// // //                     {r.date}
// // //                   </Text>
// // //                 </View>
// // //               </View>

// // //               <RatingStars rating={r.rating} size={14} />
// // //             </View>

// // //             {/* Comment */}
// // //             <Text
// // //               style={[
// // //                 typography.Poppins_s_regular,
// // //                 { color: colors.dark, opacity: 0.8 },
// // //               ]}
// // //             >
// // //               {r.comment}
// // //             </Text>

// // //             {/* Helpful */}
// // //             <View className="flex-row items-center mt-3">
// // //               <ThumbsUp size={14} color={colors.secondary} />
// // //               <Text
// // //                 style={[
// // //                   typography.Poppins_xs_regular,
// // //                   { color: colors.dark, opacity: 0.6 },
// // //                 ]}
// // //                 className="ml-2"
// // //               >
// // //                 {r.helpful} found this helpful
// // //               </Text>
// // //             </View>

// // //             {/* Divider */}
// // //             {idx !== sortedReviews.length - 1 && (
// // //               <View
// // //                 className="mt-4"
// // //                 style={{
// // //                   height: 1,
// // //                   backgroundColor: colors.dark,
// // //                   opacity: 0.08,
// // //                 }}
// // //               />
// // //             )}
// // //           </View>
// // //         ))}
// // //       </View>

      
// // //         <View className="flex-1 justify-center items-center bg-black/40">
// // //           <View
// // //             style={{ backgroundColor: colors.light }}
// // //             className=" rounded-2xl p-5 w-11/12"
// // //           >
// // //             <TouchableOpacity
// // //               onPress={() => setModalVisible(false)}
// // //               className="self-end mb-2"
// // //             >
// // //               <X size={24} color={colors.dark} />
// // //             </TouchableOpacity>

// // //             <WriteReview onSubmit={addReview} />
// // //           </View>
// // //         </View>
      
// // //     </View>
// // //   );
// // // }



// // import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
// // import RatingStars from "@/src/components/shared/RatingStars";
// // import WriteReview from "@/src/components/shared/WriteReview";
// // import { colors } from "@/src/constants/colors";
// // import { typography } from "@/src/constants/fonts/typography";
// // import { useAddReview } from "@/src/modules/products/hooks/data/useReview";
// // import { ThumbsUp, User } from "lucide-react-native";
// // import { useMemo, useState } from "react";
// // import { Text, View } from "react-native";
// // import data from "../../data/Review.json";

// // // ✅ IMPORT YOUR HOOK


// // export default function Review() {
// //   const { summary, reviews: initialReviews } = data;

// //   const [reviews, setReviews] = useState(initialReviews);
// //   const [filter, setFilter] = useState(FILTERS.LATEST);

// //   // ✅ USE API HOOK
// //   const { mutate, isPending } = useAddReview();

// //   // ✅ HANDLE SUBMIT
// //   const handleAddReview = (newReview: any) => {
// //     console.log("Submitting:", newReview);

// //     mutate(newReview, {
// //       onSuccess: (res) => {
// //         console.log("API SUCCESS:", res);

// //         // ✅ update UI instantly
// //         setReviews((prev) => [newReview, ...prev]);
// //       },
// //       onError: (err) => {
// //         console.log("API ERROR:", err);
// //       },
// //     });
// //   };

// //   // ✅ SORTING
// //   const sortedReviews = useMemo(() => {
// //     let sorted = [...reviews];

// //     switch (filter) {
// //       case FILTERS.HELPFUL:
// //         sorted.sort((a, b) => b.helpful - a.helpful);
// //         break;
// //       case FILTERS.HIGH_RATING:
// //         sorted.sort((a, b) => b.rating - a.rating);
// //         break;
// //       case FILTERS.LOW_RATING:
// //         sorted.sort((a, b) => a.rating - b.rating);
// //         break;
// //       default:
// //         sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
// //     }

// //     return sorted;
// //   }, [reviews, filter]);

// //   return (
// //     <View className="mt-6">
// //       {/* HEADER */}
// //       <Text style={typography.Poppins_l_semibold} className="mb-4">
// //         Customer Reviews
// //       </Text>

// //       {/* SUMMARY */}
// //       <View className="mb-4">
// //         <View className="flex-row items-center">
// //           <Text style={typography.Poppins_xl_semibold}>
// //             {summary.averageRating}
// //           </Text>

// //           <View className="ml-3">
// //             <RatingStars rating={summary.averageRating} size={14} />
// //             <Text
// //               style={[
// //                 typography.Poppins_s_regular,
// //                 { color: colors.dark, opacity: 0.6 },
// //               ]}
// //             >
// //               {summary.totalReviews} Reviews
// //             </Text>
// //           </View>
// //         </View>
// //       </View>

// //       {/* ✅ INLINE FORM (NO BUTTON, NO MODAL) */}
// //       <WriteReview onSubmit={handleAddReview} loading={isPending} />

// //       {/* FILTERS */}
// //       <ReviewFilters filter={filter} setFilter={setFilter} />

// //       {/* REVIEWS */}
// //       <View className="mt-4">
// //         {sortedReviews.map((r, idx) => (
// //           <View key={r.id} className="py-4">
// //             {/* USER */}
// //             <View className="flex-row items-center justify-between mb-2">
// //               <View className="flex-row items-center">
// //                 <View
// //                   className="w-9 h-9 rounded-full justify-center items-center mr-3"
// //                   style={{ backgroundColor: colors.secondary + "15" }}
// //                 >
// //                   <User size={18} color={colors.secondary} />
// //                 </View>

// //                 <View>
// //                   <Text style={typography.Poppins_m_semibold}>
// //                     {r.user}
// //                   </Text>
// //                   <Text
// //                     style={[
// //                       typography.Poppins_xs_regular,
// //                       { color: colors.dark, opacity: 0.5 },
// //                     ]}
// //                   >
// //                     {r.date}
// //                   </Text>
// //                 </View>
// //               </View>

// //               <RatingStars rating={r.rating} size={14} />
// //             </View>

// //             {/* COMMENT */}
// //             <Text
// //               style={[
// //                 typography.Poppins_s_regular,
// //                 { color: colors.dark, opacity: 0.8 },
// //               ]}
// //             >
// //               {r.comment}
// //             </Text>

// //             {/* HELPFUL */}
// //             <View className="flex-row items-center mt-3">
// //               <ThumbsUp size={14} color={colors.secondary} />
// //               <Text
// //                 style={[
// //                   typography.Poppins_xs_regular,
// //                   { color: colors.dark, opacity: 0.6 },
// //                 ]}
// //                 className="ml-2"
// //               >
// //                 {r.helpful} found this helpful
// //               </Text>
// //             </View>

// //             {/* DIVIDER */}
// //             {idx !== sortedReviews.length - 1 && (
// //               <View
// //                 className="mt-4"
// //                 style={{
// //                   height: 1,
// //                   backgroundColor: colors.dark,
// //                   opacity: 0.08,
// //                 }}
// //               />
// //             )}
// //           </View>
// //         ))}
// //       </View>
// //     </View>
// //   );
// // }



// import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
// import RatingStars from "@/src/components/shared/RatingStars";
// import { colors } from "@/src/constants/colors";
// import { typography } from "@/src/constants/fonts/typography";
// import { useAuth } from "@/src/contexts/AuthContext";
// import { ThumbsUp } from "lucide-react-native";
// import { useMemo, useState } from "react";
// import { ActivityIndicator, Text, View } from "react-native";
// import WriteReview from "./WriteReview";


// import {
//   useAddReview,
//   useListReviews,
// } from "@/src/modules/products/hooks/data/useReview";

// export default function Review({ entityId, entityTypeId }: any) {
//   const { userId } = useAuth();

//   const [filter, setFilter] = useState(FILTERS.LATEST);


//   const { data, isLoading } = useListReviews({
//     entityId,
//     entityTypeId,
//     pageNumber: 1,
//     pageSize: 10,
//   });

 
//   const { mutate, isPending } = useAddReview();

//   // ✅ SAFE DATA
//   const reviews = data?.data || [];
//   const summary = data?.summary || {
//     averageRating: 0,
//     totalReviews: 0,
//   };

//   // ✅ CHECK USER REVIEW
//   const hasUserReviewed = useMemo(() => {
//     if (!userId) return false;

//     return reviews.some(
//       (r: any) => String(r.userId) === String(userId)
//     );
//   }, [reviews, userId]);

//   // ✅ SORT (frontend filter)
//   const sortedReviews = useMemo(() => {
//     const sorted = [...reviews];

//     switch (filter) {
//       case FILTERS.HELPFUL:
//         return sorted.sort((a, b) => b.helpful - a.helpful);

//       case FILTERS.HIGH_RATING:
//         return sorted.sort((a, b) => b.rating - a.rating);

//       case FILTERS.LOW_RATING:
//         return sorted.sort((a, b) => a.rating - b.rating);

//       default:
//         return sorted.sort(
//           (a, b) =>
//             new Date(b.date).getTime() -
//             new Date(a.date).getTime()
//         );
//     }
//   }, [reviews, filter]);

//   // ✅ ADD REVIEW HANDLER
//   const handleAddReview = (newReview: any) => {
//     mutate(
//       {
//         ...newReview,
//         entityId,
//         entityTypeId,
//       },
//       {
//         onSuccess: () => {
//           console.log("Review added & list auto refreshed ");
//         },
//         onError: (err) => {
//           console.log("API ERROR:", err);
//         },
//       }
//     );
//   };

//   //  LOADING STATE
//   if (isLoading) {
//     return (
//       <View className="p-6">
//         <ActivityIndicator size="large" color={colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <View className="pt-6 px-1">
//       {/* HEADER */}
//       <View className="bg-white rounded-[24px] p-6 mb-6">
//         <View className="flex-row justify-between items-center mb-6">
//           <View>
//             <Text
//               style={typography.Poppins_l_semibold}
//               className="text-neutral-900"
//             >
//               Reviews
//             </Text>

//             <Text className="text-neutral-400 text-xs uppercase">
//               Community Feedback
//             </Text>
//           </View>

//           <View className="items-end">
//             <Text className="text-primary text-3xl">
//               {Math.round(Number(summary.averageRating))}
//               <Text className="text-neutral-300 text-lg">/5</Text>
//             </Text>

//             <RatingStars
//               rating={Number(summary.averageRating)}
//               size={12}
//             />

//             <Text className="text-neutral-400 text-[10px] mt-1">
//               Based on {summary.totalReviews} reviews
//             </Text>
//           </View>
//         </View>

//         {/*  INLINE FORM */}
//         {!hasUserReviewed ? (
//           <WriteReview
//             onSubmit={handleAddReview}
//             loading={isPending}
//           />
//         ) : (
//           <View className="p-4 bg-neutral-100 rounded-2xl items-center">
//             <Text className="text-neutral-500 font-medium">
//               You have already submitted a review
//             </Text>
//           </View>
//         )}
//       </View>

//       {/* FILTERS */}
//       <ReviewFilters filter={filter} setFilter={setFilter} />

//       {/* REVIEWS */}
//       <View className="mt-4">
//         {sortedReviews.map((r: any, index: number) => (
//           <View
//             key={index}
//             className="bg-white rounded-2xl p-5 mb-4"
//           >
//             <View className="flex-row justify-between items-start mb-3">
//               <View className="flex-row items-center">
//                 <View
//                   style={{
//                     backgroundColor: `${colors.secondary}15`,
//                   }}
//                   className="w-11 h-11 rounded-full justify-center items-center mr-3"
//                 >
//                   <Text
//                     style={{ color: colors.secondary }}
//                     className="font-bold text-sm"
//                   >
//                     {r.user?.[0] || "U"}
//                   </Text>
//                 </View>

//                 <View>
//                   <Text style={typography.Poppins_m_semibold}>
//                     {r.user}
//                   </Text>

//                   <Text className="text-neutral-400 text-[11px]">
//                     {r.date}
//                   </Text>
//                 </View>
//               </View>

//               <RatingStars rating={r.rating} size={10} />
//             </View>

//             <Text className="text-neutral-700">{r.comment}</Text>

//             <View className="flex-row items-center mt-4 pt-3 border-t border-neutral-50">
//               <ThumbsUp size={14} color={colors.secondary} />

//               <Text className="text-neutral-500 ml-2">
//                 {r.helpful} found helpful
//               </Text>
//             </View>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }


import ReviewFilters, { FILTERS } from "@/src/components/shared/Filter";
import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  useAddReview,
  useListReviews,
} from "@/src/modules/products/hooks/data/useReview";
import { ThumbsUp } from "lucide-react-native";
import { useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import WriteReview from "./WriteReview";

export default function Review({ entityId, entityTypeId }: any) {
  const { userId } = useAuth();

  const [filter, setFilter] = useState(FILTERS.LATEST);

  const { data, isLoading } = useListReviews({
    entityId,
    entityTypeId,
    pageNumber: 1,
    pageSize: 10,
  });

  const { mutate, isPending } = useAddReview();

  const reviews = data?.data || [];
  const summary = data?.summary || {
    averageRating: 0,
    totalReviews: 0,
  };

  const hasUserReviewed = useMemo(() => {
    if (!userId) return false;
    return reviews.some((r: any) => String(r.userId) === String(userId));
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
      default:
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  }, [reviews, filter]);

  // ✅ entityId and entityTypeId added here
  const handleAddReview = (newReview: any) => {
    mutate(
      {
        ...newReview,
        entityId,
        entityTypeId,
      },
      {
        onSuccess: () => {
          console.log("Review submitted successfully");
        },
        onError: (err) => {
          console.log("API ERROR:", err);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <View className="p-6">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View className="pt-6 px-1">
      {/* HEADER */}
      <View className="bg-white rounded-[24px] p-6 mb-6">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text style={typography.Poppins_l_semibold} className="text-neutral-900">
              Reviews
            </Text>
            <Text className="text-neutral-400 text-xs uppercase">
              Community Feedback
            </Text>
          </View>

          <View className="items-end">
            <Text style={typography.Poppins_l_semibold} className="text-primary text-3xl">
              {Math.round(Number(summary.averageRating))}
              <Text className="text-neutral-300 text-lg">/5</Text>
            </Text>
            <RatingStars rating={Number(summary.averageRating)} size={12} />
            <Text className="text-neutral-400 text-[10px] mt-1">
              Based on {summary.totalReviews} reviews
            </Text>
          </View>
        </View>

        {!hasUserReviewed ? (
          <WriteReview onSubmit={handleAddReview} loading={isPending} />
        ) : (
          <View className="p-4 bg-neutral-100 rounded-2xl items-center">
            <Text className="text-neutral-500 font-medium">
              You have already submitted a review
            </Text>
          </View>
        )}
      </View>

      {/* FILTERS */}
      <ReviewFilters filter={filter} setFilter={setFilter} />

      {/* REVIEWS */}
      <View className="mt-4">
        {sortedReviews.map((r: any, index: number) => (
          <View key={index} className="bg-white rounded-2xl p-5 mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-row items-center">
                <View
                  style={{ backgroundColor: `${colors.secondary}15` }}
                  className="w-11 h-11 rounded-full justify-center items-center mr-3"
                >
                  <Text style={{ color: colors.secondary }} className="font-bold text-sm">
                    {r.user?.[0] || "U"}
                  </Text>
                </View>

                <View>
                  <Text style={typography.Poppins_m_semibold} className="text-neutral-900">
                    {r.user}
                  </Text>
                  <Text className="text-neutral-400 text-[11px]">{r.date}</Text>
                </View>
              </View>

              <RatingStars rating={r.rating} size={10} />
            </View>

            <Text style={typography.Poppins_s_regular} className="text-neutral-700">
              {r.comment}
            </Text>

            <View className="flex-row items-center mt-4 pt-3 border-t border-neutral-50">
              <ThumbsUp size={14} color={colors.secondary} />
              <Text className="text-neutral-500 ml-2">{r.helpful} found helpful</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}