import { useState } from 'react';

export default function QuizHome({ categories, onStart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mode, setMode] = useState('practice');

  const handleStart = () => {
    onStart({ category: selectedCategory, mode });
  };

  return (
    <div className="quiz-home">
      <h1>India Explorer Quiz</h1>
      <div className="quiz-controls">
        <div className="control-group">
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label>Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="practice">Practice</option>
            <option value="timed">Timed Challenge</option>
          </select>
        </div>
      </div>
      <button className="start-button" onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
}
