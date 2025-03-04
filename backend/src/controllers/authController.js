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

export default { register, login };
