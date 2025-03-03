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

export default {
  emailSchema,
};
