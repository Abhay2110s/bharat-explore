import React, { useState } from 'react';

export default function DayScheduler({ daysCount, onAssign }) {
  const [day, setDay] = useState(daysCount > 0 ? 1 : 1);

  return (
    <div className="day-scheduler">
      <h4>Day Scheduler</h4>
      <input
        type="number"
        min="1"
        value={day}
        onChange={e => setDay(Number(e.target.value))}
      />
      <button onClick={() => onAssign(day)}>Assign Stop</button>
    </div>
  );
}
