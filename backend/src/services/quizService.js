import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/AppError.js";
import prisma from "../utils/PrismaClient.js";

const createQuiz = async (userId) => {
  let quizCode;
  let isUnique = false;

  while (!isUnique) {
    quizCode = Math.floor(10000000 + Math.random() * 90000000);
    const existingQuiz = await prisma.quiz.findUnique({ where: { quizCode } });
    if (!existingQuiz) {
      isUnique = true;
    }
  }
  const quiz = await prisma.quiz.create({
    data: {
      userId,
      quizCode,
      title: "Untitled quiz",
      subject: "",
      status: "unFinished",
      grade: "",
      isPublic: true,
    },
  });
  return quiz;
};

const getQuizById = async (quizId) => {
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
  if (!quiz) {
    throw new AppError({
      message: MESSAGES.QUIZ.NOT_FOUND,
      errorCode: ERROR_CODES.QUIZ.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
    });
  }
  return quiz;
};

export default { createQuiz, getQuizById };
