import React from "react";

interface Props {
  questions: any[];
}

const QuestionList: React.FC<Props> = ({ questions }) => (
  <ul>
    {questions.map((q, idx) => (
      <li key={idx}>{q.questionTitle}</li>
    ))}
  </ul>
);

export default QuestionList;
