import { Link } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa6";
import { Button, Form, Input } from "antd";
import backgroundImg from "/src/assets/header_96c74815-3497-4ccf-bf3c-3dfdfa17e313.webp";
import { useForm } from "antd/es/form/Form";
import { emailSchema } from "../../schemas/userSchema";
import { useState } from "react";

const MainSignUp = () => {
  const [form] = useForm();
  const [isEmailValid, setIsEmailValid] = useState(false);

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
          // onFinish={onSubmit}
          onValuesChange={(_, allValues) => {
            const { email } = allValues;
            if (email) {
              setIsEmailValid(true);
            } else {
              setIsEmailValid(false);
            }
          }}
        >
          <Form.Item
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
            // loading={isLoading}
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
