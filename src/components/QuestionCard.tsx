import React from 'react'
// Types
import { AnswerObject } from '../App';
// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.style';


type Props<T extends React.ElementType> = {
     question: string;
     answers: string[];
     callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
     userAnswer: AnswerObject | undefined;
     questionNr: number;
     totalQuestions: number;
     as?: T;
     children: React.ReactNode
}

type GenericProps<T extends React.ElementType> = Props<T> & Omit<React.ComponentProps<any>, keyof Props<T>>

const QuestionCard = <T extends React.ElementType = 'div'>({
 questionNr, answers, callback, userAnswer, question, totalQuestions, children,as
}: GenericProps<T>) => {
     const As = as || 'div';
     return (
          <Wrapper>
               <cite><As>{children}</As></cite>
               <p className='number'>
                    Question: {questionNr} / {totalQuestions}
               </p>
               <cite>
                    <p dangerouslySetInnerHTML={{ __html: question }}></p>
               </cite>
               {
                    <div>
                         {answers.map((answer) =>
                              <ButtonWrapper
                                   key={answer}
                                   correct={userAnswer?.correctAnswer === answer}
                                   userClicked={userAnswer?.answer === answer}
                              >
                                   <button
                                        value={answer}
                                        disabled={!!userAnswer}
                                        onClick={callback}
                                   >
                                        <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                                   </button>
                              </ButtonWrapper>
                         )}
                    </div>
               }
          </Wrapper>
     )
}

export default QuestionCard;

