import { QuestionForm } from "@/types/quiz";
import axiosInstance from "../utils/http";

export const createQuestion = async (data: QuestionForm) => {
  const res = await axiosInstance.post("/questions", data);
  return res.data;
};

export const updateQuestion = async (
  questionId: string,
  data: QuestionForm
) => {
  const res = await axiosInstance.put(`/questions/${questionId}`, data);
  return res.data;
};

export const updateAllQuestions = async (
  quizId: string,
  data: QuestionForm
) => {
  const res = await axiosInstance.put("/questions", { quizId, ...data });
  return res.data;
};

export const deleteQuestion = async (questionId: string) => {
  const res = await axiosInstance.delete(`/questions/${questionId}`);
  return res.data;
};
