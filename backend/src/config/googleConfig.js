import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";

dotenv.config({ path: path.resolve("environments/.env") });

const prisma = new PrismaClient();

export const googleOauth = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await prisma.user.findUnique({
        where: { email: profile.emails[0].value },
      });
      if (!user) {
        user = {
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          avatarUrl: profile.photos[0].value,
        };
      }
      const token = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      return done(null, { user, token });
    } catch (error) {
      return done(error, null);
    }
  }
);
