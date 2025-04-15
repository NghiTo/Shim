import { Router } from "express";
import { authenticate } from "../middlewares/authentication.js";
import questionController from "../controllers/questionController.js";
import {
  createQuestionSchema,
  updateAllQuestionsSchema,
  updateQuestionSchema,
} from "../validators/quizValidation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  createQuestionSchema,
  questionController.createQuestion
);

router.put(
  "/:id",
  authenticate,
  updateQuestionSchema,
  questionController.updateQuestion
);
router.put(
  "/",
  authenticate,
  updateAllQuestionsSchema,
  questionController.updateAllQuestions
);

router.delete("/:id", authenticate, questionController.deleteQuestion);

export default router;
