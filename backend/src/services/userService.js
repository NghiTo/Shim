import omit from "lodash/omit.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import ERROR_CODES from "../constants/errorCode.js";
import MESSAGES from "../constants/messages.js";
import { AppError } from "../utils/errorHandler.js";
import s3 from "../config/awsConfig.js";
import prisma from "../utils/PrismaClient.js";

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
  const user = await prisma.user.findUnique({
    where: { id },
    include: { school: true },
  });
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
  if (data.currentPassword) {
    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch) {
      throw new AppError({
        message: MESSAGES.AUTH.PASSWORD_INCORRECT,
        errorCode: ERROR_CODES.AUTH.PASSWORD_INCORRECT,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    data = omit(data, ["currentPassword"]);
  }
  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data = { ...data, password: hashedPassword };
  }
  if (data.avatarUrl && data.avatarUrl.buffer) {
    const fileKey = `users/${id}-${data.avatarUrl.originalname}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: data.avatarUrl.buffer,
      ContentType: data.avatarUrl.mimetype,
    };
    await s3.send(new PutObjectCommand(uploadParams));
    data = {
      ...data,
      avatarUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
    };
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (user.avatarUrl) {
    const s3Url = new URL(user.avatarUrl);
    const key = decodeURIComponent(s3Url.pathname).substring(1);

    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));
  }
  await prisma.user.delete({ where: { id } });
  return;
};

export default {
  findUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
};
