import { Router } from "express";

import authController from "../controllers/authController.js";
import userValidation from "../validators/userValidation.js";

const router = Router();

router.post(
  "/register",
  userValidation.registerSchema,
  authController.register
);
router.post("/login", userValidation.loginSchema, authController.login);
router.post(
  "/forgot-password",
  userValidation.emailSchema,
  authController.forgotPassword
);
router.post(
  "/reset-password/:token",
  userValidation.passwordSchema,
  authController.resetPassword
);
router.post("/refresh", authController.generateNewToken);
router.post(
  "/google",
  userValidation.googleSchema,
  authController.createGoogleUser
);
router.post("/logout", authController.logout);

router.get("/google", authController.getGoogleUser);

export default router;
