import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptAnswer,
  addBookmark,
  castVote,
  createAnswer,
  createCommentOnAnswer,
  createCommentOnQuestion,
  createQuestion,
  deleteQuestion,
  getAnswers,
  getBookmarks,
  getCommentsByAnswer,
  getCommentsByQuestion,
  getForumNotifications,
  getForumStats,
  getForumUserById,
  getForumUsers,
  getQuestionById,
  getQuestions,
  getQuestionViewers,
  getQuestionViews,
  getTags,
  markForumNotificationRead,
  QuestionListParams,
  removeBookmark,
  searchForum,
  updateQuestion,
} from "../services/question.service";

// ----------------------------------------------------
// 📋 QUESTIONS
// ----------------------------------------------------
export const useQuestions = (params: QuestionListParams = {}) => {
  return useQuery({
    queryKey: ["questions", params],
    queryFn: () => getQuestions(params),
  });
};

export const useQuestion = (id: number, userId?: number) => {
  return useQuery({
    queryKey: ["question", id, userId],
    queryFn: () => getQuestionById(id, userId),
    enabled: !!id,
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateQuestion(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["question", variables.id] });
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useQuestionViews = (questionId: number, userId?: number) => {
  return useQuery({
    queryKey: ["question-views", questionId],
    queryFn: () => getQuestionViews(questionId, userId),
    enabled: !!questionId,
  });
};

export const useQuestionViewers = (questionId: number) => {
  return useQuery({
    queryKey: ["question-viewers", questionId],
    queryFn: () => getQuestionViewers(questionId),
    enabled: !!questionId,
  });
};

// ----------------------------------------------------
// 💬 ANSWERS
// ----------------------------------------------------
export const useAnswers = (
  questionId: number,
  sort?: string,
  order?: string,
) => {
  return useQuery({
    queryKey: ["answers", questionId, sort, order],
    queryFn: () => getAnswers(questionId, sort, order),
    enabled: !!questionId,
  });
};

export const useCreateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionId,
      payload,
    }: {
      questionId: number;
      payload: any;
    }) => createAnswer(questionId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["answers", variables.questionId],
      });
    },
  });
};

export const useAcceptAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionId,
      answerId,
    }: {
      questionId: number;
      answerId: number;
    }) => acceptAnswer(questionId, answerId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["answers", variables.questionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["question", variables.questionId],
      });
    },
  });
};

// ----------------------------------------------------
// 🗨️ COMMENTS
// ----------------------------------------------------
export const useCommentsByQuestion = (questionId: number) => {
  return useQuery({
    queryKey: ["comments", "question", questionId],
    queryFn: () => getCommentsByQuestion(questionId),
    enabled: !!questionId,
  });
};

export const useCreateCommentOnQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionId,
      payload,
    }: {
      questionId: number;
      payload: { userId: number; body: string };
    }) => createCommentOnQuestion(questionId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "question", variables.questionId],
      });
    },
  });
};

export const useComments = (answerId: number) => {
  return useQuery({
    queryKey: ["comments", "answer", answerId],
    queryFn: () => getCommentsByAnswer(answerId),
    enabled: !!answerId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      answerId,
      payload,
    }: {
      answerId: number;
      payload: { userId: number; body: string; questionId?: number };
    }) => createCommentOnAnswer(answerId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "answer", variables.answerId],
      });
    },
  });
};

// ----------------------------------------------------
// 👍 VOTES
// ----------------------------------------------------
export const useVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: castVote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers"] });
      queryClient.invalidateQueries({ queryKey: ["question"] });
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

// ----------------------------------------------------
// 🔖 BOOKMARKS
// ----------------------------------------------------
export const useBookmarks = (userId: number) => {
  return useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => getBookmarks(userId),
    enabled: !!userId,
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookmark,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", variables.userId],
      });
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, questionId }: { userId: number; questionId: number }) =>
      removeBookmark(userId, questionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", variables.userId],
      });
    },
  });
};

// ----------------------------------------------------
// 🔍 SEARCH
// ----------------------------------------------------
export const useForumSearch = (q: string, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["forum-search", q, page, limit],
    queryFn: () => searchForum(q, page, limit),
    enabled: q.trim().length >= 2,
  });
};

// ----------------------------------------------------
// 👤 FORUM USERS
// ----------------------------------------------------
export const useForumUsers = (page = 1, limit = 20, sort?: string) => {
  return useQuery({
    queryKey: ["forum-users", page, limit, sort],
    queryFn: () => getForumUsers(page, limit, sort),
  });
};

export const useForumUser = (id: number) => {
  return useQuery({
    queryKey: ["forum-user", id],
    queryFn: () => getForumUserById(id),
    enabled: !!id,
  });
};

// ----------------------------------------------------
// 🏷️ TAGS
// ----------------------------------------------------
export const useForumTags = (q?: string) => {
  return useQuery({
    queryKey: ["forum-tags", q],
    queryFn: () => getTags(q),
  });
};

// ----------------------------------------------------
// 🔔 NOTIFICATIONS
// ----------------------------------------------------
export const useForumNotifications = (userId: number) => {
  return useQuery({
    queryKey: ["forum-notifications", userId],
    queryFn: () => getForumNotifications(userId),
    enabled: !!userId,
  });
};

export const useMarkForumNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markForumNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-notifications"] });
    },
  });
};

// ----------------------------------------------------
// 📊 STATS
// ----------------------------------------------------
export const useForumStats = () => {
  return useQuery({
    queryKey: ["forum-stats"],
    queryFn: getForumStats,
  });
};
