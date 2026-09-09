import { app, BrowserWindow, ipcMain, Notification, shell, dialog } from 'electron';
import * as path from 'path';
// @ts-ignore
import { startBackendServer } from '../backend/server';
import { setupIpcHandlers } from './ipc/handlers';

const isDev = process.env.NODE_ENV === 'development';

if (!isDev) {
  process.env.DATABASE_URL = `file:${path.join(app.getPath('userData'), 'hardware-service-pro.db')}`;
}

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  setupIpcHandlers(mainWindow);

  if (isDev) {
    await mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  try {
    if (typeof startBackendServer === 'function') {
      await startBackendServer();
    }
  } catch (error) {
    console.error('Failed to start backend server:', error);
  }

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

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception in main process:', error);
});
