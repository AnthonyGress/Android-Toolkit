import { ipcMain } from 'electron';
import { POWERSHELL_CMD } from '../constants/constant';
import { executeCmd, batchInstall } from '../utils';


export const routeHandler = (adbPath: string) => {
    // listen for messages from renderer at these routes

    ipcMain.on('shellChannel', (event, args: string) => {
        let command = args;

        console.log(command);

        if (command === 'powershell') {
            command = POWERSHELL_CMD;
        }

        executeCmd(command, event, 'shellResponse');
    });

    ipcMain.on('adbChannel', async (event, args: string) => {
        const command = `${adbPath}${args}`;
        console.log(command);

        if (args === 'batchInstall') {
            console.log('batchInstall');

            batchInstall(adbPath, event);
        } else {
            executeCmd(command, event, 'adbResponse');
        }

    });
};

