import React from 'react';
import ItineraryList from './ItineraryList';

export default function TripBuilder({ trip }) {
  return (
    <div className="trip-builder">
      <h2>Trip Builder</h2>
      <ItineraryList trip={trip} />
    </div>
  );
}
