import { Router } from "express";
import userController from "../controllers/userController.js";
import userValidation from "../validators/userValidation.js";

const router = Router();

router.post(
  "/email",
  userValidation.emailSchema,
  userController.findUserByEmail
);

export default router;
