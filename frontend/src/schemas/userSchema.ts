import { Rule } from "antd/es/form";

export const emailSchema: Rule[] = [
  { required: true, message: "Email is required" },
  { type: "email", message: "Invalid email address" },
];
