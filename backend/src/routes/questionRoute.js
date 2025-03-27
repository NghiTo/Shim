import { Router } from "express";
import { authenticate } from "../middlewares/authentication.js";
import questionController from "../controllers/questionController.js";
import { createQuestionSchema } from "../validators/quizValidation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  createQuestionSchema,
  questionController.createQuestion
);

export default router;
