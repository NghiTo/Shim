import omit from "lodash/omit.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/errorHandler.js";

const prisma = new PrismaClient();

const findUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  return omit(user, ["password"]);
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  return omit(user, ["password"]);
};

const updateUser = async (id, data) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
};

export default {
  findUserByEmail,
  getUserById,
  updateUser,
};
