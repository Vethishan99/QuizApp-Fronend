import type { QuestionWrapper, QuestionFull } from "../Types/quizTypes";

interface Props {
  score: number;
  total: number;
  questions: QuestionWrapper[];
  selected: Record<number, string>;
  detailed: Record<number, QuestionFull>;
  onRetry: () => void;
}

export default function QuizResult({
  score,
  total,
  questions,
  selected,
  detailed,
  onRetry,
}: Props) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Quiz Completed</h2>
        <p className="mb-4 text-lg">
          Score: <span className="font-semibold">{score}</span> / {total}
        </p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Try Again
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {questions.map((q, idx) => {
          const correct = detailed[q.id]?.rightAnswer;
          const your = selected[q.id] || "(no answer)";
          const isCorrect = correct ? your === correct : undefined;
          return (
            <div key={q.id} className="p-4 border rounded bg-white">
              <div className="font-medium mb-1">
                {idx + 1}. {q.questionTitle}
              </div>
              <div className="text-sm mb-2">
                Your answer:{" "}
                <span
                  className={`${isCorrect ? "text-green-600" : "text-red-600"}`}
                >
                  {your}
                </span>
              </div>
              {correct ? (
                <div className="text-sm">
                  Correct answer:{" "}
                  <span className="font-semibold">{correct}</span>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Correct answer not available from quiz endpoint
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
