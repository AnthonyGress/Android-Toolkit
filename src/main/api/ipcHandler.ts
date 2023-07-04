import { ipcMain } from 'electron';
import { POWERSHELL_CMD } from '../constants/constant';
const { exec } = require('child_process');

export const routeHandler = (adbPath: string) => {
    // listen for messages from renderer at these routes

    ipcMain.on('shellChannel', (event, args: string) => {
        let command = args;
        console.log(command);

        if (command === 'powershell') {
            command = POWERSHELL_CMD
        }

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

    ipcMain.on('adbChannel', async (event, args: string) => {
        const command = `${adbPath}${args}`;
        console.log(command);

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
}

