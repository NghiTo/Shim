import { Router } from "express";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);

export default router;
