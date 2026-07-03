import { useState } from 'react';

export default function QuizResults({ score, total, answers, questions, onRestart }) {
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="quiz-results">
      <h2>Quiz Complete</h2>
      <div className="score-summary">
        <span className="score-number">{score}</span>
        <span className="score-of">/ {total}</span>
      </div>
      <div className="results-actions">
        <button onClick={() => setShowReview(!showReview)}>
          {showReview ? 'Hide' : 'Review'} Answers
        </button>
        <button onClick={onRestart}>Play Again</button>
      </div>
      {showReview && (
        <div className="answers-review">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.answer;
            return (
              <div key={q.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <p>{q.question}</p>
                <p>Your answer: {q.options[userAnswer] ?? 'Skipped'}</p>
                {!isCorrect && <p>Correct answer: {q.options[q.answer]}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
