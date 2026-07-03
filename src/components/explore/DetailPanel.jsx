import React from 'react';

export default function DetailPanel({ state }) {
  if (!state) return null;
  return (
    <div className="detail-panel">
      <h2>{state.name}</h2>
      <p>{state.description}</p>
      <ul>
        {(state.attractions || []).map(a => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
