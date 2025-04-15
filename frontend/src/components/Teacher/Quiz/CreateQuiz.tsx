import { FaArrowLeft, FaCheck, FaRegClock } from "react-icons/fa6";
import { itemsPoint, itemsTime } from "@/constants/constants";
import { IoIosArrowDown, IoMdSettings } from "react-icons/io";
import { Question, QuestionType, Quiz } from "@/types/quiz";
import QuestionTypeSelector from "./QuestionTypeSelector";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "@/components/shared/ErrorPage";
import { Button, Dropdown, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import QuestionEditor from "./QuestionEditor";
import { getQuizById } from "@/apis/quiz.api";
import { MdPlayArrow } from "react-icons/md";
import QuizSetting from "./QuizSetting";
import QuizDrawer from "./QuizDrawer";
import { useState } from "react";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [openSetting, setOpenSetting] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentQuestionType, setCurrentQuestionType] =
    useState<QuestionType | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const { data, isError, isLoading } = useQuery<Quiz>({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuizById(quizId as string),
    retry: 0,
  });

  const handleQuestionTypeSelect = (type: QuestionType) => {
    setCurrentQuestionType(type);
  };

  const onPublish = () => {
    if (!data?.grade || !data?.subject) {
      setOpenSetting(true);
      return;
    }
  };

  if (isError) return <ErrorPage />;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white border-b border-gray-300 py-3 px-4 flex flex-row">
        <div className="flex flex-row gap-4 items-center">
          <div
            onClick={() => navigate(-1)}
            className="rounded-sm bg-gray-200 w-fit p-2 cursor-pointer"
            title="Back"
          >
            <FaArrowLeft />
          </div>
          {isLoading ? (
            <Skeleton.Button active className="w-28" />
          ) : (
            <p className="font-medium max-md:hidden">{data?.title}</p>
          )}
        </div>
        <div className="ml-auto flex flex-row gap-4">
          <div
            onClick={() => setOpenSetting(true)}
            className="flex flex-row items-center gap-2 py-1 px-4 border border-gray-400 rounded-md cursor-pointer hover:bg-gray-100"
          >
            <IoMdSettings />
            <p>Settings</p>
          </div>
          <QuizSetting
            openSetting={openSetting}
            setOpenSetting={setOpenSetting}
            quiz={data}
          />
          <div
            onClick={() => setOpenDrawer(true)}
            className="flex flex-row max-md:hidden items-center gap-2 py-1 px-4 border border-gray-400 rounded-md cursor-pointer hover:bg-gray-100"
          >
            <MdPlayArrow />
            <p>Preview</p>
          </div>
          <QuizDrawer
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            questions={data?.questions}
            setCurrentQuestionType={setCurrentQuestionType}
            setEditingQuestion={setEditingQuestion}
          />
          <Button onClick={onPublish} danger type="primary">
            Publish quiz
          </Button>
        </div>
      </div>
      <div className="p-6 flex flex-row gap-6 max-md:flex-col items-start">
        <div className="flex flex-col w-1/4 max-md:w-full gap-4">
          <div className="rounded-lg bg-white flex flex-col border border-gray-300">
            <p className="text-xl font-medium m-4">Bulk update questions</p>
            <Dropdown
              menu={{
                items: itemsTime,
                // onClick: (e) => handleDropdownClick("time", e),
              }}
              trigger={["click"]}
              dropdownRender={(menu) => (
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {menu}
                </div>
              )}
            >
              <div className="flex flex-row items-center hover:cursor-pointer gap-2 hover:bg-gray-100 p-3 border-b border-gray-300">
                <FaRegClock />
                <p>Time</p>
                <IoIosArrowDown className="ml-auto" />
              </div>
            </Dropdown>
            <Dropdown
              menu={{
                items: itemsPoint,
                // onClick: (e) => handleDropdownClick("point", e),
              }}
              trigger={["click"]}
              dropdownRender={(menu) => (
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {menu}
                </div>
              )}
            >
              <div className="flex flex-row hover:cursor-pointer items-center rounded-b-lg gap-2 hover:bg-gray-100 p-3">
                <FaCheck />
                <p>Points</p>
                <IoIosArrowDown className="ml-auto" />
              </div>
            </Dropdown>
          </div>
          <QuestionTypeSelector onSelectType={handleQuestionTypeSelect} setEditingQuestion={setEditingQuestion}/>
        </div>
        {currentQuestionType ? (
          <QuestionEditor type={currentQuestionType} editingQuestion={editingQuestion}/>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center flex-1 m-auto">
            <h3 className="text-xl font-medium mb-4">
              Start creating your quiz
            </h3>
            <p className="text-gray-500 mb-6">
              Select a question type from the left to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
