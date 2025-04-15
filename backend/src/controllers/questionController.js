import catchAsync from "../utils/catchAsync.js";
import { StatusCodes } from "http-status-codes";
import MESSAGES from "../constants/messages.js";
import questionService from "../services/questionService.js";

const createQuestion = catchAsync(async (req, res) => {
  const question = await questionService.createQuestion(req.body);
  return res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUESTION.CREATE_SUCCESS, data: question });
});

const updateQuestion = catchAsync(async (req, res) => {
  const question = await questionService.updateQuestion(
    req.params.id,
    req.body
  );
  return res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUESTION.UPDATE_SUCCESS, data: question });
});

const deleteQuestion = catchAsync(async (req, res) => {
  await questionService.deleteQuestion(req.params.id);
  return res
    .status(StatusCodes.OK)
    .json({ message: MESSAGES.QUESTION.DELETE_SUCCESS });
});

export default { createQuestion, deleteQuestion, updateQuestion };
