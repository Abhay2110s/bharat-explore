import React from 'react';

export default function TripMapRoute({ stops }) {
  if (!stops?.length) return null;
  return (
    <div className="trip-map-route">
      <h4>Route</h4>
      <ol>
        {stops.map((stop, i) => (
          <li key={stop.id || i}>{stop.name}</li>
        ))}
      </ol>
    </div>
  );
}
