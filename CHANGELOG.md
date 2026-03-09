# Changelog

All notable changes to AI Pinger will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Forensic Audit Remediation (repo-audit pipeline) - 2026-03-08 20:30 CST

Full Phase 2 forensic code quality audit with automatic remediation of all CRITICAL and HIGH findings.

#### Fixed (CRITICAL)
- **C1**: Replaced all 3 stale GitHub Actions workflows (Python/PyInstaller) with Node.js/Electron Forge equivalents
- **C2**: Updated CSP `connect-src` in both HTML entry files from port 4827 to 54023
- **C3**: Fixed race condition in comparison store — added `isRunning` guard, reordered listener registration
- **C4**: Added `exportError` state to comparison store — export failures now surface to UI

#### Fixed (HIGH)
- **H2**: Added `window.electronAPI` null guards to app-store (loadSettings, saveSettings, loadModels)
- **H3**: Fixed ResponseTabs useEffect dependency loop — removed `activeTab` from deps array
- **H5**: Rewrote `templates/report_template.html` from light theme to Neo-Noir dark theme

#### Fixed (LOW)
- **L1**: Moved orphaned `resources/static/styles.css` to AI-Pre-Trash
- **L3**: Changed `err: any` to `err: unknown` with proper `instanceof Error` checks in both stores

#### Created
- `AUDIT_REPORT.md` — Full forensic analysis with 25 findings across 6 severity levels

### Repository Compliance Audit (repo-prep pipeline) - 2026-03-08 20:09 CST

Full repo-prep Phase 1 compliance audit and fix execution.

#### Fixed
- `package.json` author updated from "RTG" to "J. Michaels"
- Vite dev server port randomized: 4827 → 54023 (high port range)
- Updated port references across 10 documentation files
- `AGENTS.md` synced from `CLAUDE.md` (were out of sync)
- Archive backups renamed to timestamp-only format (`YYYYMMDD_HHMMSS.zip`)

#### Created
- `.nvmrc` (Node 20 LTS)
- `tests/.gitkeep`
- `archive/20260308_200955.tar.gz` (pre-fix backup)

#### Renamed (archive/)
- `ai-pinger_20260207_011255.zip` → `20260207_011255.zip`
- `ai-pinger-pre-restyle-20260221_141052.zip` → `20260221_141052.zip`

### Documentation Verification Pass (repo-docs pipeline) - 2026-03-08 CST

Full 27-file documentation audit and verification against source code.

#### Verified
- All 27 standard documentation files present and accurate
- IPC channel documentation matches actual handlers in `ipc-handlers.ts` and `preload.ts`
- Tech stack references (Electron 33, React 18, TypeScript 5.7, Zustand 5, Tailwind 3.4) correct across all docs
- File paths and project structure descriptions match actual codebase
- Author metadata (J. Michaels / sanchez314c) consistent across LICENSE, README, CONTRIBUTING
- Design system documentation (Neo-Noir Glass Monitor) matches `globals.css` and `design-tokens.ts`

#### Noted (out of scope)
- `.github/workflows/*.yml` (3 files) still reference legacy Python stack (PyInstaller, pytest, flake8) — not part of 27-file standard but should be updated or removed in a future pass

### Documentation Standardization Pass 3 (repo-docs pipeline) - 2026-03-07 23:51 CST

Full 27-file documentation standardization. All docs now reflect the actual Electron + React + TypeScript codebase.

#### Created (new docs/ files with Electron/TypeScript content)
- `docs/API.md` - IPC API reference, OpenRouter REST API, data types
- `docs/BUILD_COMPILE.md` - Build commands, Vite configs, platform notes
- `docs/DEPLOYMENT.md` - Distribution formats, release process, settings locations
- `docs/FAQ.md` - Common questions about setup, usage, troubleshooting
- `docs/TROUBLESHOOTING.md` - Linux issues, API errors, build failures
- `docs/TECHSTACK.md` - Full technology inventory with versions
- `docs/WORKFLOW.md` - Development, testing, build, release workflows
- `docs/QUICK_START.md` - 5-step getting started guide
- `docs/LEARNINGS.md` - Technical lessons from Electron development
- `docs/PRD.md` - Product requirements document
- `docs/TODO.md` - Open items and technical debt tracker

#### Updated
- `docs/README.md` - Updated index to reference all 15 docs files (was 3, now 14 + itself)
- `VERSION_MAP.md` - Corrected tech stack from Python to Electron/React/TypeScript

#### Moved to Pre-Trash
- `docs/dev/` (13 files) - Old Python-era docs: AGENT.md, API.md, BUILD_COMPILE.md, DEPLOYMENT.md, DOCUMENTATION_INDEX.md, FAQ.md, LEARNINGS.md, PRD.md, QUICK_START.md, TECHSTACK.md, TODO.md, TROUBLESHOOTING.md, WORKFLOW.md

### Documentation Standardization Pass 2 - 2026-03-07

#### Created
- `docs/README.md` — documentation index linking all docs (was missing)

#### Fixed
- `.github/ISSUE_TEMPLATE/bug_report.md` — removed Python/pip/CLI references, updated for Node.js/Electron context
- `.github/PULL_REQUEST_TEMPLATE.md` — removed database/cache/feature-flag items irrelevant to this project, streamlined for Electron desktop app

#### Archived
- `.github/CODE_OF_CONDUCT.md` — duplicate of root `CODE_OF_CONDUCT.md` with stale "[INSERT CONTACT METHOD]" placeholder

### Documentation Standardization - 2026-03-07

Standardized all documentation to the 15-file portfolio standard with content rewritten to reflect the actual current tech stack (Electron + React + TypeScript).

#### Added
- `CODE_OF_CONDUCT.md` at project root (moved from `.github/`)

#### Changed
- `README.md` - Complete rewrite reflecting Electron/React/TypeScript stack, accurate project structure, correct badges
- `CLAUDE.md` - Rewritten with current architecture (IPC channels, Zustand stores, design system, dev port)
- `AGENTS.md` - Rewritten as quick-reference agent guide with source layout table, IPC channel reference
- `CONTRIBUTING.md` - Updated for Node.js/npm workflow, removed Python/PEP8 references
- `SECURITY.md` - Rewritten with Electron security model (contextIsolation, preload, URL validation)
- `LICENSE` - Updated copyright to "Jason Paul Michaels"
- `docs/ARCHITECTURE.md` - Complete rewrite with actual Electron multi-process architecture, IPC flow, component hierarchy
- `docs/INSTALLATION.md` - Rewritten for npm/Electron Forge workflow, Linux-specific notes
- `docs/DEVELOPMENT.md` - Rewritten with TypeScript project structure, Vite build pipeline, testing with Vitest

#### Moved
- `.github/CODE_OF_CONDUCT.md` -> `CODE_OF_CONDUCT.md` (root)
- 13 non-standard docs to `docs/dev/` (AGENT.md, API.md, BUILD_COMPILE.md, DEPLOYMENT.md, DOCUMENTATION_INDEX.md, FAQ.md, LEARNINGS.md, PRD.md, QUICK_START.md, TECHSTACK.md, TODO.md, TROUBLESHOOTING.md, WORKFLOW.md)

#### Removed (duplicates moved to pre-trash)
- `docs/CODE_OF_CONDUCT.md` (duplicate of root)
- `docs/SECURITY.md` (duplicate of root)
- `docs/CONTRIBUTING.md` (duplicate of root)
- `docs/CHANGELOG.md` (duplicate of root)

### Final Screenshot & Skill Update - 2026-02-21 16:47 CST
- Updated UI skill file with Rule 13: Invisible but draggable scrollbars
- Captured final screenshot and replaced `resources/screenshots/AIPinger.png`

### Neo-Noir Glass Monitor — Visual Fidelity Fix - 2026-02-21 16:30 CST

Corrected all visual gaps between AI Pinger and the Ollama Wrangler gold standard.

#### Fixed
- **Shadow system**: Replaced over-engineered layered shadows with exact Ollama values (single high-opacity 0.4-0.65)
- **Card borders**: Changed from `var(--border-subtle)` (invisible dark) to `var(--glass-border)` (rgba white shimmer)
- **Model items**: Converted flat rows to glass mini-cards with `glass-bg`, `glass-border`, `backdrop-filter: blur(4px)`, proper `margin-bottom: 6px` spacing
- **Buttons**: Removed broken `@apply` directives, rewrote as plain CSS. Primary button now shows proper teal gradient fill
- **Window drag**: Added `body { -webkit-app-region: drag }` + `.app-container { no-drag }` for full window draggability
- **Window resize**: Added explicit `resizable: true` to BrowserWindow options
- **Title bar spacing**: Increased gap between Settings icon and Minimize button from 10px to 16px
- **Sidebar**: Now uses `.sidebar` CSS class matching Ollama Wrangler structure
- **Main panel padding**: Increased to 24px matching Ollama dashboard spacing
- **Input fields**: Proper focus ring with `0 0 0 3px var(--accent-teal-dim)` box-shadow

#### Updated Skill File (`~/.claude/commands/ui-dark-neo-glass.md`)
- Added Rule 6: Glass-border NOT border-subtle on cards
- Added Rule 11: Plain CSS only — no @apply
- Added Rule 12: 16px title bar icon spacing
- Fixed Rule 3: Correct shadow values from Ollama gold standard
- Fixed Rule 5: Added window drag + resize requirements
- Added list-item glass treatment to DO NOT section

### Neo-Noir Glass Monitor Design System — Full Restyle - 2026-02-21 14:30 CST

Complete restyle to the canonical Neo-Noir Glass Monitor design system, matching the Ollama Wrangler gold standard. All UI chrome now uses the standardized title bar, status bar, about modal, and floating glass panel architecture.

#### Added
- **TitleBar component** (`src/renderer/components/layout/TitleBar.tsx`): Canonical title bar with app icon, teal app name, muted tagline, flat action icons (About + Settings), and circular window controls (minimize/maximize/close)
- **StatusBar component** (`src/renderer/components/layout/StatusBar.tsx`): Footer with green status dot + model count (left), version-only (right)
- **AboutModal component** (`src/renderer/components/layout/AboutModal.tsx`): Full about modal with icon, name, version, description, GitHub badge, email link
- **IPC window controls**: `window-minimize`, `window-maximize`, `window-close`, `open-external` handlers in main process + preload bridge
- **Vite dev server retry logic**: 5 retries with 1s delay for ERR_CONNECTION_REFUSED race condition
- **Title bar icon** (`src/renderer/icon-titlebar.png`)
- **Vite env declarations** (`src/renderer/vite-env.d.ts`) for image imports

#### Changed
- **globals.css**: Complete CSS rewrite — layered shadow system, title bar styles, status bar styles, about modal styles, glass card `::before` highlights, hover lift effects, proper `.app-body` flex layout
- **App.tsx**: Rewritten — removed standalone close button, added TitleBar/StatusBar/AboutModal integration with state management
- **Sidebar.tsx**: Removed logo section (icon + app name), nav items start at top with margin-top: 4px
- **MainPanel.tsx**: Removed drag region (title bar handles window drag)
- **main/index.ts**: Added `disable-gpu-compositing` Linux flag, `hasShadow: false`, 1500ms Linux delay, URL retry logic
- **main/preload.ts**: Added `windowMinimize`, `windowMaximize`, `windowClose`, `openExternal` to contextBridge
- **run-source-linux.sh**: Added `.vite` cache cleanup before launch

#### Design System Compliance
- ✅ Title bar with two-group icon layout (flat actions + circular controls)
- ✅ Status bar with status/count left, version-only right
- ✅ About modal with full project metadata
- ✅ No rainbow strip
- ✅ No sidebar logo
- ✅ Layered shadow system (2+ layers on all elevated elements)
- ✅ Teal (#14b8a6) accent throughout
- ✅ Glass card `::before` inner highlight edges
- ✅ Dark void background with floating panel effect

### Linux Renderer Fix — Grey Screen on Launch - 2026-02-07 03:45 EST

Resolved critical rendering issue where Electron window displayed a solid grey background with no visible UI on Linux.

#### Root Cause
The BrowserWindow was configured with `frame: false` but without `transparent: true` or `enable-transparent-visuals`, causing Linux compositors to render the frameless window as a grey rectangle. The Neo-Noir floating glass panel design requires transparent window support.

#### Fixed
- **Electron Main Process** (`src/main/index.ts`):
  - Added `transparent: true` and `backgroundColor: '#00000000'` for proper transparent window
  - Added `enable-transparent-visuals` command-line switch (required for Linux)
  - Added 300ms post-ready delay on Linux for transparent visual initialization
  - Added `hasShadow: true` for window depth
  - Added 4-second fallback timeout in case `ready-to-show` event never fires
  - Moved `no-sandbox` and `enable-transparent-visuals` switches before `app.whenReady()`
- **HTML Entry** (`index.html`):
  - Added inline fallback styles on `<html>`, `<body>`, and `#root` for CSS-load-failure resilience
  - Set `background: transparent` inline to prevent white/grey flash before CSS loads
  - Added `padding: 16px` for floating glass panel margin
- **Global CSS** (`src/renderer/styles/globals.css`):
  - Changed `html, body` background from `var(--bg-void)` to `transparent` (window transparency)
  - Added `padding: 16px` on `body` for the floating panel effect
  - Updated `.app-container` with visible border (`var(--border-subtle)`) and deep shadow
  - Fixed `.loading-overlay` positioning to use `inset: 0` instead of `16px` offsets

### Neo-Noir Glass Monitor Restyle - 2026-02-07 02:46 EST

Complete visual transformation to the Neo-Noir Glass Monitor design system, matching the Ollama Wrangler cyberpunk-inspired dark dashboard aesthetic.

#### Changed
- **Electron Window**: Frameless, transparent window with `hasShadow: false` and `experimentalFeatures: true` for backdrop-filter support
- **Body Padding**: 16px transparent gap around app container for floating glass panel effect
- **App Container**: Rounded 20px corners with `linear-gradient(160deg, #0a0b0e, #0f1012)` background
- **Color System**: Complete palette replacement — 95+ CSS custom properties in `:root`
  - Primary accent: Blue (#4f46e5) → Teal (#14b8a6)
  - Secondary accent: Cyan Blue (#06b6d4)
  - Tertiary accent: Purple (#8b5cf6)
  - Background: Void Black (#0a0b0e), Surface (#111214), Card (#141518)
  - Text hierarchy: Heading (#f4f4f7), Primary (#e8e8ec), Secondary (#9a9aa6), Muted (#5c5c6a), Dim (#44444e)
- **Sidebar**: Width reduced from 320px to 220px, gradient sidebar background, teal-accented logo badge, uppercase section labels
- **Buttons**: Three-tier system — Primary (teal gradient with hover lift), Secondary (glass highlight), Danger (red outlined)
- **Inputs**: Dark background (#18191c) with teal focus glow, rounded 10px corners
- **Cards**: Glassmorphism with gradient backgrounds, 14px border-radius, backdrop-filter blur
- **Tabs**: Teal active indicator, muted inactive text
- **Tags/Badges**: Added teal and purple variants, default changed from blue to teal
- **Spinner**: Teal accent instead of blue
- **Toast Notifications**: Gradient-based notification system with success/error/info/warning variants, slide-in animation, icon badges
- **Modal**: Dark modal backdrop with blur, enhanced glass card styling
- **Scrollbars**: 6px thin, dark thumb (#2a2a32) on transparent track
- **Shadows**: Deep, high-opacity shadows (0.4-0.65) for dark theme visibility
- **Window Close Button**: Fixed top-right, glass highlight background, red hover state
- **Selection**: Teal-tinted selection highlight
- **Border Radius**: Generous rounding — Cards 14px, Buttons 10px, Inputs 10px, Pills 9999px

#### Files Modified (26 files)
- `src/renderer/styles/design-tokens.ts` — Complete token system replacement
- `tailwind.config.ts` — Neo-Noir color palette, shadows, radius, transitions
- `src/renderer/styles/globals.css` — Full CSS rewrite with 95+ CSS variables, all component classes
- `src/main/index.ts` — Frameless transparent Electron window
- `src/renderer/index.html` — Updated body classes
- `src/renderer/App.tsx` — Added window close button
- `src/renderer/components/layout/AppLayout.tsx` — App container class
- `src/renderer/components/layout/Sidebar.tsx` — 220px gradient sidebar with logo
- `src/renderer/components/layout/MainPanel.tsx` — Void background, subtle borders
- `src/renderer/components/models/ModelCard.tsx` — Teal selection accent
- `src/renderer/components/models/ModelList.tsx` — Updated state colors
- `src/renderer/components/models/ModelControls.tsx` — Teal accent links
- `src/renderer/components/prompt/PromptInput.tsx` — Label color update
- `src/renderer/components/prompt/ActionButtons.tsx` — Muted text colors
- `src/renderer/components/responses/ResponseTabs.tsx` — Teal progress indicators
- `src/renderer/components/responses/ResponsePanel.tsx` — Header and content colors
- `src/renderer/components/responses/WelcomeTab.tsx` — Teal accent highlights
- `src/renderer/components/settings/SettingsModal.tsx` — Teal accent links
- `src/renderer/components/shared/Button.tsx` — (Uses CSS classes, no change needed)
- `src/renderer/components/shared/GlassCard.tsx` — (Uses CSS classes, no change needed)
- `src/renderer/components/shared/Input.tsx` — Label color via CSS var
- `src/renderer/components/shared/Modal.tsx` — Dark backdrop with blur
- `src/renderer/components/shared/Tabs.tsx` — Teal active states
- `src/renderer/components/shared/Tag.tsx` — Added teal/purple variants
- `src/renderer/components/shared/Spinner.tsx` — Teal accent color
- `src/renderer/components/shared/Toast.tsx` — Gradient notification system

### Repository Compliance Audit - 2026-02-07 01:13 CST

#### Structure (CRITICAL FIX)
- Flattened version folder anti-pattern: moved v1.0.0 contents to project root
- Moved legacy versions (v0.0.1, v0.0.2, v0.0.3) to `legacy/` directory (gitignored)
- Source code, configs, and docs now at repository root level

#### Added
- `run-source-linux.sh` at project root
- `run-source-mac.sh` at project root
- `run-source-windows.bat` at project root
- `AGENTS.md` (synced copy of CLAUDE.md)
- `.python-version` (3.11)
- `archive/` directory with timestamped backup
- `.gitkeep` files in protected empty directories
- `legacy/` and `archive/` patterns to `.gitignore`

#### Fixed
- `pyproject.toml`: Author updated from "AI Pinger Team" to "J. Michaels"
- `LICENSE`: Copyright updated from "AI Pinger" to "J. Michaels", year to 2026
- `README.md`: Updated to reflect flat project structure, added author info
- `VERSION_MAP.md`: Updated paths to reflect new structure

#### Previous Unreleased
- Repository standardization with universal folder structure
- Enhanced testing framework with unit, integration, and e2e tests
- Improved documentation system
- Standardized development workflow and quality assurance

## [1.0.0] - 2024-08-23

### Added
- Initial GUI implementation using CustomTkinter
- OpenRouter.ai API integration
- Side-by-side model comparison
- HTML report generation
- JSON export functionality
- Cross-platform build system
- Settings management
- Theme support (light/dark/system)

### Changed
- Complete transformation from CLI-only to GUI application
- Modernized project structure
- Enhanced error handling
- Improved user experience

### Fixed
- API timeout handling
- Memory management in GUI
- Cross-platform compatibility issues

## [0.9.0] - 2024-07-15

### Added
- CLI version with basic functionality
- OpenRouter.ai integration
- Basic report generation
- Configuration management

### Changed
- Initial project structure
- Core API client implementation

## [0.1.0] - 2024-06-01

### Added
- Project initialization
- Basic concept implementation
- Initial documentation

---

## Version History

### Version Format
We use semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Cadence
- **Major releases**: As needed for significant changes
- **Minor releases**: Monthly or when features are ready
- **Patch releases**: As needed for bug fixes

### Support Policy
- **Current major version**: Full support
- **Previous major version**: Security patches only
- **Older versions**: No support

---

For detailed release notes and migration guides, see the [Releases page](https://github.com/sanchez314c/ai-pinger/releases).