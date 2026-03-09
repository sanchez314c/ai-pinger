# TODO

## Open Items

- [ ] Add streaming response support (show tokens as they arrive)
- [ ] Add response time chart/graph for visual comparison
- [ ] Add model favorites/pinning for quick access
- [ ] Add prompt history with search
- [ ] Add cost estimation before running comparison
- [ ] Add token count display per response
- [ ] Add copy-to-clipboard button on individual responses
- [ ] Add keyboard shortcut for running comparison
- [ ] Add dark/light theme toggle (currently system-only in practice)

## Potential Improvements

- [ ] Parallel model calls with per-model rate limiting
- [ ] Configurable API timeout per model
- [ ] Model grouping by provider in sidebar
- [ ] Diff view between two model responses
- [ ] Batch prompt testing (multiple prompts in sequence)
- [ ] Export to Markdown format
- [ ] Auto-update via Electron updater

## Technical Debt

- [ ] Add more unit tests for services (openrouter-client, pinger-service)
- [ ] Add E2E tests with Playwright
- [ ] Add ESLint config file (currently using defaults)
- [ ] Consider moving from Tailwind 3 to Tailwind 4
- [ ] Add error boundary components in React

## Completed

- [x] Electron + React + TypeScript rewrite (from Python/CustomTkinter)
- [x] Neo-Noir Glass Monitor design system
- [x] Custom title bar with window controls
- [x] Status bar with model count
- [x] About modal
- [x] API key auto-detection
- [x] HTML and JSON export
- [x] Sequential comparison with progress tracking
- [x] Linux transparent window support
- [x] Vite dev server retry logic
