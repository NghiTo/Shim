import { School } from "./school.type";

export type UserState = {
  id: string;
  schoolId: string;
  email: string;
  role: string;
  avatarUrl: string;
  isAuthUser: boolean;
  isGoogleAuth: boolean;
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

export type UpdateForm = {
  schoolId?: string;
  role?: string;
  password?: string;
};

export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarUrl: string;
  title: string;
  subject: string;
  grade: string;
  school: School;
};

export type GoogleForm = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  role: string;
}

export type PasswordForm = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}