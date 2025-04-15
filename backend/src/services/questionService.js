import { StatusCodes } from "http-status-codes";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/AppError.js";
import prisma from "../utils/PrismaClient.js";
import quizService from "./quizService.js";
import ERROR_CODES from "../constants/errorCode.js";

const createQuestion = async (data) => {
  await quizService.getQuizById(data.quizId);
  const newQuestion = await prisma.$transaction(async (prisma) => {
    const question = await prisma.question.create({
      data: {
        ...data,
        answers: {
          create: data.answers.map((answer) => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
            position:
              data.type === "fillInTheBlank" ? Number(data.position) : null,
          })),
        },
      },
      include: { answers: true },
    });

    return question;
  });

  return newQuestion;
};

const getQuestionById = async (questionId) => {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    throw new AppError({
      message: MESSAGES.QUESTION.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: ERROR_CODES.QUESTION.NOT_FOUND,
    });
  }
  return question;
};

const updateQuestion = async (questionId, data) => {
  await getQuestionById(questionId);
  const existingAnswers = await prisma.answer.findMany({
    where: { questionId },
  });
  const { answers, ...questionData } = data;

  const updatedQuestion = await prisma.question.update({
    where: { id: questionId },
    data: questionData,
    include: { answers: true },
  });
  const incomingAnswers = data.answers;
  const incomingIds = incomingAnswers.map((a) => a.id).filter(Boolean);
  const toDelete = existingAnswers.filter((a) => !incomingIds.includes(a.id));
  await prisma.answer.deleteMany({
    where: {
      id: {
        in: toDelete.map((a) => a.id),
      },
    },
  });
  await Promise.all(
    incomingAnswers
      .filter((a) => a.id)
      .map((a) =>
        prisma.answer.update({
          where: { id: a.id },
          data: {
            content: a.content,
            isCorrect: !!a.isCorrect,
            imageUrl: a.imageUrl || null,
          },
        })
      )
  );
  await Promise.all(
    incomingAnswers
      .filter((a) => !a.id)
      .map((a) =>
        prisma.answer.create({
          data: {
            questionId,
            content: a.content,
            isCorrect: !!a.isCorrect,
            imageUrl: a.imageUrl || null,
          },
        })
      )
  );
  return updatedQuestion;
};

const updateAllQuestions = async (quizId, data) => {
  await quizService.getQuizById(quizId)
  const updatedQuestions = await prisma.question.updateMany({
    where: { quizId },
    data,
  });
  return updatedQuestions;
};

const deleteQuestion = async (questionId) => {
  await getQuestionById(questionId);
  await prisma.question.delete({ where: { id: questionId } });
  return;
};

export default {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  updateAllQuestions,
};
