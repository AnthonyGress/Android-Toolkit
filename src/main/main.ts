import 'core-js/stable';
import 'regenerator-runtime/runtime';
import fs from 'fs';
import path from 'path';
import MenuBuilder from './menu';
import { app, BrowserWindow, shell } from 'electron';
import { routeHandler } from './api/ipcHandler';
import { MainWindow } from './types';
import { resolveHtmlPath, checkForUpdates, execPromise } from './utils';
import { ADB_PATH, APK_PATH, IS_WIN, WINDOWS_RESOURCE_PATH } from './constants';
// import AppUpdater from './utils/appUpdater';

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

let mainWindow: MainWindow = null;

if (isDevelopment) {
    require('electron-debug')();
}

const setupWinAdb = () => {
    const { exec } = require('child_process');

    if (!fs.existsSync(ADB_PATH)) {

        exec(`curl -L https://dl.google.com/android/repository/platform-tools-latest-windows.zip -o ${WINDOWS_RESOURCE_PATH}\\platform-tools.zip && tar -xf "${path.join(__dirname, '../../../platform-tools.zip')}`, (_error: Error, stdout: string, stderr: Error) => {
            if (mainWindow){
                mainWindow.webContents.send('startup', `stdout: ${stdout}`);
                mainWindow.webContents.send('startup', `stderr: ${stderr}`);
            }

            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
};

const initialize = () => {
    !fs.existsSync(APK_PATH) && fs.mkdir(APK_PATH, (err) => {
        if (err) console.log(err);
    });

    if (IS_WIN) {
        setupWinAdb();
    }

    routeHandler();
};

initialize();

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const createWindow = async () => {
    // if (isDevelopment) {
    //     await installExtensions()
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

            // start adb server when app starts
            execPromise(`${ADB_PATH}adb start-server`).then(() => {
                console.log('started adb server');
                mainWindow?.webContents.send('startup', 'started adb server');
            });

            checkForUpdates().then((result) => {
                const updateText = result ? '\n Update Available' : '';

                mainWindow?.webContents.send('startup', `Welcome to Android-Toolkit version ${app.getVersion()}${updateText}`);

            });
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
    // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // kill adb server when app closes
    execPromise(`${ADB_PATH}adb kill-server`).then(() => {
        mainWindow?.webContents.send('startup', 'killed adb server');
    });
    console.log('killed adb server');

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
