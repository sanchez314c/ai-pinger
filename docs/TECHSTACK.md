# Tech Stack

## Runtime

| Component | Version | Purpose |
|-----------|---------|---------|
| Electron | 33 | Desktop app framework (Chromium + Node.js) |
| Node.js | 18+ | Main process runtime |
| Chromium | (bundled) | Renderer process runtime |

## Frontend

| Component | Version | Purpose |
|-----------|---------|---------|
| React | 18 | UI component framework |
| TypeScript | 5.7 | Type safety across main and renderer |
| Zustand | 5 | Lightweight state management |
| Tailwind CSS | 3.4 | Utility-first CSS framework |
| PostCSS | 8.4 | CSS processing pipeline |
| Autoprefixer | 10.4 | Vendor prefix automation |

## Build System

| Component | Version | Purpose |
|-----------|---------|---------|
| Electron Forge | 7.6 | Build orchestration, packaging, making |
| Vite | (via plugin) | Fast bundling for main, preload, and renderer |
| @vitejs/plugin-react | 4.3 | React JSX/TSX support in Vite |

## Packaging

| Maker | Platforms | Output |
|-------|-----------|--------|
| `@electron-forge/maker-zip` | Linux, macOS, Windows | ZIP archive |
| `@electron-forge/maker-deb` | Linux | DEB package |

## Testing

| Component | Version | Purpose |
|-----------|---------|---------|
| Vitest | 2 | Test runner (Vite-native) |
| @testing-library/react | 16 | React component testing |
| @testing-library/jest-dom | 6 | DOM assertion matchers |
| jsdom | 25 | Browser environment for tests |

## External API

| Service | Endpoint | Purpose |
|---------|----------|---------|
| OpenRouter.ai | `https://openrouter.ai/api/v1/models` | Fetch available AI models |
| OpenRouter.ai | `https://openrouter.ai/api/v1/chat/completions` | Send prompts to models |

## Design System

**Neo-Noir Glass Monitor** with:
- 95+ CSS custom properties in `:root`
- Teal (#14b8a6) primary accent
- Dark void background (#0a0b0e)
- Glassmorphism with `backdrop-filter: blur()`
- Frameless transparent Electron window with 16px body padding
- Custom title bar, status bar, about modal

## Key Architecture Decisions

- **Zustand over Redux**: Simpler API, less boilerplate, fits the app's scale
- **Vite over Webpack**: Faster dev server and HMR, native ESM support
- **Sequential comparison**: Models tested one at a time to avoid OpenRouter rate limits
- **contextBridge**: All IPC goes through typed preload bridge, no `nodeIntegration` in renderer
- **CSS variables over Tailwind-only**: Design tokens in CSS variables for the custom design system, Tailwind for utility classes
