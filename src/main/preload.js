const { contextBridge, ipcRenderer } = require('electron');

// sends message to main
const WINDOW_API = {
    shellCommand: (command) => ipcRenderer.send('shellChannel', command),
    adbCommand: (command) => ipcRenderer.send('adbChannel', command),
    coms: (args) => ipcRenderer.send('communicationChannel', args),
};

const windowLoaded = new Promise((resolve) => {
    window.onload = resolve;
});

ipcRenderer.on('startup', async (event, arg) => {
    await windowLoaded;
    window.postMessage(arg, '*');
});

// listens for messages from main
ipcRenderer.on('adbResponse', async (event, arg) => {
    // console.log(arg); // logs response from adbCommand
    await windowLoaded;
    window.postMessage(arg, '*');
});

ipcRenderer.on('shellResponse', async (event, arg) => {
    // console.log(arg); // logs response from shellCommand
    await windowLoaded;
    window.postMessage(arg, '*');
});

// window.api
contextBridge.exposeInMainWorld('api', WINDOW_API);
