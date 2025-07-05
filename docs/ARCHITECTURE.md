# Architecture

## Overview

AI Pinger is an Electron desktop application built with React and TypeScript. It follows Electron's multi-process architecture with a clear separation between the main process (Node.js backend) and the renderer process (React frontend), communicating through typed IPC channels.

## Process Architecture

```
+---------------------------+        IPC         +---------------------------+
|      Main Process         | <================> |    Renderer Process       |
|      (Node.js)            |   contextBridge    |    (Chromium/React)       |
|                           |                    |                           |
|  index.ts (entry)         |                    |  App.tsx (root)           |
|  ipc-handlers.ts          |                    |  Zustand stores           |
|  preload.ts (bridge)      |                    |  React components         |
|  services/                |                    |  Tailwind + CSS vars      |
|    openrouter-client.ts   |                    |                           |
|    pinger-service.ts      |                    |                           |
|    settings-service.ts    |                    |                           |
|    report-generator.ts    |                    |                           |
|    api-key-detector.ts    |                    |                           |
+---------------------------+                    +---------------------------+
```

## Main Process (`src/main/`)

### Entry Point (`index.ts`)
Creates a frameless, transparent `BrowserWindow` with:
- `transparent: true`, `frame: false` for the floating glass panel effect
- `contextIsolation: true`, `nodeIntegration: false` for security
- Linux-specific flags: `enable-transparent-visuals`, `disable-gpu-compositing`, `no-sandbox`
- 1500ms startup delay on Linux for transparent visual initialization
- Vite dev server retry logic (5 attempts with 1s delay)

### IPC Handlers (`ipc-handlers.ts`)
Registers all IPC channels:

| Channel | Handler |
|---------|---------|
| `models:getAll` | Fetches models from OpenRouter API (cached 5 min) |
| `comparison:run` | Runs sequential comparison, emits progress events |
| `settings:get` | Reads settings, auto-detects API key if missing |
| `settings:save` | Writes settings to JSON file |
| `export:html` | Generates HTML report via save dialog |
| `export:json` | Generates JSON report via save dialog |

### Preload (`preload.ts`)
Exposes `window.electronAPI` via `contextBridge` with typed methods for all IPC channels. Also exposes window control methods (`windowMinimize`, `windowMaximize`, `windowClose`, `openExternal`).

### Services

**openrouter-client.ts** - HTTP client for OpenRouter.ai API
- `fetchModels()` - GET `/v1/models`, filters out free models, 5-minute in-memory cache
- `sendPrompt()` - POST `/v1/chat/completions` with model ID and user message
- Bearer token auth, custom headers (`HTTP-Referer`, `X-Title`)

**pinger-service.ts** - Comparison orchestrator
- Runs models sequentially (not parallel) to avoid rate limiting
- Emits `ComparisonProgress` events for each model (pending/running/completed/error)
- Captures response time, token usage, and errors per model

**settings-service.ts** - JSON file persistence
- Dev: `config/settings.json` in project root
- Production: `settings.json` in Electron `userData` directory
- Merges saved settings with defaults on read

**report-generator.ts** - Export functionality
- HTML: Template-based with `{{PROMPT}}`, `{{MODEL_SECTIONS}}`, `{{TIMESTAMP}}` placeholders
- JSON: Structured export with prompt, timestamp, model count, and full response array
- HTML output escapes all user content to prevent XSS

**api-key-detector.ts** - Auto-detection of `OPENROUTER_API_KEY`
1. `process.env.OPENROUTER_API_KEY`
2. Shell config files (`~/.zshrc`, `~/.bashrc`, `~/.bash_profile`, `~/.profile`)
3. `printenv` subprocess fallback

## Renderer Process (`src/renderer/`)

### State Management
Zustand stores manage global state:
- `app-store.ts` - Models list, settings, loading states, API operations
- `comparison-store.ts` - Active comparison state, results, progress

### Component Hierarchy

```
App
  TitleBar          - App icon, name, tagline, About/Settings icons, window controls
  app-body (flex)
    Sidebar         - Model browser with search/filter, model cards with selection
    resize-handle   - Draggable divider (5px, teal hover)
    MainPanel       - Prompt input, action buttons, response tabs
  StatusBar         - Status dot + model count (left), version (right)
  AboutModal        - Project info, GitHub link
  SettingsModal     - API key, theme selection
```

### Shared Components (`components/shared/`)
Reusable UI primitives: Button, GlassCard, Input, Modal, Spinner, Tabs, Tag, Toast

### Design System
Neo-Noir Glass Monitor with 95+ CSS custom properties:
- Dark void background (`#0a0b0e`) with transparent body padding (16px)
- Glass cards with `backdrop-filter: blur()`, gradient backgrounds, `::before` highlight edges
- Teal (`#14b8a6`) primary accent, cyan secondary, purple tertiary
- Deep high-opacity shadows (0.4-0.65) for dark theme visibility

## Data Flow

### Comparison Flow
1. User enters prompt, selects models in sidebar
2. Renderer calls `electronAPI.runComparison(apiKey, modelIds, prompt)`
3. Main process `pinger-service` loops through models sequentially
4. Each model: sends prompt via `openrouter-client`, captures timing/response
5. Progress events sent to renderer via `comparison:progress` IPC channel
6. Zustand store updates, React re-renders response tabs

### Settings Flow
1. On app load, renderer calls `electronAPI.getSettings()`
2. Main process reads JSON, auto-detects API key if empty
3. User changes settings in modal, calls `electronAPI.saveSettings(settings)`
4. Main process writes JSON to disk

## Build System

Electron Forge with Vite plugin handles:
- Three Vite configs: main process, preload script, renderer
- ASAR packaging for production builds
- Makers: ZIP (all platforms), DEB (Linux)
- Dev server on port 54023

## Shared Code (`src/shared/`)

- `types.ts` - TypeScript interfaces shared between processes (AIModel, ModelResponse, ComparisonProgress, AppSettings, IpcChannels)
- `constants.ts` - API URLs, app metadata, default settings
