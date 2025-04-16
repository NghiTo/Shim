import { QuizFilter } from "@/types/quiz";
import axiosInstance from "../utils/http";

export const createQuiz = async () => {
  const res = await axiosInstance.post("/quizzes");
  return res.data;
};

export const getQuizById = async (id: string) => {
  const res = await axiosInstance.get(`/quizzes/${id}`);
  return res.data.data;
};

export const getAllQuizzes = async (queries: QuizFilter) => {
  const res = await axiosInstance.get("/quizzes", { params: queries });
  return res.data.data;
};

export const updateQuiz = async (id: string, data: FormData) => {
  const res = await axiosInstance.put(`/quizzes/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteQuiz = async (quizIds: string[]) => {
  const res = await axiosInstance.delete(`/quizzes`, { data: { quizIds } });
  return res.data;
};
