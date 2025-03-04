import { Button, Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useMutation } from "@tanstack/react-query";

import { confirmPasswordSchema, passwordSchema } from "../schemas/userSchema";
import { resetPassword } from "../apis/auth.api";
import { onError } from "../constants/onError";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const { token } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: (password: string) => resetPassword(token as string, password),
    onSuccess: () => {
      navigate("/login");
      message.success("Password reset successfully");
    },
    onError: onError,
  });

  return (
    <div className="min-h-screen flex relative">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt=""
        className="absolute w-1/12 top-4 left-4 max-md:w-1/5"
      />
      <Form
        form={form}
        onFinish={(data) => mutate(data.password)}
        layout="vertical"
        className="bg-gray-100 m-auto p-8 max-md:w-full w-2/5 rounded-lg flex flex-col shadow-lg"
      >
        <h1 className="font-semibold text-2xl">Create your password</h1>
        <div className="bg-[#ec0b431a] my-4 border border-[#ec0b4333] p-4 rounded-md text-gray-500 text-sm">
          Your password will be reset. Please enter a strong password and
          different from your current password.
        </div>
        <div>
          <Form.Item<{ password: string }>
            label="New password"
            name={"password"}
            rules={passwordSchema}
          >
            <Input.Password
              type="password"
              className="py-2"
              placeholder="Enter your new password"
            />
          </Form.Item>
          <Form.Item<{ confirmPassword: string }>
            label="Confirm password"
            name={"confirmPassword"}
            rules={confirmPasswordSchema(form)}
          >
            <Input.Password
              type="password"
              className="py-2"
              placeholder="Confirm your new password"
            />
          </Form.Item>
        </div>
        <div className="w-full flex flex-row gap-2">
          <Button
            type="default"
            onClick={() => navigate("/login")}
            className="w-1/2 px-auto text-center p-4"
          >
            Back
          </Button>
          <Button
            type="primary"
            loading={isPending}
            htmlType="submit"
            className={` w-1/2 px-auto text-center p-4`}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResetPassword;
