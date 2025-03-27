import { Router } from "express";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import schoolRoute from "./schoolRoute.js";
import quizRoute from "./quizRoute.js";
import questionRoute from "./questionRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/schools", schoolRoute);
router.use("/quizzes", quizRoute);
router.use("/questions", questionRoute);

export default router;
