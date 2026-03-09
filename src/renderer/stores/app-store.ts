import { create } from 'zustand';
import type { AIModel, AppSettings } from '../../shared/types';
import { DEFAULT_SETTINGS } from '../../shared/constants';

interface AppState {
  // Settings
  settings: AppSettings;
  settingsLoaded: boolean;

  // Models
  models: AIModel[];
  modelsLoading: boolean;
  modelsError: string | null;

  // Selection
  selectedModelIds: string[];
  searchQuery: string;

  // Actions
  loadSettings: () => Promise<void>;
  saveSettings: (settings: AppSettings) => Promise<void>;
  loadModels: () => Promise<void>;
  toggleModel: (modelId: string) => void;
  selectAllModels: () => void;
  clearAllModels: () => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  settings: { ...DEFAULT_SETTINGS } as AppSettings,
  settingsLoaded: false,
  models: [],
  modelsLoading: false,
  modelsError: null,
  selectedModelIds: [],
  searchQuery: '',

  // Load settings from main process
  loadSettings: async () => {
    try {
      if (!window.electronAPI) {
        set({ settingsLoaded: true });
        return;
      }
      const settings = await window.electronAPI.getSettings();
      set({
        settings,
        settingsLoaded: true,
        selectedModelIds: settings.selected_models || [],
      });
    } catch (err: unknown) {
      console.error('Failed to load settings:', err);
      set({ settingsLoaded: true });
    }
  },

  // Save settings
  saveSettings: async (settings: AppSettings) => {
    if (!window.electronAPI) {
      throw new Error('electronAPI is not available');
    }
    try {
      await window.electronAPI.saveSettings(settings);
      set({ settings });
    } catch (err: unknown) {
      console.error('Failed to save settings:', err);
      throw err;
    }
  },

  // Load models from OpenRouter
  loadModels: async () => {
    const { settings } = get();
    if (!settings.api_key) {
      set({ models: [], modelsLoading: false, modelsError: 'No API key configured' });
      return;
    }

    if (!window.electronAPI) {
      set({ models: [], modelsLoading: false, modelsError: 'electronAPI is not available' });
      return;
    }

    set({ modelsLoading: true, modelsError: null });
    try {
      const models = await window.electronAPI.getModels(settings.api_key);
      set({ models, modelsLoading: false });
    } catch (err: unknown) {
      set({ modelsLoading: false, modelsError: err instanceof Error ? err.message : String(err) });
    }
  },

  // Toggle model selection
  toggleModel: (modelId: string) => {
    set((state) => {
      const ids = state.selectedModelIds.includes(modelId)
        ? state.selectedModelIds.filter((id) => id !== modelId)
        : [...state.selectedModelIds, modelId];
      return { selectedModelIds: ids };
    });
  },

  // Select all visible models
  selectAllModels: () => {
    const { models, searchQuery } = get();
    const filtered = searchQuery
      ? models.filter(
          (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : models;
    set({ selectedModelIds: filtered.map((m) => m.id) });
  },

  // Clear selection
  clearAllModels: () => {
    set({ selectedModelIds: [] });
  },

  // Search
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
}));
