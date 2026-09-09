import { ipcMain, BrowserWindow, dialog, shell, app, Notification } from 'electron';

export function setupIpcHandlers(mainWindow: BrowserWindow) {
  ipcMain.handle('dialog:selectDirectory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });
    
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    return result.filePaths[0];
  });

  ipcMain.handle('dialog:selectFile', async (event, filters) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters,
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    return result.filePaths[0];
  });

  ipcMain.handle('fs:openPath', async (event, filePath: string) => {
    await shell.openPath(filePath);
  });

  ipcMain.handle('app:getDataPath', () => {
    return app.getPath('userData');
  });

  ipcMain.handle('app:getVersion', () => {
    return app.getVersion();
  });

  ipcMain.on('notification:show', (event, title: string, body: string) => {
    if (Notification.isSupported()) {
      new Notification({ title, body }).show();
    }
  });

  ipcMain.on('window:print', () => {
    mainWindow.webContents.print();
  });
}
