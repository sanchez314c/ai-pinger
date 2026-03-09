# FAQ

## General

**What is AI Pinger?**

A desktop app that sends the same prompt to multiple AI models from OpenRouter.ai and shows the responses side-by-side so you can compare them.

**What API does it use?**

OpenRouter.ai's REST API (`/v1/models` and `/v1/chat/completions`). You need an OpenRouter API key to use the app.

**Is it free?**

The app itself is free and open source (MIT license). You pay for API usage through your OpenRouter.ai account based on which models you query and how many tokens they process.

**What platforms does it run on?**

Linux, macOS, and Windows. Built with Electron 33.

## Setup

**Where do I get an API key?**

Sign up at [openrouter.ai](https://openrouter.ai) and create an API key in your account settings.

**How does the app find my API key?**

Three ways, checked in order:
1. `OPENROUTER_API_KEY` environment variable
2. `export OPENROUTER_API_KEY=...` in `~/.zshrc`, `~/.bashrc`, `~/.bash_profile`, or `~/.profile`
3. `printenv OPENROUTER_API_KEY` subprocess

You can also enter it manually in the Settings modal.

**Why do I see "no models" after entering my key?**

Your key might not have API access enabled, or there's a network issue. Check that `echo $OPENROUTER_API_KEY` returns your key and that you can reach `openrouter.ai`.

## Usage

**Why are models tested one at a time instead of in parallel?**

To avoid rate limiting from OpenRouter.ai. Sequential processing keeps the app reliable without needing complex retry logic.

**What's the model cache?**

The model list is cached in memory for 5 minutes to reduce API calls. If you need fresh data, restart the app.

**Can I export my results?**

Yes. The app supports HTML report export (styled comparison page) and JSON data export (raw structured data). Both use a save dialog to pick the output location.

**Why are free models filtered out?**

The model list excludes models with "free" in the name or ID. This keeps the list focused on paid models with better quality and reliability.

## Troubleshooting

**Grey or blank window on Linux**

Clear the Vite cache and restart: `rm -rf .vite && ./run-source-linux.sh`. The run script does this automatically.

**Window won't move or resize**

On Linux, make sure you're running with `--no-sandbox`. The run script includes this flag.

**Dev server connection refused**

The Vite dev server takes a moment to start. The app retries up to 5 times with 1-second delays. If it still fails, check that port 54023 isn't in use.

**"sandbox not enabled" or credentials.cc error**

Run `sudo sysctl -w kernel.unprivileged_userns_clone=1` or use the `--no-sandbox` flag.
