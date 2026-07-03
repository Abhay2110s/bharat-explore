import { useState, useCallback } from 'react';

export function useTripBuilder() {
  const [trip, setTrip] = useState([]);

  const addStop = useCallback((stop, day) => {
    setTrip(prev => {
      const dayStops = prev[day] || [];
      return {
        ...prev,
        [day]: [...dayStops, { ...stop, id: crypto.randomUUID() }]
      };
    });
  }, []);

  const removeStop = useCallback((stopId, day) => {
    setTrip(prev => ({
      ...prev,
      [day]: (prev[day] || []).filter(s => s.id !== stopId)
    }));
  }, []);

  return { trip, addStop, removeStop };
}
