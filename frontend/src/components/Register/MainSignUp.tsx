import { Link, useNavigate } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa6";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";

import { findUserByEmail } from "../../apis/user.api";
import { emailSchema } from "../../schemas/userSchema";
import backgroundImg from "/src/assets/header_96c74815-3497-4ccf-bf3c-3dfdfa17e313.webp";
import { setUser } from "../../store/userReducer";
import { RootState } from "../../store/store";

const MainSignUp = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: findUserByEmail,
    onSuccess: () =>
      message.error("An account has already been associated with this email"),
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 404) {
        dispatch(setUser({ ...user, email: form.getFieldValue("email") }));
        navigate("/signup/occupation");
      } else {
        message.error("Failed to register");
      }
    },
  });

  return (
    <div className="bg-gray-100 max-md:bg-white w-3/5 min-h-full shadow-lg mx-auto rounded-lg flex flex-row gap-4 max-md:w-full">
      <div className="w-3/5 max-md:w-full py-4 px-8 flex flex-col gap-4">
        <h1 className="font-medium text-2xl">Welcome to Shim</h1>
        <h1 className="text-gray-600 text-xl">
          Create a free account in 2 steps
        </h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={(data) => mutate(data.email)}
          onValuesChange={(_, allValues) => {
            const { email } = allValues;
            if (email) {
              setIsEmailValid(true);
            } else {
              setIsEmailValid(false);
            }
          }}
        >
          <Form.Item<{ email: string }>
            label="Email"
            name={"email"}
            className=""
            rules={emailSchema}
          >
            <Input
              prefix={<FaRegEnvelope />}
              className="w-full bg-gray-100 max-md:bg-white py-2"
              type="text"
              name="email"
              id="email"
              placeholder="name@example.com"
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={isPending}
            disabled={!isEmailValid}
            className={`w-full py-4 rounded-md`}
          >
            Continue
          </Button>
        </Form>
        <div className="text-gray-400 mt-2 max-md:hidden text-center">
          By signing up, you agree to our{" "}
          <Link to={""} className="underline">
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link to={""} className="underline">
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-row mt-2 justify-center gap-2 max-md:hidden">
          <p className="py-1">Already have an account?</p>
          <Link
            to={"/login"}
            className="py-1 px-4 rounded-md bg-gray-200 text-[#fe5f5c]"
          >
            Login
          </Link>
        </div>
      </div>
      <div
        className="w-2/5 h-auto rounded-r-lg bg-cover bg-center max-md:hidden"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>
    </div>
  );
};

export default MainSignUp;
