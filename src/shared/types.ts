// ─── AI Model ─────────────────────────────────────────────
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  pricing: {
    prompt?: number;
    completion?: number;
  };
  context_length: number;
}

// ─── Model Response ───────────────────────────────────────
export interface ModelResponse {
  modelId: string;
  modelName: string;
  provider: string;
  content: string;
  error?: string;
  responseTime: number;
  timestamp: string;
  tokenUsage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

// ─── Comparison Progress ──────────────────────────────────
export interface ComparisonProgress {
  modelId: string;
  modelName: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  completedCount: number;
  totalCount: number;
}

// ─── App Settings ─────────────────────────────────────────
export interface AppSettings {
  api_key: string;
  theme: 'system' | 'light' | 'dark';
  selected_models: string[];
  recent_prompts: string[];
  window_geometry: string;
  auto_save: boolean;
}

// ─── IPC Channels ─────────────────────────────────────────
export type IpcChannels =
  | 'models:getAll'
  | 'comparison:run'
  | 'comparison:progress'
  | 'settings:get'
  | 'settings:save'
  | 'export:html'
  | 'export:json'
  | 'app:openSettings';

// ─── Window API declaration ───────────────────────────────
declare global {
  interface Window {
    electronAPI: import('../main/preload').ElectronAPI;
  }
}

