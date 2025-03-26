import { Button, Dropdown, Result } from "antd";
import { FaArrowLeft, FaCheck, FaRegClock } from "react-icons/fa6";
import { IoIosArrowDown, IoMdSettings } from "react-icons/io";
import { MdPlayArrow } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  itemsPoint,
  itemsTime,
  questionTypes,
} from "../../../constants/constants";
import { convertCamelCaseToTitleCase } from "../../../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "../../../apis/quiz.api";
import { useState } from "react";
import QuizSetting from "./QuizSetting";
import { Quiz } from "../../../types/quiz";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [openSetting, setOpenSetting] = useState(false);

  const { data, isError } = useQuery<Quiz>({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuizById(quizId as string),
    retry: 0,
  });

  if (isError) {
    return (
      <Result
        status="warning"
        title="There are some problems with your operation."
        extra={
          <Button onClick={() => navigate(-1)} type="primary" key="console">
            Go back
          </Button>
        }
      />
    );
  }

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
          <p className="font-medium max-md:hidden">{data?.title}</p>
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
          <div className="flex flex-row max-md:hidden items-center gap-2 py-1 px-4 border border-gray-400 rounded-md cursor-pointer hover:bg-gray-100">
            <MdPlayArrow />
            <p>Preview</p>
          </div>
          <Button danger type="primary">
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
          <div className="rounded-lg bg-white border border-gray-300 grid grid-cols-2 gap-2 text-sm p-1">
            {questionTypes.map((type) => (
              <div
                key={type.label}
                // onClick={() => openModal(type.label, null)}
                className={`flex flex-row items-center h-fit gap-2 hover:bg-gray-200 w-full cursor-pointer p-2 rounded-md`}
              >
                <div
                  className="p-2 rounded-md"
                  style={{
                    backgroundColor: type.color,
                    color: "white",
                  }}
                >
                  {type.icon}
                </div>
                <p>{convertCamelCaseToTitleCase(type.label)}</p>
              </div>
            ))}
          </div>
          {/* {modalType === "multipleChoice" && (
            <MultipleChoice
              open={isModalOpen}
              closeModal={closeModal}
              question={activeQuestion}
            />
          )}
          {modalType === "fillInTheBlank" && (
            <FillInTheBlank
              open={isModalOpen}
              closeModal={closeModal}
              question={activeQuestion}
            />
          )}
          {modalType === "openEnded" && (
            <OpenEnded
              open={isModalOpen}
              closeModal={closeModal}
              question={activeQuestion}
            />
          )} */}
        </div>
        <div className="w-3/4 max-md:w-full flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center">
            <p className="font-semibold text-xl">
              {/* {addSuffix(quiz?.data?.questions.length, "question")} */}
            </p>
            {/* <p className="text-xl text-gray-500">{`(${addSuffix(
              quiz?.data?.questions.reduce(
                (acc: number, val: QuestionResponse) => acc + val.point,
                0
              ),
              "point"
            )})`}</p> */}
          </div>
          <div className="overflow-y-auto h-[450px] flex flex-col gap-4">
            {/* {quiz?.data.questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg bg-white text-center">
                <p className="text-xl font-semibold text-gray-500">
                  You haven't created any questions!
                </p>
                <p className="text-gray-400">
                  Please create new questions to submit quiz.
                </p>
              </div>
            ) : (
              quiz?.data.questions.map((question: QuestionResponse) => (
                <Question
                  key={question.id}
                  question={question}
                  onEdit={openModal}
                />
              ))
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
