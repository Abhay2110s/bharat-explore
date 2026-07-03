import { createContext, useContext, useState } from 'react';

const ExplorerContext = createContext();

export function ExplorerProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [trip, setTrip] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addTripStop = (stop, day) => {
    setTrip(prev => {
      const dayStops = prev[day] || [];
      return {
        ...prev,
        [day]: [...dayStops, { ...stop, id: crypto.randomUUID() }]
      };
    });
  };

  return (
    <ExplorerContext.Provider value={{ favorites, trip, toggleFavorite, addTripStop }}>
      {children}
    </ExplorerContext.Provider>
  );
}

export function useExplorer() {
  const ctx = useContext(ExplorerContext);
  if (!ctx) throw new Error('useExplorer must be used within ExplorerProvider');
  return ctx;
}
