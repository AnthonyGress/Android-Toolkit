export type AdbCommand = (command: string, filename?: string) => void;

export interface AdbProps {
    adbCommand: AdbCommand
}
