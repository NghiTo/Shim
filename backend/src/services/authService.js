import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import pkg from "lodash";

import { AppError } from "../utils/errorHandler.js";
import MESSAGES from "../constants/messages.js";
import ERROR_CODES from "../constants/errorCode.js";

const { omit } = pkg;
const prisma = new PrismaClient();

const register = async (data) => {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  const newData = { ...data, password: hashedPassword };
  const user = await prisma.user.create({ data: newData });
  return omit(user, ["password"]);
};

const login = async (data) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw new AppError({
      message: MESSAGES.USER.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: ERROR_CODES.USER.NOT_FOUND,
    });
  }
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new AppError({
      message: MESSAGES.AUTH.LOGIN_FAILED,
      errorCode: ERROR_CODES.AUTH.LOGIN_FAILED,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
  return omit(user, ["password"]);
};

export default { register, login };
