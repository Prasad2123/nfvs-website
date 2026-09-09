import { contextBridge, ipcRenderer, FileFilter } from 'electron';

export interface ElectronAPI {
  selectDirectory: () => Promise<string | null>;
  selectFile: (filters?: FileFilter[]) => Promise<string | null>;
  openPath: (filePath: string) => Promise<void>;
  getAppDataPath: () => Promise<string>;
  getVersion: () => Promise<string>;
  showNotification: (title: string, body: string) => void;
  print: () => void;
  platform: string;
}

const electronAPI: ElectronAPI = {
  selectDirectory: () => ipcRenderer.invoke('dialog:selectDirectory'),
  selectFile: (filters?: FileFilter[]) => ipcRenderer.invoke('dialog:selectFile', filters),
  openPath: (filePath: string) => ipcRenderer.invoke('fs:openPath', filePath),
  getAppDataPath: () => ipcRenderer.invoke('app:getDataPath'),
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  showNotification: (title: string, body: string) => ipcRenderer.send('notification:show', title, body),
  print: () => ipcRenderer.send('window:print'),
  platform: process.platform,
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
