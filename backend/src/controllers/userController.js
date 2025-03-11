import { StatusCodes } from "http-status-codes";

import userService from "../services/userService.js";
import MESSAGES from "../constants/messages.js";
import catchAsync from "../utils/catchAsync.js";

const findUserByEmail = catchAsync(async (req, res) => {
  await userService.findUserByEmail(req.body.email);
  res.status(StatusCodes.OK).json({ message: MESSAGES.USER.FIND_SUCCESS });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.USER.FIND_SUCCESS, data: user });
});

const updateUser = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.avatarUrl = req.file;
  }
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.USER.UPDATE_SUCCESS, data: updatedUser });
});

export default {
  findUserByEmail,
  updateUser,
  getUserById,
};
