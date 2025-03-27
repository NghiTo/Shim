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

export default { createQuestion };
