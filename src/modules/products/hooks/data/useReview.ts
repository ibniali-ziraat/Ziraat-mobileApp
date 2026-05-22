// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { addReview, listReviews } from "../../services/review.services";

// export const useAddReview = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload) => addReview(payload),

//     onSuccess: (data) => {
//       // ✅ Invalidate reviews list so UI refreshes
//       queryClient.invalidateQueries({ queryKey: ["reviews"] });

//       // ✅ Optional: show toast / snackbar
//       console.log("Review added successfully");
//     },

//     onError: (error) => {
//       console.log("Add Review Error:", error);
//     },
//   });
// };

// export const useListReviews = (filters: any) => {
//   return useQuery({
//     queryKey: ["reviews", filters], // ✅ unique cache per page
//     queryFn: () => listReviews(filters),

//     keepPreviousData: true, // ✅ smooth pagination UX
//     staleTime: 1000 * 60 * 2,
//   });
// };

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addReview, listReviews } from "../../services/review.services";

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      return await addReview(payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });

      // console.log("Review added successfully");
    },

    onError: (error: any) => {
      // console.log("Add Review Error:", error);
    },
  });
};

export const useListReviews = (filters: any) => {
  return useQuery({
    queryKey: ["reviews", filters],

    queryFn: async () => {
      try {
        const response = await listReviews(filters);

        // ✅ SAFE EMPTY RESPONSE
        return (
          response ?? {
            items: {
              data: [],
            },
            ratingAverage: 0,
            reviewsCount: 0,
          }
        );
      } catch (error) {
        // console.log("Reviews API Error:", error);

        // ✅ NEVER THROW ERROR FOR EMPTY REVIEWS
        return {
          items: {
            data: [],
          },
          ratingAverage: 0,
          reviewsCount: 0,
        };
      }
    },

    retry: false,

    keepPreviousData: true,

    staleTime: 1000 * 60 * 2,
  });
};
