import React, { useState, useEffect } from "react";

interface Question {
  id: number;
  questionTitle: string;
  category: string;
}

interface QuizFormProps {
  onSubmit: (category: string, numQ: number, title: string) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit }) => {
  const [category, setCategory] = useState("");
  const [numQ, setNumQ] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/question/categories")
      .then((res) => res.json())
      .then((data: string[]) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title || numQ < 1) {
      alert("Please fill all fields correctly");
      return;
    }
    onSubmit(category, numQ, title);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quiz Title */}
        <div>
          <label className="block text-gray-700 mb-1">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter quiz title"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-gray-700 mb-1">
            Number of Questions
          </label>
          <input
            type="number"
            value={numQ}
            onChange={(e) => setNumQ(Number(e.target.value))}
            min={1}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
