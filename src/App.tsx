import React, { useState }from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { Difficulty, fetchQuiz, QuestionState } from './API'
import { GlobalStyle, Wrapper } from './App.style';

const TOTAL_QUESTIONS = 10;
//API - https://opentdb.com/api.php?amount=15

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([] as QuestionState[]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver , setGameover] = useState(true);

  console.log( fetchQuiz(TOTAL_QUESTIONS, Difficulty.EASY), gameOver, number+1)

  const startTrivia = async (level: 'EASY' | 'MEDIUM' | 'HARD') => {
    try {
      setLoading(true);
      setGameover(false);
      
      const newQuestions = await fetchQuiz(TOTAL_QUESTIONS, Difficulty[level]);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
      
    }
    catch { throw new Error('Error') }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const currentAnswer = e.currentTarget.value;
      const isCorrect = questions[number].correct_answer === currentAnswer;
      isCorrect && setScore(prev => prev + 1);

      // save user answer obj in userAnswers array
      setUserAnswers(prev =>
        [...prev,
          {
            question: questions[number].question,
            answer: currentAnswer,
            correct: isCorrect,
            correctAnswer: questions[number].correct_answer
          }
        ]
      );
    }
  }

  const nextQuestion = () => {
    // check if the next Question is last question
    if (number + 1 === TOTAL_QUESTIONS) {
      setGameover(true);
    } else {
      setNumber(number + 1)
    }
  }

  const Levels: ('EASY'|'MEDIUM'|'HARD')[] = ['EASY', 'MEDIUM', 'HARD']

  return (
    <div>
      <GlobalStyle />
      <Wrapper>
        <h1>Quizz App</h1>
        {Levels.map((level) => {
          if (gameOver || userAnswers.length === TOTAL_QUESTIONS)
            return <button className='start' onClick={() => startTrivia(level)}>{level}</button>
        })}
        {!gameOver && <cite><p className='score'>Score: {score}</p></cite>}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver &&
          <QuestionCard
            gameOver={ gameOver}
            as="h2"
            questionNr={number+1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          >
            <h3>Question Card</h3> 
          </QuestionCard>
        }
        {!gameOver && !loading && userAnswers.length === number + 1 && number + 1 <= TOTAL_QUESTIONS 
          ? <button className='next' onClick={nextQuestion}>
              {number + 1 === TOTAL_QUESTIONS ? 'Play Again' : 'Next Question'}
            </button>
          : null
        }
      </Wrapper>
    </div>
  );
}

export default App;
