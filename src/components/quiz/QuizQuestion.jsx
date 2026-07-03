import { useState, useEffect } from 'react';
import QuizProgressBar from './QuizProgressBar';

export default function QuizQuestion({ question, onAnswer, questionNumber, totalQuestions }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsRevealed(false);
  }, [question]);

  const handleSelect = (index) => {
    if (isRevealed) return;
    setSelectedAnswer(index);
    setIsRevealed(true);
    onAnswer(index);
  };

  return (
    <div className="quiz-question">
      <QuizProgressBar current={questionNumber} total={totalQuestions} />
      <div className="question-text">{question.question}</div>
      <div className="options-list">
        {question.options.map((option, index) => {
          let className = 'option-button';
          if (isRevealed) {
            className += index === question.answer ? ' correct' : '';
            if (index === selectedAnswer && index !== question.answer) {
              className += ' incorrect';
            }
          }
          return (
            <button
              key={index}
              className={className}
              onClick={() => handleSelect(index)}
              disabled={isRevealed}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
