import React from 'react';

export default function StateGrid({ states }) {
  return (
    <div className="state-grid">
      {states.map(state => (
        <div key={state.id}>{state.name}</div>
      ))}
    </div>
  );
}
