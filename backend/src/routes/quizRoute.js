import { Router } from "express";
import { authenticate } from "../middlewares/authentication.js";
import quizController from "../controllers/quizController.js";
import { updateQuizSchema } from "../validators/quizValidation.js";
import { upload } from "../middlewares/imageHandler.js";

const router = Router();

router.post("/", authenticate, quizController.createQuiz);

router.get("/:id", authenticate, quizController.getQuizById);
router.get("/", authenticate, quizController.getAllQuizzes);

router.put(
  "/:id",
  authenticate,
  updateQuizSchema,
  upload.single("coverImg"),
  quizController.updateQuiz
);

export default router;
