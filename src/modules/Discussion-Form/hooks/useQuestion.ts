


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  castVote,
  createAnswer,
  createComment,
  createQuestion,
  deleteQuestion,
  getAnswers,
  getCommentsByAnswer,
  getQuestionById,
  getQuestions,
  getQuestionViews
} from "../services/question.service";

//  ALL QUESTIONS
export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });
};

//  SINGLE QUESTION
export const useQuestion = (id: number) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id),
    enabled: !!id,
  });
};

//  CREATE QUESTION
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

//  ANSWERS
export const useAnswers = (questionId: number) => {
  return useQuery({
    queryKey: ["answers", questionId],
    queryFn: () => getAnswers(questionId),
    enabled: !!questionId,
  });
};

//  CREATE ANSWER
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


// delete question


// export const useDeleteQuestion =
//   () => {
//     return useMutation({
//       mutationFn: (
//         id: number
//       ) =>
//         deleteQuestion(id),
//     });
//   };


export const useDeleteQuestion =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: (
        id: number
      ) =>
        deleteQuestion(id),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "questions",
            ],
          }
        );
      },
    });
  };


export const useComments = (answerId: number) => {
  return useQuery({
    queryKey: ["comments", answerId],
    queryFn: () => getCommentsByAnswer(answerId),
    enabled: !!answerId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
   
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.answerId],
      });
    },
  });
};


// votes


export const useVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: castVote,

    onSuccess: (_, variables) => {
    
      queryClient.invalidateQueries({ queryKey: ["answers"] });
      queryClient.invalidateQueries({ queryKey: ["question"] });

      
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};


// hooks/useQuestion.ts

export const useQuestionViews = (
  questionId: number,
  userId?: number
) => {
  return useQuery({
    queryKey: ["question-views", questionId],
    queryFn: () => getQuestionViews(questionId, userId),
    enabled: !!questionId,
  });
};




