/// <reference types="react-scripts" />

interface Question {
  answer: number;
  explanation: string[];
  id: number;
  options: string[];
  problem: string;
  question: string;
}

interface SecureQuestion {
  getAnswer: (selection: number) => {
    rightAnswer: number;
    explanation: string[];
  };
  id: number;
  options: string[];
  problem: string;
  question: string;
}

type Answer = [number, number | null, boolean | null];
