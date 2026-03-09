#!/bin/bash
# AI Pinger — Electron + React + TypeScript
# Run from source on Linux (Port 54023)

set -e
cd "$(dirname "$0")"

# Fix Electron sandbox on Linux
sudo sysctl -w kernel.unprivileged_userns_clone=1 2>/dev/null || true

# Free up port if occupied
lsof -ti:54023 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 0.3

# Clean stale Vite cache to prevent ERR_CONNECTION_REFUSED
rm -rf .vite 2>/dev/null

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting AI Pinger on port 54023..."

# Start Electron Forge dev server
npx electron-forge start -- --no-sandbox
