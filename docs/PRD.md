# Product Requirements Document

## Product

**AI Pinger** - Desktop application for testing and comparing AI model responses.

## Problem

When evaluating AI models, you typically have to open multiple browser tabs, paste the same prompt into each one, wait for responses, and manually compare them. This is slow and makes side-by-side comparison difficult.

## Solution

A single desktop app that sends one prompt to multiple AI models at once (via OpenRouter.ai) and shows all responses side-by-side for direct comparison.

## Core Features

### Multi-Model Comparison
- Select any number of models from the OpenRouter.ai catalog
- Send the same prompt to all selected models
- View responses in tabbed panels

### Model Browser
- Searchable, filterable list of all available OpenRouter models
- Shows model name, provider, pricing, and context length
- Click to select/deselect for comparison

### API Key Management
- Auto-detects `OPENROUTER_API_KEY` from environment and shell config files
- Manual entry via Settings modal
- Persisted between sessions in local JSON

### Export
- HTML report with styled prompt/response layout
- JSON export with full structured data (model info, response time, token usage)

### Progress Tracking
- Real-time status for each model during comparison
- Shows pending, running, completed, or error state

## Non-Functional Requirements

### Performance
- Model list cached for 5 minutes to reduce API calls
- Sequential processing to avoid rate limits

### Security
- API keys stored locally only (not transmitted except to OpenRouter.ai)
- `contextIsolation: true`, `nodeIntegration: false`
- External URLs validated (http/https/mailto only)
- HTML export escapes all user content

### Platform Support
- Linux, macOS, Windows
- Built with Electron 33

## Tech Stack

- Electron 33 + React 18 + TypeScript 5.7
- Zustand 5 for state management
- Tailwind CSS 3.4 + custom CSS variables
- Electron Forge 7.6 + Vite for build/packaging
- OpenRouter.ai REST API

## Out of Scope

- Streaming responses
- Conversation history (multi-turn)
- Local model support (Ollama, etc.)
- Cost tracking dashboard
- Model fine-tuning
