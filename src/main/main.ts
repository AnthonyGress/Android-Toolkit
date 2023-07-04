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
import fs from 'fs';
import path from 'path';
import MenuBuilder from './menu';
import { app, BrowserWindow, shell } from 'electron';
import { installExtensions, resolveHtmlPath } from './utils';
import { routeHandler } from './api/ipcHandler';
import { MainWindow } from './types';

const userOS = process.platform;
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
let username: string | undefined;
let adbPath: string;
let downloadPathWin: string;
let mainWindow: MainWindow = null;

if (isDevelopment) {
    require('electron-debug')();
}

const setupWinAdb = () => {
    const { exec } = require('child_process');
    username = process.env.USERNAME;

    console.log(username);

    downloadPathWin = `C:\\Users\\${username}\\AppData\\Local\\Programs\\android-toolkit\\resources`;
    const adbPath = `C:\\Users\\${username}\\AppData\\Local\\Programs\\android-toolkit\\platform-tools`;

    console.log('windows setup');

    if (!fs.existsSync(adbPath)) {

        exec(`curl -L https://dl.google.com/android/repository/platform-tools-latest-windows.zip -o ${downloadPathWin}\\platform-tools.zip && tar -xf "${path.join(__dirname, '../../../platform-tools.zip')}`, (error: Error, stdout: string, stderr: Error) => {
            if (mainWindow){
                mainWindow.webContents.send('startup', `stdout: ${stdout}`)
                mainWindow.webContents.send('startup', `stderr: ${stderr}`)
            }

            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
}

const initialize = () => {
    switch(userOS) {
    case 'darwin':
        console.log('MacOS');
        adbPath = '/Applications/"Android Toolkit.app"/Contents/platform-tools/';
        break;
    case 'linux':
        console.log('Linux operating system');
        adbPath = '/usr/bin/Android-Toolkit/platform-tools/';
        break;
    case 'win32':
        console.log('Windows operating system');
        username = process.env.USERNAME;
        console.log(username);

        downloadPathWin = `C:\\Users\\${username}\\AppData\\Local\\Programs\\android-toolkit\\resources`
        adbPath = `C:\\Users\\${username}\\AppData\\Local\\Programs\\android-toolkit\\platform-tools\\`;
        setupWinAdb();

        break;
    default:
        console.log('other operating system');
    }

    routeHandler(adbPath);
}

initialize();

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const createWindow = async () => {
    // if (isDevelopment) {
    //     await installExtensions();
    // }

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
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    // disable auto updates
//   new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the macOS convention of having the application in memory even
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
