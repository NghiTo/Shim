import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateUser } from "../../../apis/user.api";
import {
  gradeOptions,
  subjectOptions,
  titleOptions,
} from "../../../constants/constants";
import { onError } from "../../../constants/onError";
import { Profile } from "../../../types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  firstNameSchema,
  gradeSchema,
  lastNameSchema,
  subjectSchema,
  titleSchema,
} from "../../../schemas/userSchema";
import { setUser } from "../../../store/userReducer";

interface EditProfileProps {
  data?: Profile;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile: React.FC<EditProfileProps> = ({
  data,
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => updateUser(user.id, data),
    onError: onError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
      message.success("Update profile successfully");
      setIsModalOpen(false);
    },
  });

  const onUpdate = (data: Profile) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("grade", data.grade);
    formData.append("subject", data.subject);
    mutate(formData);
  };

  return (
    <Modal
      open={isModalOpen}
      title="Edit Profile"
      okText="Save"
      centered
      width={700}
      footer={
        <Button
          type="primary"
          htmlType="submit"
          form="update-profile"
          loading={isPending}
        >
          Save
        </Button>
      }
      onCancel={() => {
        if (!data?.title || !data?.subject || !data?.grade) {
          message.info("Please complete your profile");
          return;
        }
        setIsModalOpen(false);
      }}
    >
      <Form
        onFinish={onUpdate}
        id="update-profile"
        layout="vertical"
        initialValues={{
          title: data?.title,
          firstName: data?.firstName,
          lastName: data?.lastName,
          grade: data?.grade,
          subject: data?.subject,
        }}
      >
        <div className="flex flex-row gap-2 w-full">
          <Form.Item<{ title: string }>
            label="Title"
            name={"title"}
            className="w-1/5"
            rules={titleSchema}
          >
            <Select className="w-full" options={titleOptions}></Select>
          </Form.Item>
          <Form.Item<{ firstName: string }>
            name={"firstName"}
            label="First name"
            className="w-full"
            rules={firstNameSchema}
          >
            <Input className="border w-full border-gray-300" type="text" />
          </Form.Item>
          <Form.Item<{ lastName: string }>
            label="Last name"
            name={"lastName"}
            className="w-full"
            rules={lastNameSchema}
          >
            <Input type="text" className="border w-full border-gray-300" />
          </Form.Item>
        </div>
        <div className="flex flex-row gap-2">
          <Form.Item<{ grade: string }>
            label="Grade"
            name={"grade"}
            className="w-1/6"
            rules={gradeSchema}
          >
            <Select className="w-full" options={gradeOptions}></Select>
          </Form.Item>
          <Form.Item<{ subject: string }>
            label="Subject"
            name={"subject"}
            className="w-1/3"
            rules={subjectSchema}
          >
            <Select className="w-full" options={subjectOptions}></Select>
          </Form.Item>
        </div>
        <div>
          <p>School</p>
          <div className="border w-full border-gray-300 rounded-lg p-2 flex flex-row items-center">
            <p>
              {data?.school.name +
                ", " +
                data?.school.city +
                ", " +
                data?.school.country}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                dispatch(setUser({ ...user, schoolId: "" }));
              }}
              className="py-1 px-2 bg-gray-300 cursor-pointer hover:bg-gray-200 rounded-md ml-auto transition-colors ease-in-out"
            >
              Change
            </button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfile;
