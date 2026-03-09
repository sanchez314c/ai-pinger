import { create } from 'zustand';
import type { ModelResponse, ComparisonProgress } from '../../shared/types';

interface ComparisonState {
  prompt: string;
  responses: ModelResponse[];
  isRunning: boolean;
  progress: ComparisonProgress | null;
  error: string | null;
  exportError: string | null;

  // Actions
  setPrompt: (prompt: string) => void;
  runComparison: (apiKey: string, modelIds: string[], prompt: string) => void;
  clearResponses: () => void;
  exportHtml: (prompt: string) => void;
  exportJson: (prompt: string) => void;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  prompt: '',
  responses: [],
  isRunning: false,
  progress: null,
  error: null,
  exportError: null,

  setPrompt: (prompt: string) => set({ prompt }),

  runComparison: async (apiKey: string, modelIds: string[], prompt: string) => {
    // Guard against overlapping calls
    if (get().isRunning) return;

    // Register listener BEFORE setting running state
    const cleanup = window.electronAPI.onComparisonProgress((progress) => {
      set({ progress });
    });

    set({ isRunning: true, responses: [], progress: null, error: null });

    try {
      const responses = await window.electronAPI.runComparison(apiKey, modelIds, prompt);
      set({ responses, isRunning: false, progress: null });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      set({
        isRunning: false,
        progress: null,
        error: message,
      });
    } finally {
      cleanup();
    }
  },

  clearResponses: () => set({ prompt: '', responses: [], progress: null, error: null }),

  exportHtml: async (prompt: string) => {
    const { responses } = get();
    set({ exportError: null });
    try {
      await window.electronAPI.exportHtml(prompt, responses);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      set({ exportError: message });
    }
  },

  exportJson: async (prompt: string) => {
    const { responses } = get();
    set({ exportError: null });
    try {
      await window.electronAPI.exportJson(prompt, responses);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      set({ exportError: message });
    }
  },
}));
