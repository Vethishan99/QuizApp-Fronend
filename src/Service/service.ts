import axios from "axios";
import type { QuestionFull, QuestionWrapper, SubmittedResponse } from "../Types/quizTypes";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080",
});

// Questions
export const getAllQuestions = () => API.get<QuestionFull[]>("/question/allQuestions");
export const getQuestionsByCategory = (category: string) =>
  API.get<QuestionFull[]>(`/question/category/${encodeURIComponent(category)}`);
export const addQuestion = (data: Omit<QuestionFull, "id">) =>
  API.post("/question/add", data);

// Quiz
export const createQuiz = (category: string, numQ: number, title: string) =>
  API.post(`/quiz/create`, null, { params: { category, numQ, title } });

export const getQuizQuestions = (id: number) =>
  API.get<QuestionWrapper[]>(`/quiz/get/${id}`);

export const submitQuiz = (id: number, responses: SubmittedResponse[]) =>
  API.post<number>(`/quiz/submit/${id}`, responses);