import React, { useEffect, useState } from "react";
import {
  getQuizQuestions,
  submitQuiz,
  getAllQuestions,
} from "../Service/service";
import type {
  QuestionWrapper,
  QuestionFull,
  SubmittedResponse,
} from "../Types/quizTypes";
import { useParams, useNavigate } from "react-router-dom";
import QuizResult from "./QuizResults";

export default function QuizAttempt() {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);
  const [questions, setQuestions] = useState<QuestionWrapper[]>([]);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [detailedMap, setDetailedMap] = useState<Record<number, QuestionFull>>(
    {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizId) return;
    getQuizQuestions(quizId)
      .then((res) => {
        setQuestions(res.data || []);
        // fetch all full questions and map by id to get rightAnswer for result display
        getAllQuestions()
          .then((r) => {
            const map: Record<number, QuestionFull> = {};
            (r.data || []).forEach((qq: QuestionFull) => (map[qq.id] = qq));
            setDetailedMap(map);
          })
          .catch(() => {});
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load quiz questions");
        navigate("/");
      });
  }, [quizId]);

  const choose = (qId: number, option: string) =>
    setSelected((s) => ({ ...s, [qId]: option }));

  const handleSubmit = async () => {
    if (questions.length === 0) return;
    const payload: SubmittedResponse[] = questions.map((q) => ({
      id: q.id,
      response: selected[q.id] || "",
    }));
    try {
      const res = await submitQuiz(quizId, payload);
      // backend returns score integer
      const scoreNum =
        typeof res.data === "number" ? res.data : Number(res.data);
      setScore(Number.isNaN(scoreNum) ? 0 : scoreNum);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz");
    }
  };

  if (score !== null) {
    // prepare per-question correctness using detailedMap (fallback if missing)
    return (
      <QuizResult
        score={score}
        total={questions.length}
        questions={questions}
        selected={selected}
        detailed={detailedMap}
        onRetry={() => {
          setScore(null);
          setSelected({});
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Attempt Quiz #{quizId}</h2>
      {questions.map((q, idx) => (
        <div key={q.id} className="border p-4 rounded mb-4 bg-white">
          <div className="font-medium mb-2">
            {idx + 1}. {q.questionTitle}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
              <label
                key={i}
                className={`p-2 border rounded cursor-pointer ${
                  selected[q.id] === opt
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={selected[q.id] === opt}
                  onChange={() => choose(q.id, opt)}
                  className="hidden"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Answers
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 border rounded"
        >
          Back Home
        </button>
      </div>
    </div>
  );
}
