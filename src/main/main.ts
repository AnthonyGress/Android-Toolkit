/* eslint global-require: off, no-console: off */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const isWin = process.platform === 'win32';
let username: any;
import fs from 'fs';
let downloadPathWin;

let mainWindow: BrowserWindow | null = null;

export default class AppUpdater {
    constructor() {
        log.transports.file.level = 'info'
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}



ipcMain.on('shellChannel', (event, args) => {
    const command = `${args}`;
    console.log(command);

    const { exec } = require('child_process');
    exec(command, (error: Error, stdout: string, stderr: Error) => {
        if (error) {
            console.log(`error: ${error.message}`);
            event.reply('shellResponse', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            event.reply('shellResponse', `Error: ${stderr}`);
            return;
        }
        if (stdout) {
            console.log(`${stdout}`);
            event.reply('shellResponse', `${stdout}`);
        }
    });
});

// listen for message from renderer
ipcMain.on('adbChannel', async (event, args) => {
    const command = `${adbPath}${args}`;
    console.log(command);

    const { exec } = require('child_process');
    exec(command, (error: Error, stdout: string, stderr: Error) => {
        if (error) {
            console.log(`error: ${error.message}`);
            event.reply('adbResponse', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            event.reply('adbResponse', `Error: ${stderr}`);
            return;
        }
        if (stdout) {
            console.log(`${stdout}`);
            event.reply('adbResponse', `${stdout}`);
        }
    });
});

const userOS = `${process.platform}`;
// const userOS = 'win32';
let adbPath: string;

switch(userOS) {
case 'darwin':
    console.log('MacOS');
    adbPath = '/Applications/Android-Toolkit.app/Contents/platform-tools/';
    break;
case 'linux':
    console.log('Linux operating system');
    adbPath = '/usr/bin/Android-Toolkit/platform-tools/';
    break;
case 'win32':
    console.log('Windows operating system');
    adbPath = `${downloadPathWin}\\platform-tools\\`;
    break;
default:
    console.log('other operating system');
}


// ipcMain.on('ipc-example', async (event, arg) => {
//   const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
//   console.log(msgTemplate(arg));
//   event.reply('ipc-example', msgTemplate('pong'));
// });

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
    require('electron-debug')();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload
        )
        .catch(console.log);
};

const createWindow = async () => {
    if (isDevelopment) {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.webContents.send('startup', `Welcome to Android-Toolkit version ${app.getVersion()}`)

            if (isWin){
                username = process.env.USERNAME;
                downloadPathWin = `C:\\Users\\${username}\\AppData\\Local\\Programs\\Android-Toolkit\\resources`

                const { exec } = require('child_process');
                console.log('windows setup');

                if (!fs.existsSync(downloadPathWin)) {
                    exec(`mkdir ${downloadPathWin} && curl -L https://dl.google.com/android/repository/platform-tools-latest-windows.zip -o ${downloadPathWin}\\platform-tools.zip && tar -xf platform-tools.zip`, (err: string, stdout: string, stderr: string) => {
                        if (mainWindow){
                            mainWindow.webContents.send('startup', `Welcome to Android-Toolkit version ${app.getVersion()}`)
                        }
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                    })
                }

            }
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
//   new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app
    .whenReady()
    .then(() => {
        createWindow();
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow();
        });
    })
    .catch(console.log);
