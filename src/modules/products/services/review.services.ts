import axiosInstance from "@/src/api/client/axiosInstance";

const CORE = "/api"; // adjust if you already have CORE defined elsewhere

export const addReview = async (data: any) => {
  const { data: res } = await axiosInstance.post(
    `${CORE}/reviews/AddReview`,
    data,
  );
  return res;
};

export const listReviews = async ({
  entityId,
  entityTypeId,
  pageNumber,
  pageSize,
}: any) => {
  const { data: res } = await axiosInstance.get(`${CORE}/reviews/List`, {
    params: {
      entityId,
      entityTypeId,
      pageNumber,
      pageSize,
    },
  });

  return res;
};
