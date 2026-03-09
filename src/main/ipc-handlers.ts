import { ipcMain, BrowserWindow, dialog } from 'electron';
import type { AppSettings, ModelResponse } from '../shared/types';
import { getSettings, saveSettings } from './services/settings-service';
import { fetchModels, sendPrompt } from './services/openrouter-client';
import { runPinger } from './services/pinger-service';
import { generateHtmlReport, generateJsonReport } from './services/report-generator';
import { detectApiKey } from './services/api-key-detector';

export function registerIpcHandlers(mainWindow: BrowserWindow): void {
  // ─── Models ─────────────────────────────────────────────
  ipcMain.handle('models:getAll', async (_event, apiKey: string) => {
    return fetchModels(apiKey);
  });

  // ─── Comparison ─────────────────────────────────────────
  ipcMain.handle(
    'comparison:run',
    async (_event, apiKey: string, modelIds: string[], prompt: string) => {
      return runPinger(apiKey, modelIds, prompt, (progress) => {
        mainWindow.webContents.send('comparison:progress', progress);
      });
    }
  );

  // ─── Settings ───────────────────────────────────────────
  ipcMain.handle('settings:get', async () => {
    const settings = getSettings();
    // Auto-detect API key if not set
    if (!settings.api_key) {
      const detectedKey = detectApiKey();
      if (detectedKey) {
        settings.api_key = detectedKey;
        saveSettings(settings);
      }
    }
    return settings;
  });

  ipcMain.handle('settings:save', async (_event, settings: AppSettings) => {
    saveSettings(settings);
  });

  // ─── Export ─────────────────────────────────────────────
  ipcMain.handle(
    'export:html',
    async (_event, prompt: string, responses: ModelResponse[]) => {
      const { filePath } = await dialog.showSaveDialog(mainWindow, {
        title: 'Export HTML Report',
        defaultPath: `ai_pinger_report_${Date.now()}.html`,
        filters: [{ name: 'HTML Files', extensions: ['html'] }],
      });
      if (filePath) {
        generateHtmlReport(filePath, prompt, responses);
        return filePath;
      }
      return null;
    }
  );

  ipcMain.handle(
    'export:json',
    async (_event, prompt: string, responses: ModelResponse[]) => {
      const { filePath } = await dialog.showSaveDialog(mainWindow, {
        title: 'Export JSON Data',
        defaultPath: `ai_pinger_responses_${Date.now()}.json`,
        filters: [{ name: 'JSON Files', extensions: ['json'] }],
      });
      if (filePath) {
        generateJsonReport(filePath, prompt, responses);
        return filePath;
      }
      return null;
    }
  );
}
