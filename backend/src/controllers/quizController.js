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

const updateQuiz = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.coverImg = req.file;
  }
  const updatedQuiz = await quizService.updateQuiz(req.params.id, req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUIZ.UPDATE_SUCCESS, data: updatedQuiz });
});

export default { createQuiz, getQuizById, updateQuiz };
