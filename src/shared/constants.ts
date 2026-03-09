export const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
export const OPENROUTER_MODELS_URL = `${OPENROUTER_BASE_URL}/models`;
export const OPENROUTER_CHAT_URL = `${OPENROUTER_BASE_URL}/chat/completions`;

export const APP_NAME = 'AI Pinger';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Test and compare multiple AI models from OpenRouter.ai side-by-side';

export const DEFAULT_SETTINGS = {
  api_key: '',
  theme: 'system' as const,
  selected_models: [] as string[],
  recent_prompts: [] as string[],
  window_geometry: '1400x900',
  auto_save: true,
};

export const SETTINGS_FILE = 'config/settings.json';
