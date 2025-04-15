import { ColumnsType } from "antd/es/table";
import defaultImg from "@/assets/logo_placeholder_sm.png";
import { Image, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getAllQuizzes } from "@/apis/quiz.api";
import { Quiz } from "@/types/quiz";
import { timeAgo } from "@/utils/helper";

const Published = () => {
  const { data, isLoading } = useQuery<Quiz[]>({
    queryKey: ["published quizzes"],
    queryFn: () => getAllQuizzes({ status: "finished" }),
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
    },
    {
      title: "Total questions",
      key: "totalQuestions",
      render: (_, record) => record.questions?.length,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Quiz code",
      dataIndex: "quizCode",
      key: "quizCode",
    },
    {
      title: "Last modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, record) => timeAgo(record.updatedAt),
    },
  ];
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
      tableLayout="auto"
    />
  );
};

export default Published;
