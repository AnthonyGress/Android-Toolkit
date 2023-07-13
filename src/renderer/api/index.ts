import { AdbCommand, ShellCommand } from '../types';

export const adbCommand: AdbCommand = (command) => {
    window.api.adbCommand(command);
};

export const shellCommand: ShellCommand = (command) => {
    window.api.shellCommand(command);
};
