import { Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  confirmPasswordSchema,
  passwordSchema,
} from "../../schemas/userSchema";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../../store/userReducer";
import { RootState } from "../../store/store";
import { updateUser } from "../../apis/user.api";

const CreatePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [form] = useForm();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: (password: string) => updateUser(user.id, { password }),
    onSuccess: () => {
      message.success("Password updated successfully");
      dispatch(setUser({ ...user, isGoogleAuth: false }));
      setIsModalOpen(false);
    },
  });

  useEffect(() => {
    if (user.isGoogleAuth) {
      setIsModalOpen(true);
    }
  }, [user.isGoogleAuth]);

  return (
    <Modal
      title="Create password"
      open={isModalOpen}
      closable={false}
      centered
      onOk={() => form.submit()}
      okButtonProps={{ danger: true, disabled: !isFormValid }}
      cancelButtonProps={{ style: { display: "none" } }}
      confirmLoading={isPending}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(data) => mutate(data.password)}
        onValuesChange={(_, allValues) => {
          const { password, confirmPassword } = allValues;
          if (password && confirmPassword) {
            setIsFormValid(true);
          } else {
            setIsFormValid(false);
          }
        }}
      >
        <Form.Item<{ password: string }>
          name={"password"}
          label="Password"
          rules={passwordSchema}
        >
          <Input.Password
            type="password"
            className="w-full py-2 px-3 rounded-md"
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
            className="w-full py-2 px-3 rounded-md"
            placeholder="Confirm your password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePassword;
