

import axiosInstance from "@/src/api/client/discussionaxiosInstance";

//  GET ALL QUESTIONS
export const getQuestions = async () => {
  const res = await axiosInstance.get(`/api/v1/questions`);
  return res.data.data;
};

//  GET SINGLE QUESTION
export const getQuestionById = async (id: number) => {
  const res = await axiosInstance.get(`/api/v1/questions/${id}`);
  return res.data.data;
};

// CREATE QUESTION
export const createQuestion = async (payload: any) => {
  const res = await axiosInstance.post(`/api/v1/questions`, payload);
  return res.data;
};

//  GET ANSWERS
export const getAnswers = async (questionId: number) => {
  const res = await axiosInstance.get(
    `/api/v1/questions/${questionId}/answers`
  );
  return res.data.data;
};

//  CREATE ANSWER
export const createAnswer = async (questionId: number, payload: any) => {
  const res = await axiosInstance.post(
    `/api/v1/questions/${questionId}/answers`,
    payload
  );
  return res.data;
};





export const createComment = async (payload: {
  userId: number;
  answerId: number;
  body: string;
}) => {
  const { data } = await axiosInstance.post("/api/v1/comments", payload);
  return data;
};

export const getCommentsByAnswer = async (answerId: number) => {
  const { data } = await axiosInstance.get(
    `/api/v1/comments?answerId=${answerId}`
  );
  return data;
};



// votes


export const castVote = async (payload: {
  userId: number;
  targetType: "question" | "answer";
  targetId: number;
  value: number; 
}) => {
  const { data } = await axiosInstance.post("/api/v1/votes", payload);
  return data;
};