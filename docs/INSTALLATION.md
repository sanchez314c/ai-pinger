# Installation Guide

## System Requirements

- **Node.js**: 18 or later
- **npm**: 9 or later
- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+, Debian 10+, Fedora 36+)
- **Internet**: Required for OpenRouter.ai API calls
- **OpenRouter API Key**: Get one at [openrouter.ai](https://openrouter.ai)

## Run from Source

### Linux

```bash
git clone https://github.com/sanchez314c/ai-pinger.git
cd ai-pinger
./run-source-linux.sh
```

The run script handles:
- Electron sandbox fix (`kernel.unprivileged_userns_clone=1`)
- Clearing stale Vite cache
- Installing npm dependencies if missing
- Starting Electron Forge dev server with `--no-sandbox`

### macOS

```bash
git clone https://github.com/sanchez314c/ai-pinger.git
cd ai-pinger
./run-source-mac.sh
```

### Windows

```bash
git clone https://github.com/sanchez314c/ai-pinger.git
cd ai-pinger
run-source-windows.bat
```

### Manual Start

```bash
npm install
npx electron-forge start          # macOS/Windows
npx electron-forge start -- --no-sandbox   # Linux
```

## Build Distributable

```bash
# Package without installers
npx electron-forge package

# Build platform installers (ZIP for all, DEB for Linux)
npx electron-forge make
```

Build output goes to `out/` directory.

## API Key Setup

AI Pinger needs an OpenRouter.ai API key. You can provide it three ways:

1. **Settings modal** - Enter it in the app's Settings dialog (stored in `config/settings.json`)
2. **Environment variable** - Set `OPENROUTER_API_KEY` in your shell
3. **Shell config** - Add `export OPENROUTER_API_KEY=sk-or-...` to `~/.bashrc` or `~/.zshrc`

The app auto-detects the key from environment variables and shell config files on startup.

## Linux Notes

Linux requires a few extra things for the frameless transparent window to work:

- **Unprivileged user namespaces**: `sudo sysctl -w kernel.unprivileged_userns_clone=1`
- **No-sandbox flag**: Already included in `run-source-linux.sh`
- **Compositing**: The app adds `enable-transparent-visuals` and `disable-gpu-compositing` flags automatically
- **Startup delay**: 1.5 second delay on Linux for transparent visual initialization

## Troubleshooting

**Grey/blank window on Linux**: Clear the Vite cache (`rm -rf .vite`) and restart. The run script does this automatically.

**Dev server connection refused**: The Vite dev server may take a moment to start. The app retries up to 5 times with 1-second delays.

**Window controls not working**: Make sure you're running with `--no-sandbox` on Linux.

**API key not detected**: Check that `OPENROUTER_API_KEY` is exported (not just set) in your shell config. Use `echo $OPENROUTER_API_KEY` to verify.
