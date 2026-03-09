# AI Pinger - Version Map

## Overview

This repository contains AI Pinger, a desktop app for testing and comparing AI models from OpenRouter.ai side-by-side.

## Current Version

**v1.0.0** - Active version at project root.

## Version History

| Version | Status | Location | Description |
|---------|--------|----------|-------------|
| 1.0.0 | **Active** | `/` (root) | Electron + React + TypeScript app with Neo-Noir Glass Monitor UI |
| 0.0.3 | Legacy | `legacy/v0.0.3/` | Python GUI with vendored CustomTkinter |
| 0.0.2 | Legacy | `legacy/v0.0.2/` | Python GUI bug fixes |
| 0.0.1 | Legacy | `legacy/v0.0.1/` | Python CLI release |
| python-v0.0.1 | Legacy | `legacy/python-v0.0.1/` | Original Python CLI implementation |

## Technology Stack (Current)

- **Runtime**: Electron 33
- **Frontend**: React 18 + TypeScript 5.7
- **State**: Zustand 5
- **Styling**: Tailwind CSS 3.4 + CSS custom properties
- **Build**: Electron Forge 7.6 + Vite
- **API**: OpenRouter.ai REST API

## Structural Changes

**2026-03-07**: Documentation standardization (repo-docs pipeline)
- Moved old Python-era docs from `docs/dev/` to pre-trash
- Created 15 standard docs files with Electron/TypeScript content
- Updated VERSION_MAP.md to reflect current tech stack

**2026-02-07**: Repository restructured for compliance
- Flattened version folder structure, active version (v1.0.0) now at root
- Legacy versions (v0.0.1, v0.0.2, v0.0.3) moved to `legacy/` (gitignored)
- All standard files now at project root
- Added run-source scripts, AGENTS.md, archive folder

**2026-01-22**: Repository standardized
- Consolidated duplicate versions
- Archived duplicates to Pre-Trash

---

*Last updated: 2026-03-07*
