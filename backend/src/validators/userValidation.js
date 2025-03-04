import { celebrate, Joi, Segments } from "celebrate";

const emailSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be of type string",
      "string.email": "Invalid email",
      "string.empty": "Email is a required field",
      "any.required": "Email is a required field",
    }),
  }),
});

const registerSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be of type string",
      "string.email": "Invalid email",
      "string.empty": "Email is a required field",
      "any.required": "Email is a required field",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is a required field",
    }),
    title: Joi.string().required().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    grade: Joi.string().required().messages({
      "string.base": "Grade must be a string",
      "string.empty": "Grade is required",
      "any.required": "Grade is required",
    }),
    subject: Joi.string().required().messages({
      "string.base": "Subject must be a string",
      "string.empty": "Subject is required",
      "any.required": "Subject is required",
    }),
    firstName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.base": "First name must be a string",
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name cannot exceed 50 characters",
        "string.pattern.base": "First name can only contain letters",
        "any.required": "First name is required",
      }),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters",
        "string.max": "Last name cannot exceed 50 characters",
        "string.pattern.base": "Last name can only contain letters",
        "any.required": "Last name is required",
      }),
  }),
});

export default {
  emailSchema,
  registerSchema,
};
