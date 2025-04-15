import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertCamelCaseToTitleCase } from "@/utils/helper";
import { Drawer, message, Popconfirm, Table } from "antd";
import { Question, QuestionType } from "@/types/quiz";
import { deleteQuestion } from "@/apis/question.api";
import { onError } from "@/constants/onError";
import { useParams } from "react-router-dom";
import React from "react";
interface QuizDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentQuestionType: React.Dispatch<
    React.SetStateAction<QuestionType | null>
  >;
  questions?: Question[];
  setEditingQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
}

const QuizDrawer: React.FC<QuizDrawerProps> = ({
  openDrawer,
  setOpenDrawer,
  questions,
  setCurrentQuestionType,
  setEditingQuestion,
}) => {
  const queryClient = useQueryClient();
  const { quizId } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
      message.success("Question deleted successfully");
      setEditingQuestion(null);
    },
    onError: onError,
  });

  const handleEdit = (question: Question) => {
    setCurrentQuestionType(question.type);
    setEditingQuestion(question);
    setOpenDrawer(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => convertCamelCaseToTitleCase(type),
    },
    {
      title: "Time (s)",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Question) => (
        <div className="flex flex-row gap-2">
          <button
            onClick={() => handleEdit(record)}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Edit
          </button>
          <Popconfirm
            title="Delete quiz"
            placement="bottomLeft"
            onConfirm={() => mutate(record.id)}
          >
            <button className="text-red-500 hover:underline cursor-pointer">
              Delete
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Drawer
      title="Your questions"
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
      placement="right"
      width={600}
    >
      <Table
        loading={isPending}
        dataSource={questions}
        columns={columns}
        pagination={{ pageSize: 10 }}
        tableLayout="auto"
      />
    </Drawer>
  );
};

export default QuizDrawer;
