import React from 'react';

export default function RankProgressBar({ progress }) {
  return (
    <div className="rank-progress">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span>{Math.round(progress)}%</span>
    </div>
  );
}
