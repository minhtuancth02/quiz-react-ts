
import { shuffleArray } from './utils';

// Fetch Quiz API

export enum Difficulty {
     EASY = 'easy',
     MEDIUM = 'medium',
     HARD = 'hard'
}

// type for question
export type Question = {
     question: string;
     category: string;
     correct_answer: string;
     incorrect_answers: string[];
     difficulty: string;
     type: string;
}

export type QuestionState = Question & { answers: string[] };

export const fetchQuiz = async (amount: number , difficulty: Difficulty) => {
     const URL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
     const data = await (await fetch(URL)).json();

     return data.results.map((question: Question) => (
          {
               ...question,
               answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
          }
     ))

}