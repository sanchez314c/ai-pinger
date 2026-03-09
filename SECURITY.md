# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |
| < 1.0   | No        |

## Reporting a Vulnerability

Do NOT open a public GitHub issue for security vulnerabilities.

Email security reports to the maintainer via GitHub. Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

**Response timeline**: Initial response within 48 hours. Target fix within 30 days for critical issues.

## Security Considerations

### API Key Handling
- API keys are stored in local JSON (`config/settings.json` in dev, Electron userData in production)
- Auto-detection reads from `OPENROUTER_API_KEY` env var and shell config files
- Keys are never logged to console or included in reports
- All API communication uses HTTPS only

### Electron Security
- `contextIsolation: true` - renderer cannot access Node.js APIs directly
- `nodeIntegration: false` - no Node.js in renderer process
- `sandbox: false` - disabled for IPC functionality (Linux compatibility)
- External URLs validated against allowlist (`http:`, `https:`, `mailto:` protocols only)
- Preload script exposes a limited `electronAPI` surface via `contextBridge`

### Data Privacy
- Prompts are sent to OpenRouter.ai (third-party service)
- No telemetry or analytics collection
- Exported HTML/JSON reports contain full prompt and response data
- Settings stored locally only

### Input Validation
- HTML report output escapes all user content (prevents XSS in exports)
- External URL opening validates protocol before `shell.openExternal`
- API responses are parsed with error handling for malformed data

## Contact

**J. Michaels** -- [GitHub](https://github.com/sanchez314c)
