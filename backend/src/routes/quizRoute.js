import { Router } from "express";
import { authenticate } from "../middlewares/authentication.js";
import quizController from "../controllers/quizController.js";

const router = Router();

router.post("/", authenticate, quizController.createQuiz);

export default router
