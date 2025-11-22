const { spawn } = require('node:child_process');
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
    exec(command, { maxBuffer: 1024 * 5000 }, (error: Error, stdout: string, stderr: Error) => {
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

    try {
        const child = spawn(commandBase, commandArr);

        child.on('error', (error: NodeJS.ErrnoException) => {
            console.error(`spawn error: ${error.message}`);
            if (error.code === 'ENOENT') {
                event.reply(callbackChannel, `Error: Command failed to execute. This may be due to:\n- Invalid IP format (missing port, e.g., should be 192.168.1.1:5555)\n- ADB not found or not properly installed\n- Malformed command\n\nDetails: ${error.message}`);
            } else {
                event.reply(callbackChannel, `Error: ${error.message}`);
            }
        });

        child.stdout.on('data', (data: Buffer) => {
            child.stdin.write(input);
            child.stdin.end(); // EOF

            event.reply(callbackChannel, `${data}`);
        });

        child.stderr.on('data', (data: Buffer) => {
            console.error(`stderr: ${data}`);
            event.reply(callbackChannel, `${data}`);
        });

        child.on('close', (code: number) => {
            console.log(`Child process exited with code ${code}.`);
        });
    } catch (error) {
        const err = error as Error;
        console.error(`Exception in spawnShell: ${err.message}`);
        event.reply(callbackChannel, `Error: ${err.message}`);
    }
};
