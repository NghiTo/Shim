const MESSAGES = {
  USER: {
    FIND_SUCCESS: "User found successfully.",
    NOT_FOUND: "User not found",
    UPDATE_SUCCESS: "User updated successfully",
    DELETE_SUCCESS: "User deleted successfully",
    DUPLICATE_EMAIL: "Email already exists",
  },
  AUTH: {
    REGISTER_SUCCESS: "Register successfully.",
    LOGIN_FAILED: "Invalid email or password",
    LOGIN_SUCCESS: "Login successfully",
    EMAIL_SENT: "Email sent successfully",
    PASSWORD_RESET_SUCCESS: "Password reset successfully",
    TOKEN_EXPIRED: "Token expired",
    TOKEN_INVALID: "Token invalid",
    TOKEN_REFRESH: "New token generated successfully",
    FORBIDDEN: "You are not allowed to access this endpoint",
    UNAUTHORIZED: "Unauthorized",
    LOGOUT_SUCCESS: "Log out successfully",
    PASSWORD_INCORRECT: "Password incorrect",
    OTP_SENT: "OTP sent successfully",
    OTP_VALID: "OTP valid",
    OTP_INVALID: "OTP is invalid",
  },
  SCHOOL: {
    FIND_SUCCESS: "School found successfully.",
    NOT_FOUND: "School not found",
  },
  QUIZ: {
    CREATE_SUCCESS: "Quiz created successfully",
    NOT_FOUND: "Quiz not found",
    FIND_SUCCESS: "Quiz found successfully",
  },
};

export default MESSAGES;
