import { StatusCodes } from "http-status-codes";

import authService from "../services/authService.js";
import catchAsync from "../utils/catchAsync.js";
import MESSAGES from "../constants/messages.js";

const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ message: MESSAGES.AUTH.REGISTER_SUCCESS, data: user });
});

const login = catchAsync(async (req, res) => {
  const user = await authService.login(req.body);
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

export default { register, login, forgotPassword, resetPassword };
