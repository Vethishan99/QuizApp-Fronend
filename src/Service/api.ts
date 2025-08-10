import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const getAllQuestions = () => API.get("/question/allQuestions");
export const addQuestion = (data: any) => API.post("/question/add", data);

export const createQuiz = (category: string, numQ: number, title: string) =>
  API.post(`/quiz/create?category=${category}&numQ=${numQ}&title=${title}`);

export const getQuizQuestions = (id: number) => API.get(`/quiz/get/${id}`);
export const submitQuiz = (id: number, responses: any[]) =>
  API.post(`/quiz/submit/${id}`, responses);