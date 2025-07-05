# Contributing to AI Pinger

Thanks for considering contributing to AI Pinger.

## Getting Started

1. Fork the repo on GitHub
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ai-pinger.git`
3. Install dependencies: `npm install`
4. Run from source: `npx electron-forge start -- --no-sandbox`

## Development Setup

You'll need Node.js 18+ and npm. The project uses Electron 33, React 18, and TypeScript 5.7.

```bash
# Install deps
npm install

# Start dev server (Vite on port 54023)
npx electron-forge start -- --no-sandbox

# Run tests
npm test

# Lint
npm run lint
```

## Making Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly (both main process and renderer)
4. Commit with clear messages
5. Push and open a PR

## Code Style

- TypeScript strict mode
- React functional components with hooks
- Zustand for state management
- PascalCase for components (`ModelCard.tsx`)
- kebab-case for services (`settings-service.ts`)
- IPC communication through `contextBridge` only (no direct `ipcRenderer` in renderer)

## Project Structure

- `src/main/` - Electron main process (Node.js)
- `src/main/services/` - Backend services (API, settings, reports)
- `src/renderer/` - React frontend
- `src/shared/` - Shared types and constants
- `config/` - User configuration
- `templates/` - HTML report templates

## Reporting Issues

Use the GitHub issue tracker. Include:
- OS and version
- Steps to reproduce
- Error messages or screenshots
- What you expected vs what happened

## Questions?

Open an issue on GitHub.

## Author

**J. Michaels** -- [GitHub](https://github.com/sanchez314c)
