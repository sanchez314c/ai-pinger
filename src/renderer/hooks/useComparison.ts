import { useComparisonStore } from '../stores/comparison-store';

/**
 * Convenience hook for comparison state and actions
 */
export function useComparison() {
  return useComparisonStore();
}
