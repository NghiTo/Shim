import { StatusCodes } from "http-status-codes";
import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/AppError.js";
import prisma from "../utils/PrismaClient.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/awsConfig.js";

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

const updateQuiz = async (quizId, data) => {
  await getQuizById(quizId);
  
  if (data.coverImg) {
      const fileKey = `quizzes/${quizId}-${data.coverImg.originalname}`;
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: data.coverImg.buffer,
        ContentType: data.coverImg.mimetype,
      };
      await s3.send(new PutObjectCommand(uploadParams));
      data = {
        ...data,
        coverImg: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
      };
    }
  const quiz = await prisma.quiz.update({
    where: { id: quizId },
    data: { ...data, isPublic: Boolean(data.isPublic) },
  });
  return quiz;
};

export default { createQuiz, getQuizById, updateQuiz };
