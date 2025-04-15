import { Question, QuestionType } from "@/types/quiz";
import { convertCamelCaseToTitleCase } from "@/utils/helper";
import React from "react";
import MultipleChoiceEditor from "./QuestionEditor/MultipleChoiceEditor";
import FillInTheBlankEditor from "./QuestionEditor/FillInTheBlankEditor";
import OpenEndedEditor from "./QuestionEditor/OpenEndedEditor";

interface QuestionEditorProps {
  type: QuestionType;
  editingQuestion: Question | null;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  type,
  editingQuestion,
}) => {
  const renderEditorByType = () => {
    switch (type) {
      case "multipleChoice":
        return <MultipleChoiceEditor question={editingQuestion} />;
      case "fillInTheBlank":
        return <FillInTheBlankEditor question={editingQuestion} />;
      case "openEnded":
        return <OpenEndedEditor question={editingQuestion} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold">Unsupported Question Type</h3>
            <p className="text-sm">
              This type of question is not available for editing.
            </p>
          </div>
        );
    }
  };
  return (
    <div className="rounded-lg bg-white border border-gray-300 p-6 flex-1 flex flex-col gap-6 overflow-auto max-h-[500px]">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold capitalize">
          {convertCamelCaseToTitleCase(type)} Question
        </h2>
      </div>
      {renderEditorByType()}
    </div>
  );
};

export default QuestionEditor;
