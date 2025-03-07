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

export const forgotPassword = async (email: string) => {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
    password,
  });
  return res.data;
};

export const createGoogleUser = async (token: string, role: string) => {
  const res = await axiosInstance.post("/auth/google", { token, role });
  return res.data;
};

export const getNewAccessToken = async () => {
  const res = await axiosInstance.post("/auth/refresh");
  return res.data;
};
