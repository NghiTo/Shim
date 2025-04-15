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

const quizIdField = Joi.string().uuid().required().messages({
  "string.base": "Quiz ID must be a string",
  "string.empty": "Quiz ID is required",
  "string.uuid": "Quiz ID must be a valid UUID",
  "any.required": "Quiz ID is required",
});

const timeField = Joi.number().integer().min(1).optional().messages({
  "number.base": "Time must be a number",
  "number.integer": "Time must be an integer",
  "number.min": "Time must be at least 1 second",
});

const pointField = Joi.number().integer().min(1).optional().messages({
  "number.base": "Point must be a number",
  "number.integer": "Point must be an integer",
  "number.min": "Point must be at least 1",
});

const typeField = Joi.string()
  .valid("multipleChoice", "trueFalse", "fillInTheBlank", "openEnded")
  .required()
  .messages({
    "string.base": "Type must be a string",
    "any.only":
      "Type must be one of: multipleChoice, trueFalse, fillInTheBlank, openEnded",
    "any.required": "Type is required",
  });

const answerField = Joi.object({
  content: Joi.string().min(1).required().messages({
    "string.base": "Answer content must be a string",
    "string.empty": "Answer content is required",
    "string.min": "Answer content must have at least 1 character",
    "any.required": "Answer content is required",
  }),
  isCorrect: Joi.boolean().optional().messages({
    "boolean.base": "isCorrect must be a boolean",
  }),
  position: Joi.number().optional().messages({
    "number.base": "Position must be a number",
    "number.integer": "Position must be an integer",
  }),
  imageUrl: Joi.string().uri().optional().messages({
    "string.uri": "imageUrl must be a valid URL",
  }),
});

const answersField = Joi.array().items(answerField).optional().messages({
  "array.base": "Answers must be an array",
});

export const createQuestionSchema = celebrate({
  [Segments.BODY]: Joi.object({
    title: titleField,
    quizId: quizIdField,
    time: timeField,
    point: pointField,
    type: typeField,
    answers: answersField,
  }),
});

export const updateQuestionSchema = celebrate({
  [Segments.BODY]: Joi.object({
    title: titleField,
    quizId: quizIdField,
    time: timeField,
    point: pointField,
    type: typeField,
    answers: answersField,
  }),
});

export const updateAllQuestionsSchema = celebrate({
  [Segments.BODY]: Joi.object({
    quizId: quizIdField,
    time: timeField,
    point: pointField,
  }),
});
