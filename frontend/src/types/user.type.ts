export type UserState = {
  id: string;
  email: string;
  role: string;
  isAuthUser: boolean;
};

export type RegisterForm = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  title: string;
  subject: string;
  grade: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
