import { LoginForm, RegisterForm } from "../types/user.type";
import axiosInstance from "../utils/http";

export const register = async (data: RegisterForm) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginForm) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};
