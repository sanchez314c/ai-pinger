import fs from 'node:fs';
import path from 'node:path';
import { app } from 'electron';
import type { AppSettings } from '../../shared/types';
import { DEFAULT_SETTINGS, SETTINGS_FILE } from '../../shared/constants';

function getSettingsPath(): string {
  // In development, use project config/settings.json
  // In production, use app user data
  const isDev = !app.isPackaged;
  if (isDev) {
    return path.join(process.cwd(), SETTINGS_FILE);
  }
  return path.join(app.getPath('userData'), 'settings.json');
}

export function getSettings(): AppSettings {
  const settingsPath = getSettingsPath();
  try {
    if (fs.existsSync(settingsPath)) {
      const raw = fs.readFileSync(settingsPath, 'utf-8');
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (err) {
    console.error('Failed to read settings:', err);
  }
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: AppSettings): void {
  const settingsPath = getSettingsPath();
  try {
    const dir = path.dirname(settingsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save settings:', err);
    throw err;
  }
}
