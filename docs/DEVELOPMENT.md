# Development Guide

## Prerequisites

- Node.js 18+
- npm 9+
- Git
- OpenRouter.ai API key (for testing API integration)
- Linux: `sudo sysctl -w kernel.unprivileged_userns_clone=1` for Electron sandbox

## Setup

```bash
git clone https://github.com/sanchez314c/ai-pinger.git
cd ai-pinger
npm install
```

## Running

```bash
# Linux (handles sandbox fix, cache cleanup)
./run-source-linux.sh

# Manual (any platform)
npx electron-forge start -- --no-sandbox

# The Vite dev server runs on port 54023
```

## Project Structure

```
src/
  main/                 # Electron main process (Node.js)
    index.ts            # App entry, BrowserWindow creation
    preload.ts          # contextBridge API
    ipc-handlers.ts     # IPC channel registration
    menu.ts             # Application menu
    services/
      openrouter-client.ts   # OpenRouter API (fetch, cache, send)
      pinger-service.ts      # Sequential model comparison
      settings-service.ts    # JSON settings persistence
      report-generator.ts    # HTML/JSON export
      api-key-detector.ts    # Auto-detect API key
  renderer/             # React frontend (Chromium)
    App.tsx             # Root component
    main.tsx            # React DOM mount
    stores/             # Zustand state management
      app-store.ts      # Models, settings, loading state
      comparison-store.ts  # Comparison results, progress
    hooks/              # Custom React hooks
      useIpc.ts         # IPC bridge helpers
      useModels.ts      # Model data hooks
      useSettings.ts    # Settings hooks
      useComparison.ts  # Comparison state hooks
    components/
      layout/           # TitleBar, Sidebar, MainPanel, StatusBar, AboutModal, AppLayout
      models/           # ModelCard, ModelList, ModelControls
      prompt/           # PromptInput, ActionButtons
      responses/        # ResponsePanel, ResponseTabs, WelcomeTab
      settings/         # SettingsModal
      shared/           # Button, GlassCard, Input, Modal, Spinner, Tabs, Tag, Toast
    styles/
      globals.css       # 95+ CSS variables, all component styles
      design-tokens.ts  # TypeScript design token exports
  shared/               # Shared between main and renderer
    types.ts            # TypeScript interfaces
    constants.ts        # API URLs, defaults, app metadata
```

## Key Concepts

### IPC Communication
All main-renderer communication goes through the preload script's `contextBridge`. The renderer calls `window.electronAPI.methodName()` which maps to `ipcRenderer.invoke()` calls handled in `ipc-handlers.ts`.

### State Management
Zustand stores in `src/renderer/stores/` manage all global state. Components use hooks to read from and dispatch to stores.

### Styling
Two-layer system:
1. CSS custom properties in `globals.css` (95+ tokens for the Neo-Noir Glass Monitor design)
2. Tailwind CSS utility classes configured in `tailwind.config.ts` with the custom color palette

### Build Pipeline
Electron Forge orchestrates three Vite builds:
- `vite.main.config.ts` - Main process (Node.js target)
- `vite.preload.config.ts` - Preload script (Node.js target)
- `vite.renderer.config.ts` - Renderer (browser target, React plugin)

## Testing

```bash
# Run test suite
npm test

# Watch mode
npm run test:watch

# Lint
npm run lint
```

Tests use Vitest with @testing-library/react and jsdom.

## Building

```bash
# Package app (no installer)
npx electron-forge package

# Build distributable (ZIP + DEB)
npx electron-forge make
```

Output lands in `out/`. The `forge.config.ts` configures:
- ASAR packaging
- ZIP maker for all platforms
- DEB maker for Linux with icon and categories

## Adding a New IPC Channel

1. Add the channel name to `IpcChannels` type in `src/shared/types.ts`
2. Add the handler in `src/main/ipc-handlers.ts`
3. Add the bridge method in `src/main/preload.ts`
4. Call it from the renderer via `window.electronAPI.newMethod()`

## Adding a New Component

1. Create the component in the appropriate `src/renderer/components/` subdirectory
2. Export it from the subdirectory's `index.ts`
3. Use existing shared components (Button, GlassCard, Modal, etc.) for consistency
4. Follow the CSS variable system for colors and spacing

## Author

**J. Michaels** -- [GitHub](https://github.com/sanchez314c)
