import React from 'react';

export default function ItineraryList({ trip }) {
  const days = Object.entries(trip || {});
  return (
    <div className="itinerary-list">
      {days.map(([day, stops]) => (
        <div key={day} className="day-block">
          <h4>Day {day}</h4>
          <ul>
            {stops.map(stop => (
              <li key={stop.id}>{stop.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
