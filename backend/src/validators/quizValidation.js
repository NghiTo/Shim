import { celebrate, Joi, Segments } from "celebrate";

const titleField = Joi.string().min(2).max(100).optional().messages({
  "string.base": "Title must be a string",
  "string.min": "Title must be at least 5 characters",
  "string.max": "Title cannot exceed 100 characters",
});

const isPublicField = Joi.string().optional().messages({
  "boolean.base": "isPublic must be a string",
});

const subjectField = Joi.string().optional().messages({
  "string.base": "Subject must be a string",
});

const gradeField = Joi.string().optional().messages({
  "string.base": "Grade must be a string",
});

const coverImgField = Joi.optional();

export const updateQuizSchema = celebrate({
  [Segments.BODY]: Joi.object({
    grade: gradeField,
    subject: subjectField,
    isPublic: isPublicField,
    title: titleField,
    coverImg: coverImgField,
  }),
});
