export interface Question {
    id: string;
    questionTitle: string;
    options: string[];
  }
  
  export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
  }