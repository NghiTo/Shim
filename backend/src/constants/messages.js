const MESSAGES = {
  USER: {
    FIND_SUCCESS: "User found successfully.",
    NOT_FOUND: "User not found",
    UPDATE_SUCCESS: "User updated successfully",
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
    LOGOUT_SUCCESS:"Log out successfully",
    PASSWORD_INCORRECT:"Password incorrect",
  },
  SCHOOL: {
    FIND_SUCCESS: "School found successfully.",
    NOT_FOUND: "School not found",
  },
};

export default MESSAGES;
