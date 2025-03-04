import { message } from "antd";
import { AxiosError } from "axios";

export const onError = (err: AxiosError) => {
  const errorMessage = (err.response?.data as { message: string })?.message;
  message.error(errorMessage || "Something went wrong");
};
