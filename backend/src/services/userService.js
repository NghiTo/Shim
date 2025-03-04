import omit from "lodash/omit.js";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/errorHandler.js";

const prisma = new PrismaClient();

const findUserByEmail = async ( email ) => {
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

export default {
  findUserByEmail,
};
