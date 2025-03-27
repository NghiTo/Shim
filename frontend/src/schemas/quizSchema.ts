import { Rule } from "antd/es/form";

export const timeSchema: Rule[] = [
  { required: true, message: "Time is required" },
  {
    validator: (_, value) =>
      typeof value === "number" && value > 0
        ? Promise.resolve()
        : Promise.reject(new Error("Time must be a number greater than 0")),
  },
];

export const pointSchema: Rule[] = [
  { required: true, message: "Point is required" },
  {
    validator: (_, value) =>
      typeof value === "number" && value > 0
        ? Promise.resolve()
        : Promise.reject(new Error("Point must be a number greater than 0")),
  },
];
