import React, { useState } from "react";
import { addQuestion } from "../Service/service";
import type { QuestionFull } from "../Types/quizTypes";

const emptyQuestion = (): QuestionFull => ({
  id: 0,
  questionTitle: "",
  category: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  rightAnswer: "",
  difficultyLevel: "",
});

export default function QuestionForm() {
  const [q, setQ] = useState<QuestionFull>(emptyQuestion());
  const [loading, setLoading] = useState(false);

  const handleChange = (k: keyof QuestionFull, v: string) =>
    setQ((s) => ({ ...s, [k]: v }));

  const submit = async () => {
    if (
      !q.questionTitle ||
      !q.option1 ||
      !q.option2 ||
      !q.option3 ||
      !q.option4 ||
      !q.rightAnswer
    ) {
      alert("Fill question, all 4 options and the right answer");
      return;
    }
    setLoading(true);
    try {
      await addQuestion(q);
      alert("Question added");
      setQ(emptyQuestion());
    } catch (err) {
      console.error(err);
      alert("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Question</h2>
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Question"
        value={q.questionTitle}
        onChange={(e) => handleChange("questionTitle", e.target.value)}
      />
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Category"
        value={q.category}
        onChange={(e) => handleChange("category", e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          className="border p-2 rounded"
          placeholder="Option 1"
          value={q.option1}
          onChange={(e) => handleChange("option1", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Option 2"
          value={q.option2}
          onChange={(e) => handleChange("option2", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Option 3"
          value={q.option3}
          onChange={(e) => handleChange("option3", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Option 4"
          value={q.option4}
          onChange={(e) => handleChange("option4", e.target.value)}
        />
      </div>
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Right Answer (exact option text)"
        value={q.rightAnswer}
        onChange={(e) => handleChange("rightAnswer", e.target.value)}
      />
      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Difficulty (optional)"
        value={q.difficultyLevel}
        onChange={(e) => handleChange("difficultyLevel", e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={submit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
        <button
          onClick={() => setQ(emptyQuestion())}
          className="px-4 py-2 border rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
