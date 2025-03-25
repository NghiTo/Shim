import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import pkg from "lodash";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

import { AppError } from "../utils/AppError.js";
import MESSAGES from "../constants/messages.js";
import ERROR_CODES from "../constants/errorCode.js";
import userService from "./userService.js";
import { generateAccessToken } from "../utils/generateTokens.js";
import prisma from "../utils/PrismaClient.js";

dotenv.config({ path: path.resolve("environments/.env") });

const SALT_ROUNDS = 10;
const { omit } = pkg;

const register = async (data) => {
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

const forgotPassword = async (email) => {
  const user = await userService.findUserByEmail(email);
  const accessToken = generateAccessToken(user);
  const resetLink = `${process.env.FRONT_END_URL}/reset-password/${accessToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #fe5f5c; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Reset Your Shim Account Password</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <p>Dear <strong>User</strong>,</p>
        <p>We received a request to reset your password for your Shim account associated with this email address. To reset your password, please click on the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" 
            style="background-color: #fe5f5c; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p>If you did not request this password reset, please ignore this email or contact our support team if you have concerns.</p>
        <p>This link will expire in <strong>15 minutes</strong>.</p>
        <p>Thank you,</p>
        <p>The Shim Team</p>
      </div>
      <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">If you have any questions, feel free to contact us at <a href="mailto:support@shim.com" style="color: #fe5f5c;">support@shim.com</a>.</p>
        <p style="margin: 0;">&copy; 2024 Shim. All rights reserved.</p>
      </div>
    </div>
  </div>
`;

  transporter.sendMail({
    from: {
      name: "Shim",
      address: process.env.MAIL_USERNAME,
    },
    to: email,
    subject: "Reset Shim account password(no reply)",
    html: htmlContent,
  });
  return;
};

const resetPassword = async (token, password) => {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userService.updateUser(decoded.id, {
    password: hashedPassword,
  });
  return omit(user, ["password"]);
};

const getGoogleUser = async (token) => {
  const res = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return reject(
          new AppError({
            message: MESSAGES.AUTH.TOKEN_INVALID,
            errorCode: ERROR_CODES.AUTH.TOKEN_INVALID,
            statusCode: StatusCodes.UNAUTHORIZED,
          })
        );
      }
      resolve(decoded);
    });
  });
  return res;
};

const generateNewToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError({
      message: MESSAGES.AUTH.TOKEN_INVALID,
      errorCode: ERROR_CODES.AUTH.TOKEN_INVALID,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
  const res = await new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return reject(
            new AppError({
              message: MESSAGES.AUTH.TOKEN_INVALID,
              errorCode: ERROR_CODES.AUTH.TOKEN_INVALID,
              statusCode: StatusCodes.UNAUTHORIZED,
            })
          );
        }
        resolve(decoded);
      }
    );
  });
  const newAccessToken = jwt.sign(
    { id: res.id, role: res.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  return newAccessToken;
};

const createGoogleUser = async (data) => {
  const user = await prisma.user.create({ data });
  return omit(user, ["password"]);
};

const otpStore = new Map();

const sendOtp = async (userId) => {
  const { email } = await userService.getUserById(userId);
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore.set(email, otp);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Verify Your Account</h2>
      <p style="font-size: 16px; color: #555;">
        Hello, 
      </p>
      <p style="font-size: 16px; color: #555;">
        You requested to delete your Shim account. Please use the following OTP to verify your identity:
      </p>
      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #4caf50;">
        ${otp}
      </p>
      <p style="font-size: 16px; color: #555;">
        If you did not request this action, please ignore this email or contact our support team.
      </p>
      <p style="font-size: 14px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Shim Inc. All rights reserved.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: {
      name: "Shim",
      address: process.env.MAIL_USERNAME,
    },
    to: email,
    subject: "OTP for deleting Shim account (no reply)",
    html: htmlContent,
  });

  return;
};

const verifyOtp = async (userId, otp) => {
  const { email, id } = await userService.getUserById(userId);
  if (otpStore.get(email) == otp) {
    otpStore.delete(email);
    return id;
  } else {
    throw new AppError({
      message: MESSAGES.AUTH.OTP_INVALID,
      errorCode: ERROR_CODES.AUTH.OTP_INVALID,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  getGoogleUser,
  generateNewToken,
  createGoogleUser,
  sendOtp,
  verifyOtp,
};
