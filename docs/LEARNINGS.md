# Learnings

Technical lessons collected during AI Pinger development.

## Electron on Linux

### Transparent Windows

Linux requires `enable-transparent-visuals` and `disable-gpu-compositing` command-line switches set before `app.whenReady()`. Without these, frameless windows render as grey rectangles.

Also need a startup delay (1.5s) after `app.whenReady()` before creating the window, because transparent visuals take time to initialize on Linux.

### Sandbox

Electron's sandbox on Linux requires `kernel.unprivileged_userns_clone=1`. Without it, the app crashes with `credentials.cc: Permission denied`. The `--no-sandbox` flag is a workaround, but it weakens security.

### Vite Dev Server Race

When Electron starts, the Vite dev server may not be ready yet. This causes `ERR_CONNECTION_REFUSED` on the first `loadURL()` call. Fixed with retry logic: 5 attempts with 1-second delays.

### ready-to-show Reliability

The `ready-to-show` event sometimes doesn't fire on Linux with transparent windows. Added a 4-second fallback timeout that force-shows the window.

## IPC Design

### contextBridge is the Way

Using `contextBridge.exposeInMainWorld()` with `contextIsolation: true` and `nodeIntegration: false` is the right approach. It gives the renderer a typed API surface without exposing Node.js internals.

### Sequential vs Parallel Comparison

Initially considered parallel model calls, but OpenRouter rate limits make sequential processing more reliable. One model at a time, progress events for each.

## API Key Detection

### Shell Config Parsing

Regex matching `export OPENROUTER_API_KEY=...` in shell configs works well. Important to grab the LAST match in each file (in case the key was updated and the old export is still there).

### printenv Fallback

`printenv` as a subprocess catches cases where the env var was set by a parent process or login script that the detector's file scan missed.

## CSS Architecture

### CSS Variables vs Tailwind

For a custom design system (Neo-Noir Glass Monitor), CSS custom properties work better than pure Tailwind. The 95+ tokens in `:root` define the complete visual language. Tailwind handles utility layout.

### backdrop-filter

`backdrop-filter: blur()` creates the glass card effect but requires `transparent` backgrounds on parent elements. The chain has to be: transparent body > transparent container > glass card with blur.

## Build System

### Three Vite Configs

Electron Forge's Vite plugin needs separate configs for main, preload, and renderer. Main and preload target Node.js, renderer targets browser. Forgetting to separate these causes "require is not defined" errors.

### ASAR and File Paths

After packaging with ASAR, `process.cwd()` and `__dirname` point inside the ASAR archive. The settings service handles this by using `app.getPath('userData')` in production builds instead of relative paths.
