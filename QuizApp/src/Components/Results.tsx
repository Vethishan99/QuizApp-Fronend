import React from "react";

interface ResultProps {
  score: number;
  total: number;
  onRetry: () => void;
}

const Result: React.FC<ResultProps> = ({ score, total, onRetry }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-lg mb-4">
        Your Score: <span className="font-semibold">{score}</span> / {total}
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default Result;
