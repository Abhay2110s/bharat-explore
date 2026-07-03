import React from 'react';

export default function SearchFilterBar({ query, onQueryChange, region, onRegionChange }) {
  return (
    <div className="search-filter-bar">
      <input
        type="text"
        placeholder="Search places..."
        value={query}
        onChange={e => onQueryChange(e.target.value)}
      />
      <select value={region} onChange={e => onRegionChange(e.target.value)}>
        <option value="all">All Regions</option>
      </select>
    </div>
  );
}
