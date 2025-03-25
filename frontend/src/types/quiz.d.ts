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