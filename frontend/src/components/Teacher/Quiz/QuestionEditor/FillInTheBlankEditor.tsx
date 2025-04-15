import { createQuestion, updateQuestion } from "@/apis/question.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import { pointSchema, timeSchema } from "@/schemas/quizSchema";
import { Answer, Question, QuestionForm } from "@/types/quiz";
import { titleSchema } from "@/schemas/userSchema";
import { onError } from "@/constants/onError";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

interface FillInTheBlankEditorProps {
  question: Question | null;
}

const FillInTheBlankEditor: React.FC<FillInTheBlankEditorProps> = ({
  question,
}) => {
  const [form] = Form.useForm();
  const { quizId } = useParams();
  const titleValue = Form.useWatch("title", form);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
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

  const updateBlanks = (title: string) => {
    const detectedBlanks = title.match(/\[blank\]/g) || [];
    form.setFieldsValue({
      answers: detectedBlanks.map(() => ({ content: "", isCorrect: true })),
    });
  };

  const onFinish = (data: QuestionForm) => {
    const formattedAnswers = (data.answers || []).map(
      (answer: Answer, index: number) => ({
        content: answer.content,
        isCorrect: true,
        position: index + 1,
      })
    );

    const formattedData = {
      ...data,
      type: "fillInTheBlank",
      quizId: quizId,
      answers: formattedAnswers,
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
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      onValuesChange={(changedValues) => {
        if (changedValues.title) {
          updateBlanks(changedValues.title);
        }
      }}
    >
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
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3>Preview Question:</h3>
        <p>{titleValue?.replace(/\[blank\]/g, "_____")}</p>
      </div>
      <Form.Item<{ title: string }>
        label="Question"
        name="title"
        rules={titleSchema}
      >
        <Input.TextArea
          rows={3}
          placeholder="Enter your question with [blank]"
        />
      </Form.Item>
      <Form.List name="answers">
        {(fields) => (
          <div>
            {fields.map(({ key, name }) => (
              <Form.Item
                key={key}
                label={`Blank #${name + 1}`}
                name={[name, "content"]}
                rules={[
                  { required: true, message: "Answer blank is required" },
                ]}
              >
                <Input placeholder={`Enter answer for blank #${name + 1}`} />
              </Form.Item>
            ))}
          </div>
        )}
      </Form.List>
      <Button
        loading={isPending || isPendingUpdate}
        type="primary"
        htmlType="submit"
        className="ml-auto flex"
      >
        {`${question ? "Update" : "Create"} question`}
      </Button>
    </Form>
  );
};

export default FillInTheBlankEditor;
