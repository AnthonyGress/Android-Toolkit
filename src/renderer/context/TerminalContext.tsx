import { createContext } from 'react';

export interface ITerminalContext {
    terminalOutput: string;
    setTerminalOutput: React.Dispatch<React.SetStateAction<string>>
}

export const TerminalContext = createContext<ITerminalContext>(null!);
