import { useCallback } from 'react';
import { useAppStore } from '../stores/app-store';

/**
 * Convenience hook for settings state and actions
 */
export function useSettings() {
  const settings = useAppStore((s) => s.settings);
  const settingsLoaded = useAppStore((s) => s.settingsLoaded);
  const saveSettings = useAppStore((s) => s.saveSettings);

  const hasApiKey = !!settings.api_key?.trim();

  const updateApiKey = useCallback(
    (apiKey: string) => {
      return saveSettings({ ...settings, api_key: apiKey });
    },
    [settings, saveSettings]
  );

  return {
    settings,
    settingsLoaded,
    hasApiKey,
    saveSettings,
    updateApiKey,
  };
}
