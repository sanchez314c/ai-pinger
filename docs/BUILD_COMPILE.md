# Build & Compile

## Prerequisites

- Node.js 18+
- npm 9+

## Development Build

```bash
# Install dependencies
npm install

# Start dev server (Vite on port 54023)
npx electron-forge start -- --no-sandbox

# Or use the run script (Linux)
./run-source-linux.sh
```

The run script clears the `.vite` cache, installs deps if needed, and starts with `--no-sandbox`.

## Production Build

### Package (no installer)

```bash
npx electron-forge package
```

Creates an unpacked app in `out/AI Pinger-linux-x64/` (or equivalent for your platform).

### Build Distributables

```bash
npx electron-forge make
```

Creates platform installers:
- **All platforms**: ZIP archive
- **Linux**: DEB package

Output goes to `out/make/`.

## Build Configuration

### Electron Forge (`forge.config.ts`)

- `asar: true` for production packaging
- Executable name: `ai-pinger`
- Icon: `./resources/icons/icon` (auto-resolves .png/.ico/.icns by platform)

### Vite Configs

Three separate Vite builds:

| Config | Target | Entry |
|--------|--------|-------|
| `vite.main.config.ts` | Node.js (main process) | `src/main/index.ts` |
| `vite.preload.config.ts` | Node.js (preload) | `src/main/preload.ts` |
| `vite.renderer.config.ts` | Browser (renderer) | `src/renderer/index.html` |

### TypeScript (`tsconfig.json`)

Strict mode enabled. Source in `src/`, output handled by Vite.

### Tailwind (`tailwind.config.ts`)

Custom Neo-Noir Glass Monitor color palette, shadow system, and border radius tokens.

## Platform Notes

### Linux

- Requires `kernel.unprivileged_userns_clone=1` for Electron sandbox (or `--no-sandbox` flag)
- Transparent window needs `enable-transparent-visuals` and `disable-gpu-compositing` flags (set automatically in `index.ts`)
- 1.5 second startup delay for transparent visual initialization
- DEB maker sets categories to Development and Utility

### macOS

- No extra flags needed
- Use `./run-source-mac.sh`

### Windows

- No extra flags needed
- Use `run-source-windows.bat` (if available)

## Cleaning Build Artifacts

```bash
# Remove Vite cache
rm -rf .vite

# Remove build output
rm -rf out/

# Full clean reinstall
rm -rf node_modules .vite out
npm install
```
