import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import MESSAGES from "../constants/messages.js";
import ERROR_CODES from "../constants/errorCode.js";
import { AppError } from "../utils/errorHandler.js";

const prisma = new PrismaClient();

const getSchools = async (page = 1, pageSize = 6) => {
  const schools = await prisma.school.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      id: "asc",
    },
  });

  if (!schools || schools.length === 0) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      message: MESSAGES.SCHOOL.NOT_FOUND,
      errorCode: ERROR_CODES.SCHOOL.NOT_FOUND,
    });
  }

  const totalSchools = await prisma.school.count();
  return { schools, totalSchools };
};

export default { getSchools };
