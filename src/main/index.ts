import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';
import { registerIpcHandlers } from './ipc-handlers';
import { createAppMenu } from './menu';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
try {
  if (require('electron-squirrel-startup')) {
    app.quit();
  }
} catch (_) {
  // electron-squirrel-startup not available (Linux/macOS) — safe to ignore
}

// Linux sandbox fix
app.commandLine.appendSwitch('no-sandbox');

// Linux transparent window support
if (process.platform === 'linux') {
  app.commandLine.appendSwitch('enable-transparent-visuals');
  app.commandLine.appendSwitch('disable-gpu-compositing');
}

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    transparent: true,
    backgroundColor: '#00000000',
    frame: false,
    show: false,
    resizable: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  // Show window when ready to prevent blank flash
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Fallback: force-show after 4s if ready-to-show never fires
  setTimeout(() => {
    if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show();
    }
  }, 4000);

  // Load the renderer with retry logic for dev server race condition
  const loadRenderer = async (retries = 15): Promise<void> => {
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      try {
        await mainWindow!.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
      } catch (err) {
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          return loadRenderer(retries - 1);
        }
        console.error('Failed to load dev server URL after retries:', err);
      }
    } else {
      mainWindow!.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
      );
    }
  };
  loadRenderer();

  // Register IPC handlers
  registerIpcHandlers(mainWindow);

  // Window control IPC handlers
  ipcMain.handle('window-minimize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.minimize();
  });
  ipcMain.handle('window-maximize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMaximized()) mainWindow.unmaximize();
      else mainWindow.maximize();
    }
  });
  ipcMain.handle('window-close', () => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.close();
  });
  ipcMain.handle('open-external', async (_event: Electron.IpcMainInvokeEvent, url: string) => {
    const parsed = new URL(url);
    if (['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
      await shell.openExternal(url);
    }
  });

  // Create application menu
  createAppMenu(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Vite dev server URL declaration for TypeScript
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
