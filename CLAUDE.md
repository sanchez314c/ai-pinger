# Claude Instructions for AI Pinger

## Project Overview

AI Pinger is an Electron desktop app for testing multiple AI models from OpenRouter.ai with the same prompt and comparing responses side-by-side. Originally a Python CLI tool, it was rebuilt as a full Electron + React + TypeScript application with the Neo-Noir Glass Monitor design system.

**Key Features:**
- Multi-model prompt testing via OpenRouter.ai API
- Side-by-side response comparison with tabbed UI
- Auto-detection of `OPENROUTER_API_KEY` from environment/shell configs
- HTML report generation and JSON data export
- Model caching (5-minute TTL) to reduce API calls
- Sequential model processing to avoid rate limiting

## Technology Stack

- **Runtime**: Electron 33 (frameless, transparent window)
- **Frontend**: React 18, TypeScript 5.7, Zustand 5 (state management)
- **Styling**: Tailwind CSS 3.4, custom CSS variables (95+ tokens), glassmorphism
- **Build**: Electron Forge 7.6 with Vite plugin
- **Packaging**: @electron-forge/maker-zip (all platforms), @electron-forge/maker-deb (Linux)
- **Testing**: Vitest 2 with @testing-library/react
- **API**: OpenRouter.ai REST API (Bearer token auth)

## Key Conventions

**File Naming:**
- TypeScript/React: PascalCase components (`ModelCard.tsx`), kebab-case services (`settings-service.ts`)
- Config: JSON (`settings.json`)
- Scripts: kebab-case with platform (`run-source-linux.sh`)

**Code Style:**
- TypeScript strict mode
- React functional components with hooks
- Zustand stores for global state
- IPC via `contextBridge.exposeInMainWorld` (no direct `ipcRenderer` in renderer)

## Important Paths

**Source Code:**
- `src/main/` - Electron main process (window, IPC, services)
- `src/main/services/` - Backend services (API client, pinger, settings, reports, key detection)
- `src/renderer/` - React frontend (components, hooks, stores, styles)
- `src/shared/` - Shared types and constants

**Configuration:**
- `config/settings.json` - User settings (API key, theme, selected models, recent prompts)
- `forge.config.ts` - Electron Forge build config
- `vite.main.config.ts`, `vite.renderer.config.ts`, `vite.preload.config.ts` - Vite configs
- `tailwind.config.ts` - Tailwind with Neo-Noir color palette
- `tsconfig.json` - TypeScript config

**Assets:**
- `resources/icons/` - App icons (png, ico, icns)
- `resources/screenshots/` - App screenshots
- `templates/report_template.html` - HTML report template

## Common Tasks

```bash
# Run from source (Linux)
./run-source-linux.sh

# Manual start
npm install
npx electron-forge start -- --no-sandbox

# Build distributable
npx electron-forge make

# Run tests
npm test

# Lint
npm run lint
```

## Architecture Notes

### IPC Channels
- `models:getAll` - Fetch all OpenRouter models (with 5-min cache)
- `comparison:run` - Run sequential comparison across selected models
- `comparison:progress` - Progress events (pending/running/completed/error)
- `settings:get` / `settings:save` - Read/write settings JSON
- `export:html` / `export:json` - Generate and save reports
- `window-minimize` / `window-maximize` / `window-close` - Window controls
- `open-external` - Safe external URL opening (http/https/mailto only)

### Data Types (src/shared/types.ts)
- `AIModel` - Model metadata (id, name, provider, pricing, context_length)
- `ModelResponse` - Response data (content, error, responseTime, tokenUsage)
- `ComparisonProgress` - Progress tracking (status, completedCount, totalCount)
- `AppSettings` - Persistent config (api_key, theme, selected_models, recent_prompts)

### API Key Detection (3 methods)
1. `OPENROUTER_API_KEY` environment variable
2. Shell config files (~/.zshrc, ~/.bashrc, ~/.bash_profile, ~/.profile)
3. `printenv` subprocess fallback

### Design System
Neo-Noir Glass Monitor with:
- Frameless transparent Electron window with 16px body padding
- Floating glass panel effect with rounded corners (20px)
- Teal (#14b8a6) primary accent throughout
- Dark void background (#0a0b0e)
- Glassmorphism cards with backdrop-filter blur
- Custom title bar with app icon, flat action icons, circular window controls
- Status bar with green dot + model count (left), version (right)

## Dev Port

The Vite dev server runs on port **54023**.
