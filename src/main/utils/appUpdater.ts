// import log from 'electron-log';
// import { autoUpdater } from 'electron-updater';
import { downloadFile } from './downloadFile';
const { exec } = require('child_process');

// Cannot use updater unless codesigning with paid credentials for macOS
// export default class AppUpdater {
//     constructor() {
//         log.transports.file.level = 'info'
//         autoUpdater.logger = log;
//         autoUpdater.checkForUpdatesAndNotify();
//     }
// }


export const updateWindows = () => {
    downloadFile('https://github.com/AnthonyGress/Android-Toolkit/releases/download/v1.5.5/Android-Toolkit-Setup-1.5.5.exe', 'install.exe').then(() => {
        exec('start install.exe', (error: Error, stdout: string, stderr: Error) => {
            if (error) {
                console.log(`error: ${error.message}`);
                const errArr = error.message.split(/\r?\n/);
                console.log('###############',errArr);

                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            if (stdout) {
                console.log(`${stdout}`);

            }
        });
    });
};
