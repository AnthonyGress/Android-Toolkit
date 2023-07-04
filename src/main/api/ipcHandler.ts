import { ipcMain } from 'electron';
import { POWERSHELL_CMD } from '../constants/constant';
import { executeCmd } from '../utils';

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

        executeCmd(command, event, 'adbResponse');
    });
};

