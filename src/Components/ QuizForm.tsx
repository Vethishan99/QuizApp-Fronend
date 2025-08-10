import React, { useState } from "react";
import { createQuiz } from "../Service/api";

const QuizForm: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [category, setCategory] = useState("");
  const [numQ, setNumQ] = useState(5);

  const handleSubmit = async () => {
    if (!quizTitle || !category || numQ <= 0) {
      alert("Please fill all fields correctly");
      return;
    }
    try {
      await createQuiz(category, numQ, quizTitle);
      alert("Quiz created successfully");
      setQuizTitle("");
      setCategory("");
      setNumQ(5);
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    }
  };

  return (
    <div>
      <input
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Quiz Title"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="number"
        value={numQ}
        onChange={(e) => setNumQ(Number(e.target.value))}
        placeholder="Number of Questions"
      />
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizForm;
