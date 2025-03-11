import { FaLock, FaTrash } from "react-icons/fa6";
import {
  confirmPasswordSchema,
  passwordSchema,
} from "../../../schemas/userSchema";
import { MdManageAccounts } from "react-icons/md";
import { Button, Form, Input, message, Popconfirm } from "antd";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../apis/user.api";
import { useState } from "react";
import { PasswordForm } from "../../../types/user.type";
import { onError } from "../../../constants/onError";

const Setting = () => {
  const [form] = useForm();
  const [isFillForm, setIsFillForm] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => updateUser(user.id, data),
    onSuccess: () => {
      message.success("Password updated successfully");
      form.resetFields();
    },
    onError: onError,
  });

  const onSubmit = (data: PasswordForm) => {
    const formData = new FormData();
    formData.append("currentPassword", data.oldPassword);
    formData.append("password", data.password);
    mutate(formData);
  };
  return (
    <div className="h-full bg-gray-100 p-8 max-md:py-8 max-md:px-0 max-md:min-h-screen w-full">
      <div className="bg-white px-6 py-8 rounded-lg w-1/2 max-md:w-full mx-auto">
        <h1 className="text-3xl font-semibold text-[#424242]">Settings</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          onValuesChange={(_, allValues) => {
            const requiredFields = [
              "oldPassword",
              "confirmPassword",
              "password",
            ];
            setIsFillForm(
              requiredFields.every(
                (field) => allValues[field as keyof PasswordForm]
              )
            );
          }}
        >
          <div className="flex flex-row items-center text-base gap-2 py-2 my-4 border-b border-gray-400">
            <FaLock />
            <p>Password</p>
          </div>
          <Form.Item<{ oldPassword: string }>
            label="Old password"
            name={"oldPassword"}
            rules={passwordSchema}
          >
            <Input.Password
              type="password"
              className="w-full py-2"
              placeholder="Enter your current password"
            />
          </Form.Item>
          <Form.Item<{ password: string }>
            label="New password"
            name={"password"}
            rules={passwordSchema}
          >
            <Input.Password
              type="password"
              className="w-full py-2"
              placeholder="Enter new password"
            />
          </Form.Item>
          <Form.Item<{ confirmPassword: string }>
            label="Confirm new password"
            name={"confirmPassword"}
            rules={confirmPasswordSchema(form)}
          >
            <Input.Password
              type="password"
              className="w-full py-2"
              placeholder="Confirm your new password"
            />
          </Form.Item>
          <Button
            htmlType="submit"
            danger
            type="primary"
            disabled={!isFillForm}
            className="w-full py-5"
          >
            Update password
          </Button>
        </Form>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2 py-2 mt-4 border-b border-gray-400">
            <MdManageAccounts className="text-2xl" />
            <p>Change account type</p>
          </div>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to convert to student?"
            // onConfirm={() => confirm(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="py-2 rounded-lg bg-[#1677ff] text-white hover:bg-[#68a5fa] transition-all ease-in-out">
              Convert to student account
            </button>
          </Popconfirm>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2 py-2 mt-4 border-b border-gray-400">
            <FaTrash />
            <p>Delete account</p>
          </div>
          <Button
            // onClick={() => send()}
            // loading={isLoading}
            className="py-4 border text-base border-[#fe5f5c] text-[#fe5f5c] hover:bg-[#fe5f5c] hover:text-white transition-all ease-in-out"
          >
            Permanently delete your account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
