import React from 'react';

export default function FavoriteButton({ stateId, isFavorite, onToggle }) {
  return (
    <button
      onClick={() => onToggle(stateId)}
      aria-pressed={isFavorite}
      className="favorite-button"
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
}
