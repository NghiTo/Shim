import { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import session from "express-session";

import routes from "../routes/mainRoute.js";
import { AppError, globalErrorHandler } from "./errorHandler.js";
import ERROR_CODES from "../constants/errorCode.js";
import { googleOauth } from "../config/googleConfig.js";
import { generateAccessToken, generateRefreshToken } from "./generateTokens.js";

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
      if (!req.user.role) {
        res.redirect(
          `${process.env.FRONT_END_URL}/signup/occupation?token=${req.user.token}`
        );
      } else {
        const accessToken = generateAccessToken(req.user);
        const refreshToken = generateRefreshToken(req.user);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 6000 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.redirect(
          `${process.env.FRONT_END_URL}/login?id=${req.user.id}&role=${req.user.role}&avatarUrl=${req.user.avatarUrl}`
        );
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
