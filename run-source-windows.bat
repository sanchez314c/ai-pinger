@echo off
echo === AI Pinger v1.0.0 — Electron + React + TypeScript ===

cd /d "%~dp0"

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start Electron Forge dev server
npx electron-forge start
