import { useState, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  return { favorites, toggleFavorite };
}
