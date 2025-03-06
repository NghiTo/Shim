import { UpdateForm } from "../types/user.type";
import axiosInstance from "../utils/http";

export const findUserByEmail = async (email: string) => {
  const res = await axiosInstance.post("/users/email", { email });
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data.data;
};

export const updateUser = async (id: string, data: UpdateForm) => {
  const res = await axiosInstance.put(`/users/${id}`, data);
  return res.data;
};