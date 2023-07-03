import { createContext } from 'react';

export interface TerminalContextType {
    terminalOutput: string;
    setTerminalOutput: React.Dispatch<React.SetStateAction<string>>
}

export const TerminalContext = createContext<TerminalContextType | null>(null);
