import { createQuestion, updateQuestion } from "@/apis/question.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import { pointSchema, timeSchema } from "@/schemas/quizSchema";
import { Question, QuestionForm } from "@/types/quiz";
import { titleSchema } from "@/schemas/userSchema";
import { onError } from "@/constants/onError";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

interface OpenEndedEditorProps {
  question: Question | null;
}

const OpenEndedEditor: React.FC<OpenEndedEditorProps> = ({ question }) => {
  const [form] = Form.useForm();
  const { quizId } = useParams();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["quiz", quizId]})
      message.success("Question created successfully");
      form.resetFields();
    },
    onError: onError,
  });

  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: (data: QuestionForm) =>
      updateQuestion(question?.id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
      message.success("Question updated successfully");
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
    if (question) {
      mutateUpdate(formattedData);
    } else {
      mutate(formattedData);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      title: question?.title,
      time: question?.time,
      point: question?.point,
      answers: question?.answers,
    });
  }, [question, form]);

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
      <Form.Item
        label="Sample answer"
        name={["answers", 0, "content"]}
        rules={[{ required: true, message: "Please enter sample answer" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter your sample answer" />
      </Form.Item>

      <Button
        loading={isPending || isPendingUpdate}
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
