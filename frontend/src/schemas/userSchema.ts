import { FormInstance, Rule } from "antd/es/form";

export const emailSchema: Rule[] = [
  { required: true, message: "Email is required" },
  { type: "email", message: "Invalid email address" },
];

export const titleSchema: Rule[] = [
  { required: true, message: "Title is required" },
  { min: 2, message: "Title must be at least 2 characters" },
];

export const gradeSchema: Rule[] = [
  { required: true, message: "Grade is required" },
  { max: 5, message: "Invalid grade length" },
];

export const subjectSchema: Rule[] = [
  { required: true, message: "Subject is required" },
];

export const firstNameSchema: Rule[] = [
  { required: true, message: "First name is required" },
  { min: 2, max: 50, message: "Invalid first name length" },
];

export const lastNameSchema: Rule[] = [
  { required: true, message: "Last name is required" },
  { min: 2, max: 50, message: "Invalid last name length" },
];

export const passwordSchema: Rule[] = [
  { required: true, message: "Password is required" },
  { min: 8, message: "Password must be at least 8 characters long" },
];

export const confirmPasswordSchema = (form: FormInstance): Rule[] => [
  { required: true, message: "Confirm password is required" },
  {
    validator: (_, value) =>
      value && value === form.getFieldValue("password")
        ? Promise.resolve()
        : Promise.reject(new Error("Passwords do not match")),
  },
];

export const otpSchema = [{ required: true, message: "Otp is required" }];
