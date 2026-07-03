export function useExplorerRank(visitedRegions = []) {
  const rank = computeRank(visitedRegions);
  const progress = computeProgress(visitedRegions);
  return { rank, progress };
}

function computeRank(regions) {
  if (regions.length >= 18) return 'Incredible India Legend';
  if (regions.length >= 14) return 'Heritage Explorer';
  if (regions.length >= 10) return 'Cultural Guide';
  if (regions.length >= 6) return 'Traveller';
  if (regions.length >= 3) return 'Wanderer';
  return 'Newcomer';
}

function computeProgress(regions) {
  return Math.min((regions.length / 18) * 100, 100);
}
