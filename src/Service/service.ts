// src/services/service.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

const API = axios.create({ baseURL: API_BASE });

// Questions
export const getAllQuestions = () => API.get("/question/allQuestions");
export const getQuestionsByCategory = (category: string) =>
  API.get(`/question/category/${encodeURIComponent(category)}`);
export const addQuestion = (data: any) => API.post("/question/add", data);

// Quiz
// createQuiz uses query params like your backend expects
export const createQuiz = (category: string, numQ: number, title: string) =>
  API.post(`/quiz/create`, null, {
    params: { category, numQ, title },
  });

// The backend GET returns a list of QuestionWrapper (no rightAnswer)
export const getQuizQuestions = (id: number) => API.get(`/quiz/get/${id}`);

// submit quiz responses: send [{id: number, response: string}, ...]
// backend returns an integer (score)
export const submitQuiz = (id: number, responses: { id: number; response: string }[]) =>
  API.post(`/quiz/submit/${id}`, responses);