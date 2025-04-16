import { StatusCodes } from "http-status-codes";
import MESSAGES from "../constants/messages.js";
import quizService from "../services/quizService.js";
import catchAsync from "../utils/catchAsync.js";

const createQuiz = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const quiz = await quizService.createQuiz(userId);
  res
    .status(StatusCodes.CREATED)
    .json({ message: MESSAGES.QUIZ.CREATE_SUCCESS, data: quiz });
});

const getQuizById = catchAsync(async (req, res) => {
  const quiz = await quizService.getQuizById(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.FIND_SUCCESS, data: quiz });
});

const getAllQuizzes = catchAsync(async (req, res) => {
  const quizzes = await quizService.getAllQuizzes(req.query);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.FIND_ALL_SUCCESS, data: quizzes });
});

const updateQuiz = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.coverImg = req.file;
  }
  const updatedQuiz = await quizService.updateQuiz(req.params.id, req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: updatedQuiz });
});

const deleteQuiz = catchAsync(async (req, res) => {
  const { quizIds } = req.body;
  await quizService.deleteQuiz(quizIds);
  res.status(StatusCodes.OK).json({ message: MESSAGES.QUIZ.DELETE_SUCCESS });
});

export default {
  createQuiz,
  getQuizById,
  updateQuiz,
  getAllQuizzes,
  deleteQuiz,
};
