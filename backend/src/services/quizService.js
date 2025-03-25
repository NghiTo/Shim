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

export default { createQuiz };
