/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer } = require('electron');
// sends message to main
const WINDOW_API = {
    shellCommand: (command) => ipcRenderer.send('shellChannel', command),
    adbCommand: (command) => ipcRenderer.send('adbChannel', command),
};

const windowLoaded = new Promise((resolve) => {
    window.onload = resolve;
});

// listens for messages from main
ipcRenderer.on('adbResponse', async (event, arg) => {
    // console.log(arg); // logs response from adbConnect
    await windowLoaded;
    // We use regular window.postMessage to transfer the port from the isolated
    // world to the main world.
    window.postMessage(arg, '*');
});

ipcRenderer.on('shellResponse', async (event, arg) => {
    // console.log(arg); // logs response from adbConnect
    await windowLoaded;
    // We use regular window.postMessage to transfer the port from the isolated
    // world to the main world.
    window.postMessage(arg, '*');
});

// window.api
contextBridge.exposeInMainWorld('api', WINDOW_API);
