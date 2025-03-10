import axiosInstance from "../utils/http";

export const findUserByEmail = async (email: string) => {
  const res = await axiosInstance.post("/users/email", { email });
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data.data;
};

export const updateUser = async (id: string, data: FormData) => {
  const res = await axiosInstance.put(`/users/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
