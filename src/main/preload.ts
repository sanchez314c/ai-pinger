import { contextBridge, ipcRenderer } from 'electron';
import type { AppSettings, AIModel, ComparisonProgress, ModelResponse } from '../shared/types';

const electronAPI = {
  // Models
  getModels: (apiKey: string): Promise<AIModel[]> =>
    ipcRenderer.invoke('models:getAll', apiKey),

  // Comparison
  runComparison: (apiKey: string, modelIds: string[], prompt: string): Promise<ModelResponse[]> =>
    ipcRenderer.invoke('comparison:run', apiKey, modelIds, prompt),

  onComparisonProgress: (callback: (progress: ComparisonProgress) => void) => {
    const handler = (_event: Electron.IpcRendererEvent, progress: ComparisonProgress) => callback(progress);
    ipcRenderer.on('comparison:progress', handler);
    return () => ipcRenderer.removeListener('comparison:progress', handler);
  },

  // Settings
  getSettings: (): Promise<AppSettings> =>
    ipcRenderer.invoke('settings:get'),

  saveSettings: (settings: AppSettings): Promise<void> =>
    ipcRenderer.invoke('settings:save', settings),

  // Export
  exportHtml: (prompt: string, responses: ModelResponse[]): Promise<string | null> =>
    ipcRenderer.invoke('export:html', prompt, responses),

  exportJson: (prompt: string, responses: ModelResponse[]): Promise<string | null> =>
    ipcRenderer.invoke('export:json', prompt, responses),

  // App events
  onOpenSettings: (callback: () => void) => {
    const handler = () => callback();
    ipcRenderer.on('app:openSettings', handler);
    return () => ipcRenderer.removeListener('app:openSettings', handler);
  },

  // Window controls
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

export type ElectronAPI = typeof electronAPI;
