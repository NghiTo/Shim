import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Switch,
} from "antd";
import { useState } from "react";
import { pointSchema, timeSchema } from "@/schemas/quizSchema";
import { Answer, QuestionForm } from "@/types/quiz";
import { titleSchema } from "@/schemas/userSchema";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createQuestion } from "@/apis/question.api";
import { onError } from "@/constants/onError";

const MultipleChoiceEditor = () => {
  const [allowMultiple, setAllowMultiple] = useState(false);
  const { quizId } = useParams();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      message.success("Question created successfully");
      form.resetFields();
    },
    onError: onError,
  });

  const handleFormSubmit = (data: QuestionForm) => {
    const formattedData = {
      ...data,
      type: "multipleChoice",
      quizId: quizId,
      answers: data.answers.map((answer) => ({
        content: answer.content,
        isCorrect: answer.isCorrect,
      })),
    };

    mutate(formattedData);
  };

  const handleCheckboxChange = (
    index: number,
    checked: boolean,
    fields: Answer[]
  ) => {
    if (!allowMultiple) {
      const updatedAnswers = fields?.map((field, i) => ({
        ...field,
        isCorrect: i === index ? checked : false,
      }));
      form.setFieldsValue({ answers: updatedAnswers });
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout="vertical"
      initialValues={{
        answers: [
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
        ],
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
      <Form.Item label="Question Title" name="title" rules={titleSchema}>
        <Input.TextArea rows={3} placeholder="Enter your question here" />
      </Form.Item>
      <div className="flex flex-row items-center gap-3 mb-3">
        <Switch
          checked={allowMultiple}
          onChange={() => setAllowMultiple(!allowMultiple)}
        />
        <label className="font-semibold text-base">
          Allow multiple isCorrect answers
        </label>
      </div>
      <Form.List name="answers">
        {(fields, { add, remove }) => (
          <div className="flex flex-col">
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className="flex flex-row gap-3">
                <Form.Item
                  {...restField}
                  name={[name, "isCorrect"]}
                  valuePropName="checked"
                >
                  <Checkbox
                    onChange={(e) =>
                      handleCheckboxChange(
                        index,
                        e.target.checked,
                        form.getFieldValue("answers")
                      )
                    }
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "content"]}
                  rules={[
                    { required: true, message: "Answer content required" },
                  ]}
                  className="flex-grow"
                >
                  <Input className="py-2" placeholder={`Answer ${index + 1}`} />
                </Form.Item>
                {fields.length > 2 && (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                )}
              </div>
            ))}
            <div className="flex items-center flex-row">
              {fields.length < 5 && (
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => add({ content: "", isCorrect: false })}
                >
                  Add Answer
                </Button>
              )}
              <Button
                type="primary"
                htmlType="submit"
                className="ml-auto"
                loading={isPending}
              >
                Save Question
              </Button>
            </div>
          </div>
        )}
      </Form.List>
    </Form>
  );
};

export default MultipleChoiceEditor;
