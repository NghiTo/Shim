import { Input, Tabs, TabsProps } from "antd";
import { FiSearch } from "react-icons/fi";
import Published from "./Published";
import { Quiz } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { getAllQuizzes } from "@/apis/quiz.api";

const Library = () => {
  const { data: published } = useQuery<Quiz[]>({
    queryKey: ["published quizzes"],
    queryFn: () => getAllQuizzes({ status: "finished" }),
  });
  
  const tab: TabsProps["items"] = [
    {
      key: "1",
      label: `Published (${published?.length})`,
      children: <Published />,
    },
    {
      key: "2",
      label: `Draft`,
      //   children: <Draft />,
    },
  ];
  return (
    <div className="bg-gray-100 p-8 h-full w-full flex flex-col gap-4 flex-1">
      <div className="flex flex-row items-center">
        <h1 className="text-2xl font-semibold max-md:text-lg">My library</h1>
        <Input
          placeholder="Search in my library..."
          className="ml-auto p-2 w-1/4"
          prefix={<FiSearch />}
        />
      </div>
      <Tabs
        defaultActiveKey="1"
        items={tab}
        className="w-full custom-tabs Shim"
      />
    </div>
  );
};

export default Library;
