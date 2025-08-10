export interface QuestionFull {
  id: number;
  questionTitle: string;
  category?: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  rightAnswer: string;
  difficultyLevel?: string;
}

export interface QuestionWrapper {
  id: number;
  questionTitle: string;
  category?: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export interface SubmittedResponse {
  id: number;
  response: string;
}