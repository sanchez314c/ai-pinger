# API Reference

## OpenRouter.ai REST API

AI Pinger talks to OpenRouter.ai through two endpoints. All requests use Bearer token auth with `OPENROUTER_API_KEY`.

### Get Models

```
GET https://openrouter.ai/api/v1/models
```

Returns the full model catalog. AI Pinger filters out free-tier models and caches the result for 5 minutes. Response shape after processing:

```typescript
interface AIModel {
  id: string;          // e.g. "openai/gpt-4-turbo"
  name: string;        // e.g. "GPT-4 Turbo"
  provider: string;    // e.g. "openai" (extracted from id)
  description: string;
  pricing: { prompt?: number; completion?: number };
  context_length: number;
}
```

### Send Prompt

```
POST https://openrouter.ai/api/v1/chat/completions
```

Body:
```json
{
  "model": "openai/gpt-4-turbo",
  "messages": [{ "role": "user", "content": "Your prompt here" }]
}
```

Returns the standard OpenAI-compatible response. AI Pinger extracts `choices[0].message.content` and `usage` from the response.

### Headers

Every request includes:
- `Authorization: Bearer <api_key>`
- `Content-Type: application/json`
- `HTTP-Referer: https://github.com/RTG/ai-pinger`
- `X-Title: AI Pinger`

## IPC API (Electron Internal)

The renderer process communicates with the main process through `window.electronAPI`, exposed via `contextBridge` in `preload.ts`.

### Model Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `getModels` | `(apiKey: string) => Promise<AIModel[]>` | Fetch all models (cached 5 min) |

### Comparison Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `runComparison` | `(apiKey: string, modelIds: string[], prompt: string) => Promise<ModelResponse[]>` | Run sequential comparison |
| `onComparisonProgress` | `(callback: (progress: ComparisonProgress) => void) => () => void` | Subscribe to progress events |

### Settings

| Method | Signature | Description |
|--------|-----------|-------------|
| `getSettings` | `() => Promise<AppSettings>` | Read settings (auto-detects API key) |
| `saveSettings` | `(settings: AppSettings) => Promise<void>` | Write settings to disk |

### Export

| Method | Signature | Description |
|--------|-----------|-------------|
| `exportHtml` | `(prompt: string, responses: ModelResponse[]) => Promise<string \| null>` | Generate HTML report (opens save dialog) |
| `exportJson` | `(prompt: string, responses: ModelResponse[]) => Promise<string \| null>` | Generate JSON report (opens save dialog) |

### Window Controls

| Method | Signature | Description |
|--------|-----------|-------------|
| `windowMinimize` | `() => Promise<void>` | Minimize window |
| `windowMaximize` | `() => Promise<void>` | Toggle maximize/restore |
| `windowClose` | `() => Promise<void>` | Close window |
| `openExternal` | `(url: string) => Promise<void>` | Open URL in default browser (http/https/mailto only) |

### App Events

| Method | Signature | Description |
|--------|-----------|-------------|
| `onOpenSettings` | `(callback: () => void) => () => void` | Listen for Settings menu event |

## Data Types

All types are defined in `src/shared/types.ts`.

### ModelResponse

```typescript
interface ModelResponse {
  modelId: string;
  modelName: string;
  provider: string;
  content: string;
  error?: string;
  responseTime: number;        // seconds
  timestamp: string;           // ISO 8601
  tokenUsage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}
```

### ComparisonProgress

```typescript
interface ComparisonProgress {
  modelId: string;
  modelName: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  completedCount: number;
  totalCount: number;
}
```

### AppSettings

```typescript
interface AppSettings {
  api_key: string;
  theme: 'system' | 'light' | 'dark';
  selected_models: string[];
  recent_prompts: string[];
  window_geometry: string;
  auto_save: boolean;
}
```

## Error Handling

API errors throw standard `Error` with the HTTP status code and response body in the message. The pinger service catches these per-model and records the error in `ModelResponse.error`, so one failing model doesn't stop the rest of the comparison.
