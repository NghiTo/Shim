import axiosInstance from "../utils/http";

export const createQuiz = async () => {
  const res = await axiosInstance.post("/quizzes");
  return res.data;
};

export const getQuizById = async (id: string) => {
  const res = await axiosInstance.get(`/quizzes/${id}`);
  return res.data.data;
};
