#!/bin/bash
# AI Pinger v1.0.0 — Electron + React + TypeScript
# Run from source on macOS

set -e
cd "$(dirname "$0")"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start Electron Forge dev server
npx electron-forge start
