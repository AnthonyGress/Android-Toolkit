export type AdbCommand = (command: string) => void;
export type ShellCommand = (command: string) => void;

export interface AdbProps {
    adbCommand: AdbCommand
}
