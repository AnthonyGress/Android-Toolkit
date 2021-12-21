const { contextBridge, ipcRenderer } = require('electron');

// sends message to main
const WINDOW_API = {
  ipAddress: (message) => ipcRenderer.send('ipAddress', message),
  adbCommand: (command) => ipcRenderer.send('adbChannel', command),
};

// listens for messages from main
ipcRenderer.on('adbResponse', (event, arg) => {
  console.log(arg); // logs response from adbConnect
});

// window.api
contextBridge.exposeInMainWorld('api', WINDOW_API);
