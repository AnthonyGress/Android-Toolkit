import util from 'node:util';

const { exec } = require('child_process');
export const execPromise = util.promisify(exec);

let count = 0;

export const executeCmd = (
    command: string,
    event: Electron.IpcMainEvent,
    callbackChannel: string,
    filename?: string,
    total = 1
) => {
    exec(command, (error: Error, stdout: string, stderr: Error) => {
        if (error) {
            console.log(`error: ${error.message}`);
            const errArr = error.message.split(/\r?\n/);
            const formattedError = errArr.filter((e) => e).at(-1);
            console.log('###############',errArr);


            event.reply(callbackChannel, `Error: ${formattedError}`);
            if (command.toLocaleLowerCase().includes('install') && filename){
                count ++;
                event.reply(callbackChannel, `Failed to install ${filename} ${count}/${total} \n\n ${formattedError}`);
                if (count === total) {
                    //reset count on completion
                    count = 0;
                }
            }
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            event.reply(callbackChannel, `StdError: ${stderr}`);
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
