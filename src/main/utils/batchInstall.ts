import { IpcMainEvent, dialog } from 'electron';
import fs from 'fs';
import path from 'path';
import { executeCmd } from './executeCmd';

export const batchInstall = (adbPath: string, event: IpcMainEvent) => {
    let files: string[];
    const extension = '.apk';
    const dir = dialog.showOpenDialogSync({
        properties: [
            'openFile',
            'openDirectory'],
        filters: [
            { name: 'Android Application', extensions: ['apk'] },
        ]
    });

    if (dir) {
        const folderName = path.win32.basename(dir[0]).split(path.sep)[0];

        dialog.showMessageBox({
            'type': 'question',
            'title': 'Confirmation',
            'message': `Are you sure you want to install all apk's in the ${folderName} folder?`,
            'buttons': [
                'Yes',
                'Cancel'
            ]
        })
        // Dialog returns a promise so let's handle it correctly
            .then((result) => {
                // exit, use selected no
                if (result.response !== 0) { return; }

                // user confirmed
                if (result.response === 0) {
                    event.reply('adbResponse', 'Starting batch install, please wait...');
                    files = fs.readdirSync(dir[0]);
                    files = files.filter(file => file.endsWith(extension));
                    console.log(files);
                    const total = files.length;

                    files.forEach((file) => {
                        const filePath = path.join(dir[0], file);

                        executeCmd(`${adbPath}adb install -r "${filePath}"`, event, 'adbResponse', file, total);
                    });
                }

            });
    }
};
