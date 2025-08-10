import React from "react";
import type { Question } from "../Types/quizTypes";
interface QuestionProps {
  question: Question;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  onSelect,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-3">{question.questionTitle}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`block p-2 border rounded-md cursor-pointer transition ${
              selectedAnswer === option
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onSelect(option)}
              className="hidden"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
