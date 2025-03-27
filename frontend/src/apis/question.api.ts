import { QuestionForm } from "@/types/quiz";
import axiosInstance from "../utils/http";

export const createQuestion = async (data: QuestionForm) => {
  const res = await axiosInstance.post("/questions", data);
  return res.data;
};
