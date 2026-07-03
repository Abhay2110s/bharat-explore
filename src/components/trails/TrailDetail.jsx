import React from 'react';

export default function TrailDetail({ trail }) {
  if (!trail) return null;
  return (
    <div className="trail-detail">
      <h2>{trail.name}</h2>
      <p>{trail.description}</p>
      <ul>
        {(trail.stops || []).map((stop, idx) => (
          <li key={idx}>{stop}</li>
        ))}
      </ul>
    </div>
  );
}
