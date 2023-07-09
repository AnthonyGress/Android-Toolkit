import { app, ipcMain } from 'electron';
import { POWERSHELL_CMD, TERMINAL_CMD } from '../constants/constant';
import { executeCmd, batchInstall } from '../utils';
import { startUpdate } from '../utils/appUpdater';


export const routeHandler = (adbPath: string) => {
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

