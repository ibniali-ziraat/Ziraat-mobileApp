


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  castVote,
  createAnswer,
  createComment,
  createQuestion,
  getAnswers,

  getCommentsByAnswer,
  getQuestionById,
  getQuestions
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


// comment




//  CREATE COMMENT
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,

    onSuccess: (_, variables) => {
      //  VERY IMPORTANT (fixes your issue)
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.answerId],
      });
    },
  });
};

//  GET COMMENTS
export const useComments = (answerId: number) => {
  return useQuery({
    queryKey: ["comments", answerId],
    queryFn: () => getCommentsByAnswer(answerId),
    enabled: !!answerId,
    staleTime: 0,
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