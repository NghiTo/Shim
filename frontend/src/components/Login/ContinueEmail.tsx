import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa6";
import { GoLock } from "react-icons/go";
import { emailSchema, passwordSchema } from "../../schemas/userSchema";
import { LoginForm } from "../../types/user";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/auth.api";
import { useNavigate } from "react-router-dom";
import { onError } from "../../constants/onError";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userReducer";

interface LoginFormProps {
  setContinueEmail: (value: boolean) => void;
}

const ContinueEmail: React.FC<LoginFormProps> = ({ setContinueEmail }) => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValidForm, setIsValidForm] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      dispatch(setUser({ ...res.data, isAuthUser: true }));
      navigate(`/${res.data.role}`);
    },
    onError: onError,
  });

  return (
    <div className="w-3/5 max-md:w-full py-4 px-8 flex flex-col gap-4 min-h-full">
      <button
        onClick={() => setContinueEmail(false)}
        className="flex flex-row items-center gap-2 hover:text-[#fe5f5c] cursor-pointer py-2 w-1/5 max-md:w-1/4 rounded-md"
      >
        <FaArrowLeft />
        <p>Go back</p>
      </button>
      <h1 className="text-2xl font-medium">Continue with email</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={(data: LoginForm) => mutate(data)}
        className="flex flex-col pb-4"
        onValuesChange={(_, allValues) => {
          const { email, password } = allValues;
          if (email && password) {
            setIsValidForm(true);
          } else {
            setIsValidForm(false);
          }
        }}
      >
        <Form.Item<{ email: string }>
          label="Email"
          name={"email"}
          rules={emailSchema}
        >
          <Input
            prefix={<FaRegEnvelope />}
            className="w-full bg-gray-100 max-md:bg-white py-2"
            type="text"
            placeholder="name@example.com"
          />
        </Form.Item>
        <Form.Item<{ password: string }>
          label="Password"
          name={"password"}
          rules={passwordSchema}
        >
          <Input
            prefix={<GoLock />}
            className="w-full bg-gray-100 max-md:bg-white py-2"
            type="password"
            placeholder="Enter your password"
          />
        </Form.Item>
        <Button
          danger
          type="primary"
          disabled={!isValidForm}
          loading={isPending}
          htmlType="submit"
        >
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default ContinueEmail;
