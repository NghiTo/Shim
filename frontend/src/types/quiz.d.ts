export type Quiz = {
  id: string;
  quizCode: number;
  coverImg: string | null;
  grade: string;
  isPublic: boolean;
  status: string;
  subject: string;
  title: string;
  user?: UserResponse;
  questions: Question[];
  updatedAt?: string;
};

export type Setting = {
  grade: string;
  title: string;
  subject: string;
  isPublic: string;
};

export type QuestionType =
  | "multipleChoice"
  | "fillInTheBlank"
  | "openEnded"
  | "poll"
  | "match"
  | "dragAndDrop"
  | "dropDown"
  | "categorize"
  | "labeling"
  | "mathResponse";

export type Answer = {
  content: string;
  isCorrect: boolean | null;
  position?: number;
};

export type QuestionForm = {
  time?: number;
  point?: number;
  title?: string;
  answers?: Answer[];
};

type Answer = {
  id: string;
  content: string;
  imageUrl: string | null;
  position: number | null;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
  questionId: string;
};

type Question = {
  id: string;
  title: string;
  quizId: string;
  time: number;
  point: number;
  type: QuestionType;
  createdAt: string;
  answers: Answer[];
};
