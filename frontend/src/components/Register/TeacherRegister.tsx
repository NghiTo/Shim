import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import {
  gradeOptions,
  subjectOptions,
  titleOptions,
} from "../../constants/constants";
import {
  confirmPasswordSchema,
  firstNameSchema,
  gradeSchema,
  lastNameSchema,
  passwordSchema,
  subjectSchema,
  titleSchema,
} from "../../schemas/userSchema";
import { RootState } from "../../store/store";
import { register } from "../../apis/auth.api";
import { RegisterForm } from "../../types/user.type";
import { onError } from "../../constants/onError";
import { setUser } from "../../store/userReducer";

const TeacherRegister = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      dispatch(setUser({ ...user, isAuthUser: true }));
      navigate("/teacher");
    },
    onError: onError,
  });

  const onSubmit = (data: RegisterForm) => {
    mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      title: data.title,
      grade: data.grade,
      subject: data.subject,
      role: user.role,
      email: user.email,
    });
  };

  useEffect(() => {
    if (!user.email || user.role !== "teacher") {
      navigate("/signup");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-100 w-1/3 min-h-full mx-auto rounded-lg flex flex-col gap-4 max-md:w-full p-8">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-center text-2xl font-semibold">
          Provide your account details
        </h1>
        <p>Signing up as teacher</p>
      </div>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <div className="flex flex-row w-full gap-4">
          <Form.Item<{ title: string }>
            label="Title"
            name={"title"}
            className="w-1/4"
            rules={titleSchema}
          >
            <Select
              className="w-full"
              options={titleOptions}
              placeholder="Title"
            ></Select>
          </Form.Item>
          <Form.Item<{ grade: string }>
            label="Grade"
            name={"grade"}
            className="w-1/4"
            rules={gradeSchema}
          >
            <Select
              className="w-full"
              options={gradeOptions}
              placeholder="Grade"
            ></Select>
          </Form.Item>
          <Form.Item<{ subject: string }>
            label="Subject"
            name={"subject"}
            className="w-1/2"
            rules={subjectSchema}
          >
            <Select
              className="w-full"
              options={subjectOptions}
              placeholder="Select subject"
            ></Select>
          </Form.Item>
        </div>
        <Form.Item<{ firstName: string }>
          label="First name"
          name={"firstName"}
          rules={firstNameSchema}
        >
          <Input
            type="text"
            className="py-2"
            placeholder="Enter your first name"
          />
        </Form.Item>
        <Form.Item<{ lastName: string }>
          label="Last name"
          name={"lastName"}
          rules={lastNameSchema}
        >
          <Input
            type="text"
            className="py-2"
            placeholder="Enter your last name"
          />
        </Form.Item>
        <Form.Item<{ password: string }>
          name={"password"}
          label="Password"
          rules={passwordSchema}
        >
          <Input.Password
            type="password"
            className="py-2"
            placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item<{ confirmPassword: string }>
          label="Confirm Password"
          name={"confirmPassword"}
          rules={confirmPasswordSchema(form)}
        >
          <Input.Password
            type="password"
            className="py-2"
            placeholder="Confirm your password"
          />
        </Form.Item>
        <Button
          loading={isPending}
          htmlType="submit"
          type="primary"
          className="flex ml-auto"
        >
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default TeacherRegister;
