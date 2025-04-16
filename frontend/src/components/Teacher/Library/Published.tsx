import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gradeFilters, subjectFilters } from "@/constants/constants";
import { deleteQuiz, getAllQuizzes } from "@/apis/quiz.api";
import defaultImg from "@/assets/logo_placeholder_sm.png";
import { Button, Image, message, Table } from "antd";
import { onError } from "@/constants/onError";
import { ColumnsType } from "antd/es/table";
import { timeAgo } from "@/utils/helper";
import { Quiz } from "@/types/quiz";
import { useState } from "react";

const Published = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Quiz[]>({
    queryKey: ["published quizzes"],
    queryFn: () => getAllQuizzes({ status: "finished" }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: string[]) => deleteQuiz(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["published quizzes"] });
      message.success("Quiz deleted successfully");
    },
    onError: onError,
  });

  const columns: ColumnsType = [
    {
      title: "Cover image",
      dataIndex: "coverImg",
      key: "coverImg",
      align: "center",
      render: (url) => (
        <Image
          preview={false}
          src={url || defaultImg}
          alt="cover"
          className="w-8 h-8 object-cover rounded"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Total questions",
      key: "totalQuestions",
      align: "center",
      sorter: (a, b) => a.questions?.length - b.questions?.length,
      render: (_, record) => record.questions?.length,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      align: "center",
      filters: subjectFilters,
      filterMultiple: true,
      filterSearch: true,
      onFilter: (value, record) => record.subject.startsWith(value as string),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      filters: gradeFilters,
      filterMultiple: true,
      filterSearch: true,
      onFilter: (value, record) => record.grade.startsWith(value as string),
    },
    {
      title: "Quiz code",
      dataIndex: "quizCode",
      key: "quizCode",
      align: "center",
    },
    {
      title: "Last modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      sorter: (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      render: (_, record) => timeAgo(record.updatedAt),
    },
  ];
  return (
    <Table
      loading={isLoading}
      rowKey={"id"}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
      tableLayout="auto"
      rowSelection={{
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
      }}
      footer={() => (
        <div className="flex">
          <Button
            className="ml-auto"
            danger
            type="primary"
            onClick={() => mutate(selectedRowKeys as string[])}
            loading={isPending}
            disabled={selectedRowKeys.length === 0}
          >
            Delete
          </Button>
        </div>
      )}
    />
  );
};

export default Published;
