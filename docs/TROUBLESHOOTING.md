# Troubleshooting

## Linux Issues

### Grey or Blank Window

**Cause**: Stale Vite cache or missing transparent visual support.

**Fix**: Clear the cache and restart.
```bash
rm -rf .vite
./run-source-linux.sh
```

The `run-source-linux.sh` script handles this automatically.

### credentials.cc Permission Denied / Sandbox Error

**Cause**: Electron requires unprivileged user namespaces for its sandbox.

**Fix**:
```bash
sudo sysctl -w kernel.unprivileged_userns_clone=1
```

Or run with `--no-sandbox` (the run script does this).

### Window Not Transparent

**Cause**: Linux compositor not supporting transparent visuals.

**Fix**: The app sets `enable-transparent-visuals` and `disable-gpu-compositing` flags automatically. If transparency still doesn't work, your window manager may not support it. The app still functions, but the floating glass panel effect won't show.

### Window Controls Not Working

**Cause**: The window is frameless and uses custom IPC-based controls. They need `--no-sandbox` on Linux.

**Fix**: Use `./run-source-linux.sh` or add `-- --no-sandbox` when starting manually.

## API Issues

### "Failed to fetch models" Error

**Possible causes**:
- Invalid or expired API key
- No internet connection
- OpenRouter.ai service down

**Fix**: Check your key with curl:
```bash
curl -s -H "Authorization: Bearer $OPENROUTER_API_KEY" \
     https://openrouter.ai/api/v1/models | head -c 200
```

### API Key Not Detected

**Cause**: The key isn't exported or is set in a file the detector doesn't check.

**Fix**: Make sure it's exported (not just set):
```bash
# Wrong - just sets, not exported
OPENROUTER_API_KEY=sk-or-...

# Right - exported
export OPENROUTER_API_KEY=sk-or-...
```

Verify: `echo $OPENROUTER_API_KEY`

### Slow Model Responses

**Cause**: Some models (especially large ones) take 10-30+ seconds to respond. This is normal.

**Fix**: The app shows real-time progress for each model. Patience is the fix here.

## Build Issues

### npm install Fails

**Fix**: Make sure you have Node.js 18+ and npm 9+:
```bash
node -v   # Should be 18+
npm -v    # Should be 9+
```

### electron-forge make Fails

**Common causes**:
- Missing build tools (Linux: `build-essential`, `fakeroot`, `dpkg-dev` for DEB)
- Wrong Node.js version

### Vite Dev Server Port Conflict

**Cause**: Port 54023 already in use.

**Fix**: Kill the process using it:
```bash
lsof -i :54023
kill <PID>
```

## General

### Settings Not Saving

**Cause**: The `config/` directory doesn't exist or has wrong permissions.

**Fix**:
```bash
mkdir -p config
chmod 755 config
```

### App Shows "No Models Selected"

**Fix**: Click models in the sidebar to select them. Selected models get a teal highlight border. Then enter a prompt and click the Run button.
