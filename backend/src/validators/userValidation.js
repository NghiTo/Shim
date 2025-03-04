import { celebrate, Joi, Segments } from "celebrate";

const emailField = Joi.string().email().required().messages({
  "string.base": "Email must be of type string",
  "string.email": "Invalid email",
  "string.empty": "Email is a required field",
  "any.required": "Email is a required field",
});

const passwordField = Joi.string().min(8).required().messages({
  "string.min": "Password must be at least 8 characters long",
  "any.required": "Password is a required field",
});

const nameField = Joi.string()
  .min(2)
  .max(50)
  .pattern(/^[A-Za-z]+$/)
  .required()
  .messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
    "string.pattern.base": "Name can only contain letters",
    "any.required": "Name is required",
  });

const roleField = Joi.string()
  .valid("student", "teacher", "admin")
  .required()
  .messages({
    "any.only": "Role must be one of: student, teacher, admin",
    "any.required": "Role is required",
  });

const commonFields = {
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
};

const emailSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: emailField,
  }),
});

const registerSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: emailField,
    password: passwordField,
    firstName: nameField,
    lastName: nameField,
    role: roleField,
    ...commonFields,
  }),
});

const loginSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: emailField,
    password: passwordField,
  }),
});

export default {
  emailSchema,
  registerSchema,
  loginSchema,
};
