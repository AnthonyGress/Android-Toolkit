const { exec } = require('child_process');

export const executeCmd = (
    command: string,
    event: Electron.IpcMainEvent,
    callbackChannel: string
) => {
    exec(command, (error: Error, stdout: string, stderr: Error) => {
        if (error) {
            console.log(`error: ${error.message}`);
            event.reply(callbackChannel, `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            event.reply(callbackChannel, `Error: ${stderr}`);
            return;
        }
        if (stdout) {
            console.log(`${stdout}`);
            event.reply(callbackChannel, `${stdout}`);
        }
    });
};
