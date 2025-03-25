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

export default { createQuiz };
