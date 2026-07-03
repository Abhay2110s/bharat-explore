import React from 'react';

const REGIONS = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];

export default function RegionFilter({ selected, onChange }) {
  return (
    <div className="region-filter">
      <button
        className={selected === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        All
      </button>
      {REGIONS.map(region => (
        <button
          key={region}
          className={selected === region ? 'active' : ''}
          onClick={() => onChange(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
}
