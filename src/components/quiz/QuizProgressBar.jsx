export default function QuizProgressBar({ current, total }) {
  const percent = (current / total) * 100;
  return (
    <div className="quiz-progress">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-text">Question {current} of {total}</span>
    </div>
  );
}
