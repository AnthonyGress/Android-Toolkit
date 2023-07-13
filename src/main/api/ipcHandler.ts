import path from 'path';
import { app, ipcMain } from 'electron';
import { LAUNCHER_MANAGER_URL, POWERSHELL_CMD, REVANCED_URL,SMART_TUBE_URL,
    SPOTUBE_URL, TERMINAL_CMD,WOLF_LAUNCHER_URL, APK_PATH, ADB_PATH, MICRO_G_URL, REVANCED_MANAGER_URL, YOUTUBE_URL, REDDIT_URL, REVANCED_REDDIT_URL
} from '../constants';
import { executeCmd, batchInstall } from '../utils';
import { startUpdate } from '../utils/appUpdater';
import { downloadFile } from '../utils/downloadFile';
import { execPromise, spawnShell } from '../utils/executeCmd';

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

        if (args.includes(',')) {

            // adb pair with pairing closed
            const argsArr = args.split(',');
            console.log(argsArr);
            const pairCommand = argsArr[0];
            const pairingCode = argsArr[1];

            spawnShell(pairCommand, event, 'adbResponse', pairingCode);
        }

        switch (args) {
        case 'batchInstall':
            console.log('batchInstall');
            batchInstall(event);
            break;

        case 'smarttube':
            console.log('install smarttube');
            downloadFile(SMART_TUBE_URL, path.join(APK_PATH, 'smartTube.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}smartTube.apk"`);
                event.reply('adbResponse', 'Installed SmartTube');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });
            break;

        case 'spotube':
            console.log('install spotube');
            downloadFile(SPOTUBE_URL, path.join(APK_PATH, 'spotube.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}spotube.apk"`);
                event.reply('adbResponse', 'Installed Spotube');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });
            break;

        case 'launcher manager':
            console.log('launcher manager');
            downloadFile(LAUNCHER_MANAGER_URL, path.join(APK_PATH, 'launcherManager.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}launcherManager.apk"`);
                event.reply('adbResponse', 'Installed Launcher Manager');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });
            break;

        case 'wolf launcher':
            console.log('wolf launcher');
            downloadFile(WOLF_LAUNCHER_URL, path.join(APK_PATH, 'wolfLauncher.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}wolfLauncher.apk"`);
                event.reply('adbResponse', 'Installed Wolf Launcher');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });
            break;

        case 'revanced':
            console.log('install revanced');

            downloadFile(MICRO_G_URL, path.join(APK_PATH, 'microg.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}microg.apk"`);
                event.reply('adbResponse', 'Installed microg (for login), please wait for revanced...');

                downloadFile(REVANCED_URL, path.join(APK_PATH, 'revanced.apk')).then(async () => {
                    await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}revanced.apk"`);
                    event.reply('adbResponse', 'Installed Revanced');
                }).catch((error) => {
                    event.reply('adbResponse', error.message);
                    console.log(error.message);
                });

            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });

            break;

        case 'revanced-reddit':
            console.log('install revanced reddit');

            downloadFile(REVANCED_REDDIT_URL, path.join(APK_PATH, 'revanced-reddit.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}revanced-reddit.apk"`);
                event.reply('adbResponse', 'Installed revanced-reddit');

            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });

            break;

        case 'revanced-manager':
            console.log('revanced');
            downloadFile(REVANCED_MANAGER_URL, path.join(APK_PATH, 'revanced-manager.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}revanced-manager.apk"`);
                event.reply('adbResponse', 'Installed Revanced Manager');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });
            break;

        case 'youtube':
            console.log('youtube');

            downloadFile(YOUTUBE_URL, path.join(APK_PATH, 'youtube.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}youtube.apk"`);
                event.reply('adbResponse', 'Installed Stock Youtube, use Revanced Manager to apply patches');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });

            break;

        case 'microg':
            console.log('microg');

            downloadFile(MICRO_G_URL, path.join(APK_PATH, 'microg.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}microg.apk"`);
                event.reply('adbResponse', 'Installed MicroG');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });

            break;

        case 'reddit':
            console.log('reddit');

            downloadFile(REDDIT_URL, path.join(APK_PATH, 'reddit.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}reddit.apk"`);
                event.reply('adbResponse', 'Installed Stock Reddit, use Revanced Manager to apply patches');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
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

