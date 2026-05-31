// electron/preload.js — contextBridge security layer
// Currently no APIs exposed — all game state in React + localStorage
// Add IPC channels here if file system access is needed later (e.g. exporting scores)
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  version: () => process.versions.electron,
  platform: () => process.platform,
});
