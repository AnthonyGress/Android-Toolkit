import util from 'node:util';
const { spawn } = require('node:child_process');

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
    exec(command, { shell: true }, (error: Error, stdout: string, stderr: Error) => {
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

export const spawnShell = (
    command: string,
    event: Electron.IpcMainEvent,
    callbackChannel: string,
    input?: string
) => {
    let commandArr = command.split(' ');
    const commandBase = commandArr[0];
    commandArr = commandArr.slice(1);

    const child = spawn(commandBase, commandArr);

    child.stdout.on('data', (data: any) => {
        child.stdin.write(input);
        child.stdin.end(); // EOF

        event.reply(callbackChannel, `${data}`);
    });

    child.stderr.on('data', (data: any) => {
        console.error(`stderr: ${data}`);
        event.reply(callbackChannel, `${data}`);
    });

    child.on('close', (code: number) => {
        console.log(`Child process exited with code ${code}.`);
    });
};
