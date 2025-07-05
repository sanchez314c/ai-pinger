import { useCallback } from 'react';
import { useAppStore } from '../stores/app-store';

/**
 * Convenience hook for model-related state and actions
 */
export function useModels() {
  const models = useAppStore((s) => s.models);
  const modelsLoading = useAppStore((s) => s.modelsLoading);
  const modelsError = useAppStore((s) => s.modelsError);
  const selectedModelIds = useAppStore((s) => s.selectedModelIds);
  const loadModels = useAppStore((s) => s.loadModels);
  const toggleModel = useAppStore((s) => s.toggleModel);
  const selectAllModels = useAppStore((s) => s.selectAllModels);
  const clearAllModels = useAppStore((s) => s.clearAllModels);

  const selectedModels = models.filter((m) => selectedModelIds.includes(m.id));

  const refreshModels = useCallback(() => {
    loadModels();
  }, [loadModels]);

  return {
    models,
    modelsLoading,
    modelsError,
    selectedModelIds,
    selectedModels,
    toggleModel,
    selectAllModels,
    clearAllModels,
    refreshModels,
  };
}
