import { useState, useCallback } from 'react';

const REGIONS = [
  'North', 'South', 'East', 'West', 'Central', 'Northeast'
];

export function useSurpriseMe() {
  const [picked, setPicked] = useState(null);
  const [visited, setVisited] = useState([]);

  const pick = useCallback(() => {
    const pool = REGIONS.filter(r => !visited.includes(r));
    if (!pool.length) return null;
    const choice = pool[Math.floor(Math.random() * pool.length)];
    setVisited(prev => [...prev, choice]);
    setPicked(choice);
    return choice;
  }, [visited]);

  return { picked, pick };
}
