import prisma from "../utils/PrismaClient.js";
import quizService from "./quizService.js";

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
          })),
        },
      },
      include: { answers: true },
    });

    return question;
  });

  return newQuestion;
};

export default { createQuestion };
