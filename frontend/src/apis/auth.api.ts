import { GoogleForm, LoginForm, RegisterForm } from "../types/user.type";
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

export const getNewAccessToken = async () => {
  const res = await axiosInstance.post("/auth/refresh");
  return res.data;
};

export const createGoogleUser = async (data: GoogleForm) => {
  const res = await axiosInstance.post("/auth/google", data);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getGoogleUser = async () => {
  const res = await axiosInstance.get("/auth/google");
  return res.data.data;
};

export const sendOtp = async () => {
  const res = await axiosInstance.post("/auth/send-otp");
  return res.data;
};

export const deleteUser = async (otp: string) => {
  const res = await axiosInstance.post("/auth/user", { otp });
  return res.data;
};
