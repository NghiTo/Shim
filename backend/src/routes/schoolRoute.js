import { Router } from "express";
import { authenticate } from "../middlewares/authentication.js";
import schoolController from "../controllers/schoolController.js";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize(["teacher"]),
  schoolController.getSchools
);

export default router;
