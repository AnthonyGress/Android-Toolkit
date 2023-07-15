import path from 'path';
import { app, ipcMain } from 'electron';
import { LAUNCHER_MANAGER_URL, POWERSHELL_CMD, REVANCED_YOUTUBE_URL,SMART_TUBE_URL,
    REVANCED_SPOTIFY_URL, TERMINAL_CMD,WOLF_LAUNCHER_URL, APK_PATH, ADB_PATH, MICRO_G_URL, REVANCED_MANAGER_URL, YOUTUBE_URL, REDDIT_URL, REVANCED_REDDIT_URL, REVANCED_YTMUSIC_URL, REVANCED_TIKTOK_URL, INFINITY_REDDIT_URL, SPOTIFY_MOD_URL
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

        case 'spotify-mod':
            console.log('install spotify-mod');
            downloadFile(SPOTIFY_MOD_URL, path.join(APK_PATH, 'spotify-mod.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}spotify-mod.apk"`);
                event.reply('adbResponse', 'Installed Spotify Mod');
            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });
            break;

        case 'infinity-reddit':
            console.log('install infinity-reddit');
            downloadFile(INFINITY_REDDIT_URL, path.join(APK_PATH, 'infinity-reddit.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}infinity-reddit.apk"`);
                event.reply('adbResponse', 'Installed Infinity Reddit');
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

        case 'revanced-youtube':
            console.log('install revanced');

            downloadFile(MICRO_G_URL, path.join(APK_PATH, 'microg.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}microg.apk"`);
                event.reply('adbResponse', 'Installed microg (for login), please wait for revanced...');

                downloadFile(REVANCED_YOUTUBE_URL, path.join(APK_PATH, 'revanced-youtube.apk')).then(async () => {
                    await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}revanced-youtube.apk"`);
                    event.reply('adbResponse', 'Installed Youtube Revanced');
                }).catch((error) => {
                    event.reply('adbResponse', error.message);
                    console.log(error.message);
                });

            }).catch((error) => {
                event.reply('adbResponse', error.message);
                console.log(error.message);
            });

            break;

        case 'revanced-ytmusic':
            console.log('install ytmusic');

            downloadFile(MICRO_G_URL, path.join(APK_PATH, 'microg.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}microg.apk"`);
                event.reply('adbResponse', 'Installed microg (for login), please wait for revanced...');

                downloadFile(REVANCED_YTMUSIC_URL, path.join(APK_PATH, 'revanced-ytmusic.apk')).then(async () => {
                    await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}revanced-ytmusic.apk"`);
                    event.reply('adbResponse', 'Installed Youtube Music Revanced');
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

        case 'revanced-tiktok':
            console.log('install revanced reddit');

            downloadFile(REVANCED_TIKTOK_URL, path.join(APK_PATH, 'revanced-tiktok.apk')).then(async () => {
                await execPromise(`${ADB_PATH}adb install -r -d "${APK_PATH}revanced-tiktok.apk"`);
                event.reply('adbResponse', 'Installed revanced-tiktok');

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

