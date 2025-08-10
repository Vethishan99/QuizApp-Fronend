import React, { useState } from "react";

interface Props {
  onAdd: (q: any) => void;
}

const QuestionInput: React.FC<Props> = ({ onAdd }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [rightAnswer, setRightAnswer] = useState("");

  const handleAdd = () => {
    onAdd({ questionTitle, options, rightAnswer });
    setQuestionTitle("");
    setOptions(["", "", "", ""]);
    setRightAnswer("");
  };

  return (
    <div>
      <input
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
        placeholder="Question"
      />
      {options.map((opt, i) => (
        <input
          key={i}
          value={opt}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[i] = e.target.value;
            setOptions(newOptions);
          }}
          placeholder={`Option ${i + 1}`}
        />
      ))}
      <input
        value={rightAnswer}
        onChange={(e) => setRightAnswer(e.target.value)}
        placeholder="Right Answer"
      />
      <button onClick={handleAdd}>Add Question</button>
    </div>
  );
};

export default QuestionInput;
