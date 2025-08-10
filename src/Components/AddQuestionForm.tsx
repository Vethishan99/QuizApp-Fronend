import React, { useState } from "react";
import { addQuestion } from "../Service/api";

const AddQuestionForm: React.FC = () => {
  const [question, setQuestion] = useState({
    questionTitle: "",
    category: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswer: "",
    difficultyLevel: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addQuestion(question);
      alert("Question added successfully");
      setQuestion({
        questionTitle: "",
        category: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        rightAnswer: "",
        difficultyLevel: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add question");
    }
  };

  return (
    <div>
      <input
        name="questionTitle"
        value={question.questionTitle}
        onChange={handleChange}
        placeholder="Question"
      />
      <input
        name="category"
        value={question.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        name="option1"
        value={question.option1}
        onChange={handleChange}
        placeholder="Option 1"
      />
      <input
        name="option2"
        value={question.option2}
        onChange={handleChange}
        placeholder="Option 2"
      />
      <input
        name="option3"
        value={question.option3}
        onChange={handleChange}
        placeholder="Option 3"
      />
      <input
        name="option4"
        value={question.option4}
        onChange={handleChange}
        placeholder="Option 4"
      />
      <input
        name="rightAnswer"
        value={question.rightAnswer}
        onChange={handleChange}
        placeholder="Right Answer"
      />
      <input
        name="difficultyLevel"
        value={question.difficultyLevel}
        onChange={handleChange}
        placeholder="Difficulty Level"
      />
      <button onClick={handleSubmit}>Add Question</button>
    </div>
  );
};

export default AddQuestionForm;
