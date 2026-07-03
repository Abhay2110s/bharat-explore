import React from 'react';
import { useExplorerRank } from '../../hooks/useExplorerRank';

export default function ExplorerRankBadge({ visitedRegions }) {
  const { rank } = useExplorerRank(visitedRegions);
  return (
    <div className="rank-badge">
      <span className="rank-label">Rank</span>
      <span className="rank-value">{rank}</span>
    </div>
  );
}
