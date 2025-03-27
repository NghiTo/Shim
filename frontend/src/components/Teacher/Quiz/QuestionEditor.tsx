import { QuestionType } from "@/types/quiz";
import { convertCamelCaseToTitleCase } from "@/utils/helper";
import React from "react";
import MultipleChoiceEditor from "./QuestionEditor/MultipleChoiceEditor";

interface QuestionEditorProps {
  type: QuestionType;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ type }) => {
  const renderEditorByType = () => {
    switch (type) {
      case "multipleChoice":
        return <MultipleChoiceEditor />;
    }
  };
  return (
    <div className="rounded-lg bg-white border border-gray-300 p-6 flex-1 flex flex-col gap-6 overflow-auto h-[500px]">
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
