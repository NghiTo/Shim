import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { otpSchema } from "../schemas/userSchema";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../apis/auth.api";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/userReducer";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success("Account deleted successfully");
      dispatch(clearUser());
      navigate("/");
    },
  });
  return (
    <div className="min-h-screen flex relative">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt=""
        className="absolute w-1/12 top-4 left-4 max-md:w-1/5"
      />
      <Form
        onFinish={(data) => mutate(data.otp)}
        layout="vertical"
        className="bg-gray-100 m-auto p-8 max-md:w-full w-2/5 rounded-lg flex flex-col gap-4 shadow-lg"
      >
        <h1 className="font-semibold text-2xl">Delete your account</h1>
        <p>This action will permanently delete your account details</p>
        <div className="bg-[#ec0b431a] border border-[#ec0b4333] p-4 rounded-md text-gray-500 text-sm">
          Your account cannot be recovered in future. You will lose access to
          all quizzes, lessons, classes and reports that you have created.
        </div>
        <Form.Item<{ otp: string }>
          label="Enter OTP"
          name={"otp"}
          rules={otpSchema}
        >
          <Input
            type="text"
            placeholder="Start typing..."
            className="py-2 w-full"
          />
        </Form.Item>
        <div className="w-full flex flex-row items-center gap-2">
          <Link
            to={"/teacher/settings"}
            className="bg-gray-200 w-1/2 px-auto text-center p-2 rounded-lg"
          >
            Cancel
          </Link>
          <Button
            className="w-1/2 py-4"
            htmlType="submit"
            type="primary"
            danger
            loading={isPending}
          >
            Delete
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DeleteAccount;
