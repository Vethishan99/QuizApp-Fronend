import axios from "axios";
import type { Quiz } from "../Types/quizTypes";

const API_BASE = "http://localhost:8080"; // your backend API

export const getQuiz = async (quizId: string): Promise<Quiz> => {
  const res = await axios.get<Quiz>(`${API_BASE}/quiz/${quizId}`);
  return res.data;
};

export const submitAnswers = async (
  quizId: string,
  answers: { [questionId: string]: string }
) => {
  const res = await axios.post(`${API_BASE}/quiz/${quizId}/submit`, answers);
  return res.data; // expected: { score: number, total: number }
};