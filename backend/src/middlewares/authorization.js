import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import MESSAGES from "../constants/messages.js";
import ERROR_CODES from "../constants/errorCode.js";
/**
 *
 * @param {Array<"student", "teacher">} listRoles
 */
export const authorize = (listRoles) => {
  return catchAsync(async (req, res, next) => {
    const role = req.user.role;
    if (!listRoles.includes(role)) {
      throw new AppError({
        message: MESSAGES.AUTH.FORBIDDEN,
        errorCode: ERROR_CODES.AUTH.FORBIDDEN,
        statusCode: StatusCodes.FORBIDDEN,
      });
    }
    next();
  });
};
