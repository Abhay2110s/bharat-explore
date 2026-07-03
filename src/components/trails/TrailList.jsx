import React from 'react';

export default function TrailList({ trails, onSelect }) {
  return (
    <div className="trail-list">
      {trails.map(trail => (
        <button key={trail.id} onClick={() => onSelect(trail)}>
          {trail.name}
        </button>
      ))}
    </div>
  );
}
