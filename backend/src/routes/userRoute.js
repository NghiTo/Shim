import { Router } from "express";
import userController from "../controllers/userController.js";
import userValidation from "../validators/userValidation.js";
import { authenticate } from "../middlewares/authentication.js";
import { upload } from "../middlewares/imageHandler.js";

const router = Router();

router.post(
  "/email",
  userValidation.emailSchema,
  userController.findUserByEmail
);

router.get("/:id", authenticate, userController.getUserById);

router.put(
  "/:id",
  authenticate,
  upload.single("avatarUrl"),
  userController.updateUser
);

export default router;
