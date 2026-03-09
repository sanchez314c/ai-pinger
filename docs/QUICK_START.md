# Quick Start

## 1. Get an API Key

Sign up at [openrouter.ai](https://openrouter.ai) and create an API key.

## 2. Set the Key

Pick one method:

```bash
# Option A: Environment variable (recommended)
export OPENROUTER_API_KEY=sk-or-v1-your-key-here
# Add to ~/.bashrc or ~/.zshrc to persist

# Option B: Enter it in the app's Settings modal after launch
```

## 3. Run the App

```bash
# Linux
git clone https://github.com/sanchez314c/ai-pinger.git
cd ai-pinger
./run-source-linux.sh

# macOS
./run-source-mac.sh

# Manual (any platform)
npm install
npx electron-forge start -- --no-sandbox
```

## 4. Compare Models

1. The sidebar shows all available OpenRouter models. Click to select the ones you want to test.
2. Type your prompt in the main panel.
3. Click **Run Comparison**.
4. Watch progress as each model responds. Results show up in tabs.

## 5. Export Results

After a comparison finishes, you can export:
- **HTML Report**: Styled page with all prompts and responses, ready to share
- **JSON Data**: Raw structured data for processing

Both open a save dialog to pick where the file goes.

## Keyboard Shortcuts

- `Cmd/Ctrl + ,` - Open Settings
- `Cmd/Ctrl + Q` - Quit
- `Cmd/Ctrl + R` - Reload
- `Cmd/Ctrl + Shift + I` - Toggle DevTools
