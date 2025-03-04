import { Router } from "express";

import authController from "../controllers/authController.js";
import userValidation from "../validators/userValidation.js";

const router = Router();

router.post(
  "/register",
  userValidation.registerSchema,
  authController.register
);

export default router;
