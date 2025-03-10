import { StatusCodes } from "http-status-codes";

import authService from "../services/authService.js";
import catchAsync from "../utils/catchAsync.js";
import MESSAGES from "../constants/messages.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res
    .status(StatusCodes.CREATED)
    .json({ message: MESSAGES.AUTH.REGISTER_SUCCESS, data: user });
});

const login = catchAsync(async (req, res) => {
  const user = await authService.login(req.body);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res
    .status(StatusCodes.ACCEPTED)
    .json({ message: MESSAGES.AUTH.LOGIN_SUCCESS, data: user });
});

const forgotPassword = catchAsync(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  return res.status(StatusCodes.OK).json({ message: MESSAGES.AUTH.EMAIL_SENT });
});

const resetPassword = catchAsync(async (req, res) => {
  const user = await authService.resetPassword(
    req.params.token,
    req.body.password
  );
  return res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.AUTH.PASSWORD_RESET_SUCCESS, data: user });
});

const getGoogleUser = catchAsync(async (req, res) => {
  const user = await authService.getGoogleUser(req.cookies.accessToken);
  const refreshToken = generateRefreshToken(user);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.USER.FIND_SUCCESS, data: user });
});

const generateNewToken = catchAsync(async (req, res) => {
  const accessToken = await authService.generateNewToken(
    req.cookies.refreshToken
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    message: MESSAGES.AUTH.TOKEN_REFRESH,
    accessToken,
  });
});

const createGoogleUser = catchAsync(async (req, res) => {
  const user = await authService.createGoogleUser(req.body);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.AUTH.REGISTER_SUCCESS, data: user });
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.AUTH.LOGOUT_SUCCESS });
});

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  getGoogleUser,
  generateNewToken,
  createGoogleUser,
  logout
};
