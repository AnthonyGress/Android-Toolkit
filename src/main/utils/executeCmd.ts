const { exec } = require('child_process');

let count = 0;

export const executeCmd = (
    command: string,
    event: Electron.IpcMainEvent,
    callbackChannel: string,
    filename?: string,
    total = 1
) => {
    exec(command, (error: Error, stdout: string, stderr: Error) => {
        console.log('command is', command);

        if (error) {
            console.log(`error: ${error.message}`);
            event.reply(callbackChannel, `Error: ${error.message}`);
            if (command.toLocaleLowerCase().includes('install') && filename){
                count ++;
                event.reply(callbackChannel, `Failed to install ${filename} ${count}/${total} \n\n ${error.message}`);
                if (count === total) {
                    //reset count on completion
                    count = 0;
                }
            }
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

            if (command.toLocaleLowerCase().includes('install') && filename){
                count ++;
                event.reply(callbackChannel, `Successfully installed ${filename} ${count}/${total}`);
                if (count === total) {
                    //reset count on completion
                    count = 0;
                }
            }

        }
    });
};
