import axiosInstance from "@/src/api/client/axiosInstance";

// ----------------------------------------------------
// 📋 QUESTIONS
// ----------------------------------------------------
export type QuestionListParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  status?: string;
  tag?: string;
  userId?: number;
  isBounty?: boolean;
  q?: string;
};

export type QuestionListResult = {
  questions: any[];
  total: number;
  page: number;
  limit: number;
};

// The Swagger doc for GET /api/forum/questions doesn't specify a response
// schema, so this normalizes whatever shape comes back (a bare array, or a
// {data|items|questions, total|totalCount|count, page, limit} envelope)
// into one predictable contract for the rest of the app to depend on.
export const getQuestions = async (
  params: QuestionListParams = {},
): Promise<QuestionListResult> => {
  const res = await axiosInstance.get(`/api/forum/questions`, {
    params: {
      Page: params.page,
      Limit: params.limit,
      Sort: params.sort,
      Order: params.order,
      Status: params.status,
      Tag: params.tag,
      UserId: params.userId,
      IsBounty: params.isBounty,
      Q: params.q,
    },
  });
  const payload = res.data;
  const questions: any[] = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.items)
        ? payload.items
        : Array.isArray(payload?.questions)
          ? payload.questions
          : [];

  // Confirmed live shape: { data: [...], pagination: { page, limit, total,
  // totalPages, hasMore } } — still falling back to a flatter shape in case
  // that ever changes.
  const pagination = payload?.pagination ?? payload;

  return {
    questions,
    total:
      pagination?.total ?? pagination?.totalCount ?? pagination?.count ?? questions.length,
    page: pagination?.page ?? params.page ?? 1,
    limit: pagination?.limit ?? params.limit ?? questions.length,
  };
};

export const getQuestionById = async (id: number, userId?: number) => {
  const res = await axiosInstance.get(`/api/forum/questions/${id}`, {
    params: { userId },
  });
  return res.data.data ?? res.data;
};

export const createQuestion = async (payload: {
  title: string;
  body: string;
  userId: number;
  tags: string[];
  isBounty?: boolean;
  bountyAmount?: number;
}) => {
  const res = await axiosInstance.post(`/api/forum/questions`, payload);
  return res.data;
};

export const updateQuestion = async (
  id: number,
  payload: { title?: string; body?: string; status?: string },
) => {
  const res = await axiosInstance.put(`/api/forum/questions/${id}`, payload);
  return res.data;
};

export const deleteQuestion = async (id: number) => {
  const response = await axiosInstance.delete(`/api/forum/questions/${id}`);
  return response.status;
};

export const getQuestionViews = async (questionId: number, userId?: number) => {
  const { data } = await axiosInstance.get(
    `/api/forum/questions/${questionId}/views`,
    { params: { userId } },
  );
  return data?.data ?? data;
};

export const getQuestionViewers = async (questionId: number) => {
  const { data } = await axiosInstance.get(
    `/api/forum/questions/${questionId}/viewers`,
  );
  return data?.data ?? data;
};

// ----------------------------------------------------
// 💬 ANSWERS
// ----------------------------------------------------
export const getAnswers = async (
  questionId: number,
  sort: string = "votes",
  order: string = "DESC",
) => {
  const res = await axiosInstance.get(
    `/api/forum/questions/${questionId}/answers`,
    { params: { sort, order } },
  );
  return res.data.data ?? res.data;
};

export const createAnswer = async (
  questionId: number,
  payload: { userId: number; body: string },
) => {
  const res = await axiosInstance.post(
    `/api/forum/questions/${questionId}/answers`,
    payload,
  );
  return res.data;
};

export const acceptAnswer = async (questionId: number, answerId: number) => {
  const res = await axiosInstance.patch(
    `/api/forum/questions/${questionId}/answers/${answerId}/accept`,
  );
  return res.data;
};

// ----------------------------------------------------
// 🗨️ COMMENTS
// ----------------------------------------------------
export const getComment = async (id: number) => {
  const { data } = await axiosInstance.get(`/api/forum/comments/${id}`);
  return data?.data ?? data;
};

export const getCommentsByQuestion = async (questionId: number) => {
  const { data } = await axiosInstance.get(
    `/api/forum/questions/${questionId}/comments`,
  );
  return data?.data?.comments ?? data?.data ?? [];
};

export const createCommentOnQuestion = async (
  questionId: number,
  payload: { userId: number; body: string },
) => {
  const { data } = await axiosInstance.post(
    `/api/forum/questions/${questionId}/comments`,
    { ...payload, questionId },
  );
  return data;
};

export const getCommentsByAnswer = async (answerId: number) => {
  const { data } = await axiosInstance.get(
    `/api/forum/answers/${answerId}/comments`,
  );
  return data?.data?.comments ?? data?.data ?? [];
};

export const createCommentOnAnswer = async (
  answerId: number,
  payload: { userId: number; body: string; questionId?: number },
) => {
  const { data } = await axiosInstance.post(
    `/api/forum/answers/${answerId}/comments`,
    { ...payload, answerId },
  );
  return data;
};

// ----------------------------------------------------
// 👍 VOTES
// ----------------------------------------------------
export const castVote = async (payload: {
  userId: number;
  targetType: "question" | "answer";
  targetId: number;
  value: number;
}) => {
  const { data } = await axiosInstance.post("/api/forum/votes", payload);
  return data;
};

// ----------------------------------------------------
// 🔖 BOOKMARKS
// ----------------------------------------------------
export const getBookmarks = async (userId: number) => {
  const { data } = await axiosInstance.get(`/api/forum/bookmarks/${userId}`);
  return data?.data ?? data;
};

export const addBookmark = async (payload: {
  userId: number;
  questionId: number;
}) => {
  const { data } = await axiosInstance.post(`/api/forum/bookmarks`, payload);
  return data;
};

export const removeBookmark = async (userId: number, questionId: number) => {
  const { data } = await axiosInstance.delete(
    `/api/forum/bookmarks/${userId}/${questionId}`,
  );
  return data;
};

// ----------------------------------------------------
// 🖼️ MEDIA
// ----------------------------------------------------
export const uploadMedia = async (payload: {
  questionId?: number;
  answerId?: number;
  type: string;
  url: string;
  thumbnail?: string;
  altText?: string;
  width?: number;
  height?: number;
  duration?: string;
  platform?: string;
  fileSize?: number;
  mimeType?: string;
}) => {
  const { data } = await axiosInstance.post(`/api/forum/media`, payload);
  return data;
};

// ----------------------------------------------------
// 🔍 SEARCH
// ----------------------------------------------------
export const searchForum = async (q: string, page = 1, limit = 20) => {
  const { data } = await axiosInstance.get(`/api/forum/search`, {
    params: { Q: q, Page: page, Limit: limit },
  });
  return data?.data ?? data;
};

// ----------------------------------------------------
// 👤 FORUM USERS
// ----------------------------------------------------
export const getForumUsers = async (page = 1, limit = 20, sort?: string) => {
  const { data } = await axiosInstance.get(`/api/forum/users`, {
    params: { Page: page, Limit: limit, Sort: sort },
  });
  return data?.data ?? data;
};

export const getForumUserById = async (id: number) => {
  const { data } = await axiosInstance.get(`/api/forum/users/${id}`);
  return data?.data ?? data;
};

// ----------------------------------------------------
// 🏷️ TAGS
// ----------------------------------------------------
export const getTags = async (q?: string) => {
  const { data } = await axiosInstance.get(`/api/forum/tags`, {
    params: { q },
  });
  return data?.data ?? data;
};

// ----------------------------------------------------
// 🔔 NOTIFICATIONS
// ----------------------------------------------------
export const getForumNotifications = async (userId: number) => {
  const { data } = await axiosInstance.get(
    `/api/forum/notifications/${userId}`,
  );
  return data?.data ?? data;
};

export const markForumNotificationRead = async (id: number) => {
  const { data } = await axiosInstance.patch(
    `/api/forum/notifications/${id}/read`,
  );
  return data;
};

// ----------------------------------------------------
// 📊 STATS
// ----------------------------------------------------
export const getForumStats = async () => {
  const { data } = await axiosInstance.get(`/api/forum/stats`);
  return data?.data ?? data;
};
