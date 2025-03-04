import { Button, Form, Input } from "antd";

import { emailSchema } from "../schemas/userSchema";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex relative">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt=""
        className="absolute w-1/12 top-4 left-4 max-md:w-1/5"
      />
      <Form
        layout="vertical"
        className="bg-gray-100 m-auto p-8 max-md:w-full w-2/5 rounded-lg flex flex-col gap-4 shadow-lg"
      >
        <h1 className="font-semibold text-2xl">Forgot your password</h1>
        <p>We will send you a verified link to reset your password</p>
        <div className="bg-[#ec0b431a] border border-[#ec0b4333] p-4 rounded-md text-gray-500 text-sm">
          Your password will be reset. Please enter your main email for this
          account.
        </div>
        <Form.Item<{ email: string }>
          label="Enter your email"
          name={"email"}
          rules={emailSchema}
        >
          <Input
            type="text"
            placeholder="Enter your email"
            className="p-2 w-full"
          />
        </Form.Item>
        <div className="w-full flex flex-row gap-2">
          <Button type="default" className="w-1/2 px-auto text-center p-4">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={` w-1/2 px-auto text-center p-4`}
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
