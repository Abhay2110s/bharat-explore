import React from 'react';

export default function StateCard({ state }) {
  return (
    <div className="state-card">
      <h3>{state.name}</h3>
      <p>{state.tagline}</p>
    </div>
  );
}
