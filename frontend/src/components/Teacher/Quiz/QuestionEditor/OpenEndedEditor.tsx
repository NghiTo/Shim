import { createQuestion } from "@/apis/question.api";
import { onError } from "@/constants/onError";
import { pointSchema, timeSchema } from "@/schemas/quizSchema";
import { titleSchema } from "@/schemas/userSchema";
import { QuestionForm } from "@/types/quiz";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";

const OpenEndedEditor = () => {
  const [form] = Form.useForm();
  const { quizId } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      message.success("Question created successfully");
      form.resetFields();
    },
    onError: onError,
  });

  const onFinish = (data: QuestionForm) => {
    const formattedData = {
      ...data,
      type: "openEnded",
      quizId: quizId,
      answers: data.answers,
    };
    mutate(formattedData);
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="flex flex-row items-center gap-6">
        <Form.Item<{ time: number }>
          label="Time (seconds)"
          name={"time"}
          rules={timeSchema}
        >
          <InputNumber placeholder="Enter time limit" className="w-fit" />
        </Form.Item>
        <Form.Item<{ point: number }>
          label="Point"
          name={"point"}
          rules={pointSchema}
        >
          <InputNumber placeholder="Enter point" className="w-fit" />
        </Form.Item>
      </div>
      <Form.Item<{ title: string }>
        label="Question"
        name="title"
        rules={titleSchema}
      >
        <Input.TextArea rows={3} placeholder="Enter your question" />
      </Form.Item>
      <Form.Item label="Sample answer" name={["answers", 0, "content"]}>
        <Input.TextArea rows={3} placeholder="Enter your sample answer" />
      </Form.Item>

      <Button
        loading={isPending}
        type="primary"
        htmlType="submit"
        className="ml-auto flex"
      >
        Save Question
      </Button>
    </Form>
  );
};

export default OpenEndedEditor;
