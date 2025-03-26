import axiosInstance from "../utils/http";

export const createQuiz = async () => {
  const res = await axiosInstance.post("/quizzes");
  return res.data;
};

export const getQuizById = async (id: string) => {
  const res = await axiosInstance.get(`/quizzes/${id}`);
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
