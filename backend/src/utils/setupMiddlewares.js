import { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import session from "express-session";

import routes from "../routes/mainRoute.js";
import { AppError } from "./AppError.js";
import ERROR_CODES from "../constants/errorCode.js";
import { googleOauth } from "../config/googleConfig.js";
import { globalErrorHandler } from "../middlewares/errorHandler.js";

export default function setupMiddlewares(app) {
  app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
  app.use(json({ limit: "600mb" }));
  app.use(urlencoded({ extended: true, limit: "600mb" }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production" },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(googleOauth);
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
      res.cookie("accessToken", req.user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      });
      if (!req.user.user.role) {
        res.redirect(`${process.env.FRONT_END_URL}/signup/occupation`);
      } else {
        res.redirect(`${process.env.FRONT_END_URL}/${req.user.user.role}`);
      }
    }
  );
  app.use("/api", routes);
  app.all("*", (req, res, next) => {
    next(
      new AppError({
        message: `Can't find ${req.originalUrl} on this server`,
        errorCode: ERROR_CODES.AUTH.URL_NOT_FOUND,
        statusCode: StatusCodes.NOT_FOUND,
      })
    );
  });
  app.use(globalErrorHandler);
}
