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
  questions: QuestionResponse[];
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
  isCorrect: boolean;
};

export type QuestionForm = {
  time: number;
  point: number;
  title: string;
  answers: Answer[];
};
