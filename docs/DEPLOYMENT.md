# Deployment

## Distribution Formats

AI Pinger produces two distribution formats via Electron Forge makers:

| Format | Platforms | Maker |
|--------|-----------|-------|
| ZIP | Linux, macOS, Windows | `@electron-forge/maker-zip` |
| DEB | Linux (Debian/Ubuntu) | `@electron-forge/maker-deb` |

## Building for Distribution

```bash
# Build all configured distributables
npx electron-forge make

# Output location: out/make/
```

### DEB Package Details

The DEB package includes:
- **Name**: `ai-pinger`
- **Product Name**: AI Pinger
- **Generic Name**: AI Model Comparison Tool
- **Categories**: Development, Utility
- **Icon**: `./resources/icons/icon.png`

## Release Process

1. Update version in `package.json`
2. Update `APP_VERSION` in `src/shared/constants.ts`
3. Update `CHANGELOG.md` with release notes
4. Build distributables: `npx electron-forge make`
5. Test the packaged app on target platforms
6. Create a GitHub release with the built artifacts from `out/make/`

## Runtime Requirements

End users need:
- **Linux**: Unprivileged user namespaces enabled (`kernel.unprivileged_userns_clone=1`)
- **Internet**: Required for OpenRouter.ai API calls
- **OpenRouter API Key**: From [openrouter.ai](https://openrouter.ai)

The app bundles Chromium and Node.js via Electron, so no separate runtime install is needed.

## Settings Location

- **Development**: `config/settings.json` in the project directory
- **Production (packaged)**: `settings.json` in the Electron `userData` directory
  - Linux: `~/.config/AI Pinger/settings.json`
  - macOS: `~/Library/Application Support/AI Pinger/settings.json`
  - Windows: `%APPDATA%/AI Pinger/settings.json`

## ASAR Packaging

Production builds use ASAR (`asar: true` in `forge.config.ts`). All source files are packed into a single `app.asar` archive inside the output directory.
