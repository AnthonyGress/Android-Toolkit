import path from 'path';
import { app, ipcMain } from 'electron';
import { LAUNCHER_MANAGER_URL, POWERSHELL_CMD, REVANCED_URL,SMART_TUBE_URL,
    SPOTUBE_URL, TERMINAL_CMD,WOLF_LAUNCHER_URL, APK_PATH, ADB_PATH
} from '../constants';
import { executeCmd, batchInstall } from '../utils';
import { startUpdate } from '../utils/appUpdater';
import { downloadFile } from '../utils/downloadFile';
import { execPromise } from '../utils/executeCmd';

export const routeHandler = () => {
    // listen for messages from renderer at these routes

    ipcMain.on('shellChannel', (event, args: string) => {
        let command = args;

        console.log(command);

        switch (command) {
        case 'powershell':
            command = POWERSHELL_CMD;
            executeCmd(command, event, 'shellResponse');
            break;

        case 'terminal':
            command = TERMINAL_CMD;
            executeCmd(command, event, 'shellResponse');
            break;

        case 'update':
            event.reply('shellResponse', 'starting update');
            startUpdate(event).then(() => {
                if (process.platform !== 'win32')
                    event.reply('shellResponse', 'update complete');
            });
            break;

        default:
            executeCmd(command, event, 'shellResponse');
            break;
        }
    });

    ipcMain.on('adbChannel', (event, args: string) => {
        const command = `${ADB_PATH}${args}`;
        console.log(command);

        switch (args) {
        case 'batchInstall':
            console.log('batchInstall');
            batchInstall(event);
            break;

        case 'smarttube':
            console.log('install smarttube');
            downloadFile(SMART_TUBE_URL, path.join(APK_PATH, 'smartTube.apk')).then(async () => {
                try {
                    await execPromise(`${ADB_PATH}adb install -r "${APK_PATH}smartTube.apk"`);
                    event.reply('adbResponse', 'Installed Smart Tube');
                } catch (error: any) {
                    event.reply('adbResponse', error.message);
                }

            });
            break;

        case 'spotube':
            console.log('install spotube');
            downloadFile(SPOTUBE_URL, path.join(APK_PATH, 'spotube.apk')).then(async () => {
                try {
                    await execPromise(`${ADB_PATH}adb install -r "${APK_PATH}spotube.apk"`);
                    event.reply('adbResponse', 'Installed Spotube');
                } catch (error: any) {
                    event.reply('adbResponse', error.message);
                }

            });
            break;

        case 'launcher manager':
            console.log('launcher manager');
            downloadFile(LAUNCHER_MANAGER_URL, path.join(APK_PATH, 'launcherManager.apk')).then(async () => {
                try {
                    await execPromise(`${ADB_PATH}adb install -r "${APK_PATH}launcherManager.apk"`);
                    event.reply('adbResponse', 'Installed Launcher Manager');
                } catch (error: any) {
                    event.reply('adbResponse', error.message);
                }
            });
            break;

        case 'wolf launcher':
            console.log('wolf launcher');
            downloadFile(WOLF_LAUNCHER_URL, path.join(APK_PATH, 'wolfLauncher.apk')).then(async () => {
                try {
                    await execPromise(`${ADB_PATH}adb install -r "${APK_PATH}wolfLauncher.apk"`);
                    event.reply('adbResponse', 'Installed Wolf Launcher');
                } catch (error: any) {
                    event.reply('adbResponse', error.message);
                }
            });
            break;

        case 'revanced':
            console.log('revanced');
            downloadFile(REVANCED_URL, path.join(APK_PATH, 'revanced.apk')).then(async () => {
                try {
                    await execPromise(`${ADB_PATH}adb install -r "${APK_PATH}revanced.apk"`);
                    event.reply('adbResponse', 'Installed Revanced');
                } catch (error: any) {
                    event.reply('adbResponse', error.message);
                }
            });
            break;

        default:
            console.log('default');
            executeCmd(command, event, 'adbResponse');
            break;
        }

    });

    ipcMain.on('communicationChannel', async (event, args) => {
        console.log('hit coms');

        try {
            if (args.includes('restart')){
                event.reply('messageResponse', 'restarting');
                app.relaunch();
                app.exit();
            }
        } catch (error: any) {
            console.log(error);
            event.reply('messageResponse', error.message);
        }
    });
};

