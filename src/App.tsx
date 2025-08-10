// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import QuestionForm from "./Components/QuestionForm";
import QuizForm from "./Components/ QuizForm";
import QuizAttempt from "./Components/QuizAttempt";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-slate-800 text-white p-4">
          <div className="max-w-4xl mx-auto flex gap-4">
            <Link to="/" className="font-semibold">
              Home
            </Link>
            <Link to="/add-question">Add Question</Link>
            <Link to="/create-quiz">Create Quiz</Link>
          </div>
        </header>

        <main className="py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-3xl mx-auto p-6">
                  <h1 className="text-2xl font-bold">Quiz App</h1>
                  <p className="mt-4">
                    Use the nav to add questions, create a quiz and attempt it.
                  </p>
                </div>
              }
            />
            <Route path="/add-question" element={<QuestionForm />} />
            <Route
              path="/create-quiz"
              element={
                <QuizForm
                  onSubmit={function (
                    category: string,
                    numQ: number,
                    title: string
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
            <Route path="/attempt/:id" element={<QuizAttempt />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
