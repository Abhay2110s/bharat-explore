import React from 'react';
import { useSurpriseMe } from '../../hooks/useSurpriseMe';

export default function SurpriseMe({ states }) {
  const { picked, pick } = useSurpriseMe();
  const target = states.find(s => s.id === picked);

  return (
    <div className="surprise-me">
      <button onClick={pick}>Surprise Me!</button>
      {target && (
        <div className="surprise-result">
          <h3>{target.name}</h3>
          <p>{target.tagline}</p>
        </div>
      )}
    </div>
  );
}
