import React from "react";
import { convertCamelCaseToTitleCase } from "@/utils/helper";
import { questionTypes } from "@/constants/constants";
import { QuestionType } from "@/types/quiz";

interface QuestionTypeSelectorProps {
  onSelectType: (type: QuestionType) => void;
}
const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({
  onSelectType,
}) => {
  return (
    <div className="rounded-lg bg-white border border-gray-300 grid grid-cols-2 gap-2 text-sm p-1">
      {questionTypes.map((type) => (
        <div
          key={type.label}
          onClick={() => onSelectType(type.label as QuestionType)}
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
  );
};

export default QuestionTypeSelector;
