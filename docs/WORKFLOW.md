# Workflow

## Development Workflow

### Starting a Dev Session

```bash
cd /path/to/ai-pinger
./run-source-linux.sh
```

This clears the Vite cache, installs deps if needed, and starts Electron Forge with hot reload. The Vite dev server runs on port 54023.

### Making Changes

**Renderer changes** (React components, styles, hooks, stores): Hot Module Replacement picks these up automatically. Save the file, see the update in the app.

**Main process changes** (index.ts, ipc-handlers.ts, services): Requires a full restart. Stop the dev server (Ctrl+C) and re-run.

**Preload changes**: Also requires a full restart.

### Adding a New Feature

1. Define types in `src/shared/types.ts` if needed
2. Add IPC handler in `src/main/ipc-handlers.ts`
3. Add bridge method in `src/main/preload.ts`
4. Create React components in the appropriate `src/renderer/components/` subdirectory
5. Wire up state in Zustand stores if needed
6. Export components from the subdirectory's `index.ts`

### Adding a New IPC Channel

1. Add channel name to `IpcChannels` type in `src/shared/types.ts`
2. Register handler in `src/main/ipc-handlers.ts` with `ipcMain.handle()`
3. Add typed bridge method in `src/main/preload.ts`
4. Call from renderer via `window.electronAPI.newMethod()`

## Testing Workflow

```bash
# Run all tests
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# Lint TypeScript
npm run lint
```

Tests use Vitest with jsdom for browser environment simulation and @testing-library/react for component testing.

## Build Workflow

```bash
# Package without installer (for testing)
npx electron-forge package

# Build distributable (ZIP + DEB)
npx electron-forge make
```

The build pipeline:
1. Vite compiles main process TypeScript to JS
2. Vite compiles preload script
3. Vite bundles renderer (React + Tailwind + CSS)
4. Electron Forge packages everything with ASAR
5. Makers produce platform-specific distributables

## Release Workflow

1. Bump version in `package.json` and `src/shared/constants.ts`
2. Update `CHANGELOG.md`
3. Build: `npx electron-forge make`
4. Test the built package on target platforms
5. Create GitHub release with artifacts from `out/make/`

## Git Workflow

- Feature branches off `main`
- PR for review before merge
- Keep commits focused and descriptive
- Update `CHANGELOG.md` with notable changes
